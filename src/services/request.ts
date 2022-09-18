//import { gap } from "../stores/RootStore";

export interface Request {
  method?: string;
  api: string;
  query?: string;
  data?: unknown;
}

const getToken = (): string => {
  const user = JSON.parse(localStorage.getItem("user") ?? "{}");
  const token = user?.token ?? null;
  return (token) ? "Bearer " + token : "";
};

export const request = async <T>(req: Request): Promise<null | T> => {
  const { api } = req;
  const query = req.query ?? "";
  const response = await fetch(api + query, {
    method: req.method || "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: getToken()
    },
    body: JSON.stringify(req.data)
  });
  if (!response || !response.ok) {
    return null;
  }
  return await response?.json() ?? null;
};

