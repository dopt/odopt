import { Logger, LoggerProps } from '@dopt/logger';

import { DoptApiClient } from '@dopt/ai-javascript-client';
import {
  AssistantCompletionsRequestBody,
  AssistantQueryParams,
  AssistantSearchRequestBody,
} from '@dopt/ai-assistant-definition';
import { AssistantContextProps, formAssistantContext } from './context';

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
   * Defaults to `gemini` if undefined.
   * Can be `gemini` or `gpt`.
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

  async completions(
    sid: string,
    {
      query,
      context,
    }: {
      query: AssistantCompletionsRequestBody['query'];
      context: AssistantContextProps;
    }
  ) {
    if (!this.userId) {
      throw new Error(
        "The Assistant SDK cannot be accessed until you've configured a userId"
      );
    }
    return this.client.assistant.completions.stream(sid, {
      userIdentifier: this.userId,
      groupIdentifier: this.groupId,
      model: this.model,
      query,
      context: await formAssistantContext(context),
    });
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
  ) {
    if (!this.userId) {
      throw new Error(
        "Completions cannot be accessed until you've configured a userId"
      );
    }
    return this.client.assistant.search(sid, {
      userIdentifier: this.userId,
      groupIdentifier: this.groupId,
      query,
      context: await formAssistantContext(context),
    });
  }
}
