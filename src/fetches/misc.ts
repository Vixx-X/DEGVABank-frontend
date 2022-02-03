import { API_URLS, AUTH_URLS, REFRESH_MAX_AGE } from "@config";

import Cookies from "cookies";

const { URL_USER_PROFILE } = API_URLS;

const { URL_TOKEN_REFRESH } = AUTH_URLS;

export async function getAuthContext({ req, res }: any) {
  const secure = req.headers["x-forwarded-proto"] === "https";
  const cookies = new Cookies(req, res, { secure });
  const refresh = cookies.get("refresh");
  const tokens = { access: "" } as { [key: string]: string };

  // refresh cookie if set
  if (refresh) {
    try {
      const response = await fetch(URL_TOKEN_REFRESH, {
        method: "POST",
        mode: "cors", // no-cors, *cors, same-origin
        credentials: "include", // include, *same-origin, omit, include
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh }),
      });
      const result = await response.json();
      cookies.set("refresh", result.refresh, {
        sameSite: secure ? "none" : undefined,
        maxAge: REFRESH_MAX_AGE,
      });
      tokens["access"] = result.access;
    } catch (err) {
      cookies.set("refresh"); // deleting
    }
  }
  return tokens;
}

export async function getAuthenticatedContext({ req, res }: any) {
  const { access } = await getAuthContext({ req, res });
  const { user } = await getUserContext({ access });
  return { access, user };
}

export async function getUserContext({ access }: any) {
  try {
    const option = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access}`,
        "Content-Type": "application/json",
      },
    };
    const resp = await fetch(URL_USER_PROFILE, option);
    const user = await resp.json();
    if (!resp.ok) throw user;
    return {
      user,
    };
  } catch (error) {
    console.log(error);
    return {};
  }
}
