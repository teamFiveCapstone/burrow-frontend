import { useState } from 'react';
import { ApiReferenceReact } from '@scalar/api-reference-react';
import '@scalar/api-reference-react/style.css';

const ApiSandbox = () => {
  const [apiToken, setApiToken] = useState<string>('');

  return (
    <div className="api-sandbox-wrapper">
      {/* Token input field */}
      <div className="api-token-input-container">
        <label htmlFor="api-token-input">Query API Token (x-api-token):</label>
        <input
          id="api-token-input"
          type="text"
          value={apiToken}
          onChange={(e) => setApiToken(e.target.value)}
          placeholder="Enter your x-api-token here"
          className="api-token-input"
        />
      </div>

      {/* Scalar API Reference */}
      <div className="api-sandbox-container">
        <ApiReferenceReact
          configuration={{
            spec: {
              url: '/query-service/openapi.json'
            },
            authentication: {
              preferredSecurityScheme: 'APIKeyHeader',
              apiKey: {
                token: apiToken  // Updates as user types
              }
            },
            theme: 'default',
            layout: 'modern',
            hideModels: true,  // Hide schemas/models section
            hiddenClients: true,  // Hide code generation clients
            defaultOpenAllTags: true  // Expand all endpoint groups by default
          }}
        />
      </div>
    </div>
  );
};

export default ApiSandbox;
