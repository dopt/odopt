import { Logger, LoggerProps } from '@dopt/logger';

import { DoptApiClient, DoptApi } from '@dopt/ai-javascript-client';
import {
  AnswerChunk,
  AssistantCompletionsRequestBody,
  AssistantQueryParams,
  AssistantSearchRequestBody,
  StatusChunk,
} from '@dopt/ai-assistant-definition';
import { AssistantContextProps, formAssistantContext } from './context';

export type SearchResponseItem = DoptApi.SearchResponseItem;

export interface Properties {
  /**
   * The userId you're requesting completions on behalf of.
   */
  userId: string | undefined;
  /**
   * An optional groupId for that userId.
   */
  groupId?: string | undefined;
  /**
   * Your AI API key.
   */
  apiKey: string;
  environment?: string;

  /**
   * The underlying model you want answers generated with.
   * This parameter is currently ignored by the API.
   * It may be exposed in the future.
   */
  model?: AssistantQueryParams['model'];

  logLevel?: LoggerProps['logLevel'];
}

export class Assistant {
  private apiKey: Properties['apiKey'];

  private userId?: Properties['userId'];
  private groupId?: Properties['groupId'];

  private environment: Properties['environment'];

  private model: Properties['model'];

  private logger: Logger;

  private client: DoptApiClient;

  constructor({
    apiKey,
    userId,
    groupId,
    environment,
    model,
    logLevel,
  }: Properties) {
    this.apiKey = apiKey;
    this.userId = userId;
    this.groupId = groupId;

    this.environment = environment;

    this.model = model;

    this.logger = new Logger({
      logLevel,
      prefix: `@dopt/ai-assistant-javascript`,
    });

    this.configure({ userId });

    this.client = new DoptApiClient({
      apiKey: this.apiKey,
      environment: this.environment,
    });
  }

  configure(config: Partial<Pick<Properties, 'userId'>>) {
    Object.assign(this, config);

    const { userId, logger } = this;

    if (userId == null) {
      logger.error(
        'The `userId` prop is undefined. The SDK will be pending initialization until you call `configure` with a defined `userId` attribute.'
      );
      return;
    }
  }

  completions(
    sid: string,
    {
      query,
      context,
    }: {
      query: AssistantCompletionsRequestBody['query'];
      context: AssistantContextProps;
    },
    callbacks?: {
      onStatus?: (status: StatusChunk['status'] | null) => void;
      onContent?: (content: string) => void;
      onComplete?: (
        answer: AnswerChunk['answer'],
        sources: AnswerChunk['sources']
      ) => void;
      onError?: (error: unknown) => void;
    }
  ) {
    const userId = this.userId;

    if (!userId) {
      throw new Error(
        "The Assistant SDK cannot be accessed until you've configured a userId"
      );
    }

    /**
     * TODO: after https://github.com/fern-api/fern/issues/2960 is completed
     * create an actual AbortSignal pattern
     */
    let terminated = false;

    formAssistantContext(context)
      .then(async (formed) => {
        /**
         * If we terminate before streaming, don't start the stream.
         */
        if (terminated) {
          return;
        }

        const request: DoptApi.assistant.completions.CompletionsStreamRequest =
          {
            userIdentifier: userId,
            groupIdentifier: this.groupId,
            model: this.model,
            context: formed,
          };

        /**
         * We inject query optionally, otherwise Fern casts it to null.
         */
        if (query) {
          request.query = query;
        }

        const events = await this.client.assistant.completions.stream(
          sid,
          request
        );

        let content = '';

        for await (const event of events) {
          if (terminated) {
            /**
             * If we terminate while streaming, `continue` will drain the stream.
             */
            continue;
          }

          switch (event.type) {
            case 'status':
              callbacks?.onStatus && callbacks?.onStatus(event.status);
              break;
            case 'answer':
              callbacks?.onComplete &&
                callbacks?.onComplete(event.answer, event.sources);
              callbacks?.onStatus && callbacks?.onStatus(null);
              break;
            case 'content':
              content += event.content;
              callbacks?.onContent && callbacks?.onContent(content);
              break;
          }
        }
      })
      .catch((err) => {
        this.logger.error(
          `[@dopt/ai-assistant-javascript] Failed to generate a completion`,
          err
        );
        callbacks?.onError && callbacks?.onError(err);
        callbacks?.onStatus && callbacks?.onStatus(null);
      });

    return () => (terminated = true);
  }

  async search(
    sid: string,
    {
      query,
      context,
    }: {
      query: AssistantSearchRequestBody['query'];
      context: AssistantContextProps;
    }
  ): Promise<SearchResponseItem[] | undefined> {
    const userId = this.userId;

    if (!userId) {
      throw new Error(
        "The Assistant SDK cannot be accessed until you've configured a userId"
      );
    }

    try {
      return await this.client.assistant.search(sid, {
        query,
        userIdentifier: userId,
        groupIdentifier: this.groupId,
        model: this.model,
        context: await formAssistantContext(context),
      });
    } catch (err) {
      this.logger.error(
        `[@dopt/ai-assistant-javascript] Failed to generate search results`,
        err
      );
    }
  }
}
