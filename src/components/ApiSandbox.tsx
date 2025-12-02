import { useState } from 'react';
import { ApiReferenceReact } from '@scalar/api-reference-react';
import '@scalar/api-reference-react/style.css';

const ApiSandbox = () => {
  const [apiToken, setApiToken] = useState<string>('');

  return (
    <div className="api-sandbox-wrapper">
      <div className="api-sandbox-container">
        <ApiReferenceReact
          configuration={{
            spec: {
              url: '/query-service/openapi.json'
            },
            authentication: {
              preferredSecurityScheme: 'APIKeyHeader',
              apiKey: {
                token: apiToken  
              }
            },
            theme: 'default',
            layout: 'modern',
            hideModels: true, 
            hiddenClients: true,
            documentDownloadType: 'none',
            hideClientButton: true,
            hideDarkModeToggle: true,
            hideSearch: true,
            telemetry: false,
            showDeveloperTools: 'never',
            defaultOpenAllTags: true
          }}
        />
      </div>
    </div>
  );
};

export default ApiSandbox;
