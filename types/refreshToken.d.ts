export interface IRequestParams<T> extends RequestInit {
  url?: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  params?: T;
  token?: string;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace RefreshTokenAPI {
  export interface Request {
    refresh: string;
  }

  export interface Response {
    access: string;
  }
}
