//import { gap } from "../stores/RootStore";

export interface Request {
  method?: string;
  api: string;
  query: string;
  data?: unknown;
}

const getToken = (): string => {
  const user = JSON.parse(localStorage.getItem("user") ?? "{}");
  const token = user?.token ?? null;
  return (token) ? "Bearer " + token : "";
};

export const request = async (req: Request): Promise<unknown> => {
  const response = await fetch(req.api + req.query, {
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

