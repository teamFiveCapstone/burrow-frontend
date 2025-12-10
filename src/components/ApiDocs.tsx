import { useState } from "react";
import { ApiReferenceReact } from "@scalar/api-reference-react";
import "@scalar/api-reference-react/style.css";

export const ApiDocs = () => {
  const [apiToken, setApiToken] = useState<string>("");
  setApiToken;
  return (
    <div className="api-docs-wrapper">
      <div className="api-docs-container">
        <ApiReferenceReact
          configuration={{
            // @ts-ignore
            spec: {
              url: "/query-service/openapi.json",
            },
            authentication: {
              preferredSecurityScheme: "APIKeyHeader",
              apiKey: {
                token: apiToken,
              },
            } as any,
            theme: "default",
            layout: "modern",
            hideModels: true,
            hiddenClients: true,
            documentDownloadType: "none",
            hideClientButton: true,
            hideDarkModeToggle: true,
            hideSearch: true,
            telemetry: false,
            showDeveloperTools: "never",
            defaultOpenAllTags: true,
          }}
        />
      </div>
    </div>
  );
};
