import type { DocumentData } from "../components/Document";

interface LoginResponse {
  jwt: string;
}

export const loginUser = async (
  userName: string,
  password: string
): Promise<string> => {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        password,
      }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Invalid username or password");
      }
      throw new Error("Login failed. Please try again.");
    }

    const data: LoginResponse = await response.json();
    return data.jwt;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Network error. Please check your connection.");
  }
};

export const checkTokenExpiredError = (error: unknown): boolean => {
  if (
    error &&
    typeof error === "object" &&
    "error" in error &&
    error.error === "Token expired, please sign in again."
  ) {
    return true;
  }
  return false;
};

export interface LastEvaluatedKey {
  lastCreatedAt?: string;
  lastEvaluatedKeys?: Record<string, unknown>;
  status?: string;
  documentId?: string;
  createdAt?: string;
}

export interface FetchDocumentsResponse {
  items: DocumentData[];
  lastEvaluatedKey?: LastEvaluatedKey;
}

export const fetchDocuments = async (
  token: string,
  status?: string,
  lastEvaluatedKey?: LastEvaluatedKey
): Promise<FetchDocumentsResponse> => {
  try {
    let url = "/api/documents";
    const params: string[] = [];

    if (status) {
      params.push(`status=${status}`);
    }

    if (lastEvaluatedKey) {
      const encodedKey = encodeURIComponent(JSON.stringify(lastEvaluatedKey));
      params.push(`lastEvaluatedKey=${encodedKey}`);
    }

    if (params.length > 0) {
      url += `?${params.join("&")}`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Token expired, please sign in again.");
      }
      if (response.status === 403) {
        throw new Error("Access forbidden. Please check your authentication.");
      }
      if (response.status === 404) {
        throw new Error("Documents not found");
      }

      // Try to get error details from response
      const errorText = await response.text();
      console.log("Error response:", errorText);
      throw new Error(
        `Failed to fetch documents (${response.status}). Please try again.`
      );
    }

    const data = await response.json();
    return {
      items: data.items || [],
      lastEvaluatedKey: data.lastEvaluatedKey,
    };
  } catch (error) {
    console.error("Fetch documents error:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Network error. Please check your connection.");
  }
};

export interface UploadResult {
  fileName: string;
  success: boolean;
  error?: string;
  data?: DocumentData;
}

export const uploadDocument = async (
  token: string,
  selectedFile: File
): Promise<UploadResult> => {
  try {
    const formData = new FormData();
    formData.append("file", selectedFile);
    const response = await fetch("/api/documents", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      let errorMessage = `Upload failed (${response.status})`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorData.message || errorMessage;
      } catch {
        errorMessage = (await response.text()) || errorMessage;
      }

      return {
        fileName: selectedFile.name,
        success: false,
        error: errorMessage,
      };
    }

    const data = await response.json();
    return {
      fileName: selectedFile.name,
      success: true,
      data,
    };
  } catch (error) {
    return {
      fileName: selectedFile.name,
      success: false,
      error: error instanceof Error ? error.message : "Network error occurred",
    };
  }
};

//`uploadDocument` - same auth header pattern
// - URL: `/api/documents/${documentId}`
// - Auth: `Authorization: Bearer ${token}` header
// - Error handling: 401 (token expired), 409 (doc still processing)
// - Return: void (DELETE returns no body on success)
export const deleteDocument = async (
  token: string,
  documentId: string
) : Promise<void> => {
  try {
    const response = await fetch(`/api/documents/${documentId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 409) {
        throw new Error('Cannot delete document while processing');
      }
      if (response.status === 403) {
        throw new Error('Authentication failed.');
      }

      throw new Error(`Delete failed (${response.status})`);
    }
  }
  catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Network error. Please check your connection.");
  }
}