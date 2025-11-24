interface LoginResponse {
  jwt: string;
}

interface LoginError {
  error: string;
}

export const loginUser = async (userName: string, password: string): Promise<string> => {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName,
        password,
      }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Invalid username or password');
      }
      throw new Error('Login failed. Please try again.');
    }

    const data: LoginResponse = await response.json();
    return data.jwt;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network error. Please check your connection.');
  }
};

export const checkTokenExpiredError = (error: any): boolean => {
  if (error && error.error === 'Token expired, please sign in again.') {
    return true;
  }
  return false;
};