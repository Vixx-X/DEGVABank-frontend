export function makeFetchOption(
  options: RequestInit = {},
  auth: string | null = null
) {
  const ret: RequestInit = {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    credentials: "include", // include, *same-origin, omit
    ...options,
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  if (options?.headers) {
    ret.headers = {
      ...ret.headers,
      ...options.headers,
    };
  }

  if (auth) {
    ret.headers = {
      ...ret.headers,
      Authorization: `Bearer ${auth}`,
    };
  }

  return ret;
}
