import { toast } from "react-toastify";

type ErrorResponse = {
  data: any;
  errors: object[];
  code: number;
  message: string;
};

async function checkForError(response: Response) {
  if (response.status >= 200 && response.status < 300) {
    const xToken = response.headers.get("x-auth-token");
    if (xToken) {
      global.authToken = xToken;
    }
  }

  if (response.status >= 400 && response.status <= 500) {
    const error: ErrorResponse = await response.json();
    error.code = response.status;
    if (error.errors || error.message) {
      if (error.message) {
        // Show global alert on top right corner
        toast.error(error.message, {
          progress: this.state.progress,
        });
      }
      throw error;
    }
  }
  // return response to continue
  return response;
}

type RequestMethod =
  | "get"
  | "post"
  | "put"
  | "delete"
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE";

export function doFetch(
  url: string,
  method: RequestMethod = "get",
  data = {},
  headers = {}
) {
  const params: RequestInit = { headers };

  //https://dummyjson.com/auth/login
  //https://dummyjson.com/auth/products?limit=10&skip=10
  // https://dummyjson.com/auth/products/categories

  const baseUrl = `https://dummyjson.com/`;
  const urlObj = new URL(url, baseUrl);
  const rewrittenUrl = urlObj.href;

  params.method = method;
  params.headers["Content-Type"] = "application/json";
  const userValue = JSON.parse(localStorage.getItem("_auth"));

  params.headers["Authorization"] = `Bearer ${userValue.token}`;
  if (method.toLowerCase() != "get") {
    params.body = JSON.stringify(data);
  }
  return (
    fetch(rewrittenUrl, params)
      // .then(checkStatus)
      .then(checkForError)
      .then((response) => response.json())
      .then((response) => {
        if (response.message) {
          toast.info(response.message, {
            progress: this.state.progress,
          });
        }
        return response;
      })
      .catch((error) => {
        toast.error(error, {
          progress: this.state.progress,
        });
      })
  );
}

export { ErrorResponse };
