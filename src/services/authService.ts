interface LoginResponse {
  jwt: string;
}

interface LoginError {
  error: string;
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

export const checkTokenExpiredError = (error: any): boolean => {
  if (error && error.error === "Token expired, please sign in again.") {
    return true;
  }
  return false;
};

export const fetchDocuments = async (token: string) => {
  try {
    const response = await fetch("/api/documents", {
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
    return data;
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
  data?: any;
}

export const uploadDocument = async (token: string, selectedFile: File): Promise<UploadResult> => {
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
        errorMessage = await response.text() || errorMessage;
      }

      return {
        fileName: selectedFile.name,
        success: false,
        error: errorMessage
      };
    }

    const data = await response.json();
    return {
      fileName: selectedFile.name,
      success: true,
      data
    };
  } catch (error) {
    return {
      fileName: selectedFile.name,
      success: false,
      error: error instanceof Error ? error.message : 'Network error occurred'
    };
  }
};
