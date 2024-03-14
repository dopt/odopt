import { ChangeEventHandler, useRef, useState } from 'react';
import { validateHeaders, validateJSON } from '@/utils';
import { Error } from '@/components';
import './index.css';

const DEFAULT_HEADERS = 'content-type: application/json\nx-api-key 1234abcd';
const DEFAULT_BODY = `{
  id: {userId},
  email: "{usrEmail}",
}`;

export function Home() {
  const [headers, setHeaders] = useState(DEFAULT_HEADERS);
  const [headersError, setHeadersError] = useState(true);
  const [body, setBody] = useState(DEFAULT_BODY);
  const [bodyError, setBodyError] = useState(true);
  const headersRef = useRef<HTMLTextAreaElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  const onHeadersChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const value = e.target.value;
    setHeaders(value);
    setHeadersError(value ? !validateHeaders(value) : false);
  };

  const onBodyChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const value = e.target.value;
    setBody(value);
    setBodyError(value ? !validateJSON(value) : false);
  };

  return (
    <main>
      <header>
        <h1>Webhook setup</h1>
        <p>
          Add a new webhook to send data to an external endpoint. Use template
          tags to inject dynamic data into the body.
        </p>
      </header>

      <div className="form">
        <div className="form-row">
          <label>URL</label>
          <input type="url" defaultValue="https://www.example.com" />
        </div>

        <div className="form-row">
          <label>Headers</label>
          <textarea
            value={headers}
            rows={5}
            className={headersError ? 'has-error' : undefined}
            onChange={onHeadersChange}
            ref={headersRef}
          />
          {headersError && (
            <Error
              for={headersRef.current}
              onFix={(fix) => {
                setHeaders(fix as string);
                setHeadersError(false);
              }}
            >
              Invalid headers
            </Error>
          )}
        </div>

        <div className="form-row">
          <label>Body (JSON)</label>
          <textarea
            value={body}
            rows={5}
            className={bodyError ? 'has-error' : undefined}
            onChange={onBodyChange}
            ref={bodyRef}
          />
          {bodyError && (
            <Error
              for={bodyRef.current}
              onFix={(fix) => {
                setBody(fix as string);
                setBodyError(false);
              }}
            >
              Invalid JSON
            </Error>
          )}
        </div>

        <button className="btn">Add webhook</button>
      </div>
    </main>
  );
}
