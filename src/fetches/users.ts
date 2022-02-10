import { API_URLS } from "@config";
import { assertApiError } from "@utils/assertApiError";
import { makeFetchOption } from "@utils/makeFetchOption";
import stringify from "fast-json-stable-stringify";

const {
  URL_TOKEN_AUTH,
  URL_TOKEN_REFRESH,
  URL_TOKEN_VERIFY,
  URL_TOKEN_REVOKE,
  URL_USER_PROFILE,
  URL_USER_REGISTER,
  URL_USER_ACCOUNTS,
  URL_USER_CREDIT_CARDS,
} = API_URLS;

export async function postUserAccont(auth: string, _data: any) {
  const resp = await fetch(
    URL_USER_ACCOUNTS,
    makeFetchOption(
      {
        method: "POST",
        body: stringify(_data),
      },
      auth
    )
  );
  await assertApiError(resp);
  const data = await resp.json();
  return data;
}

export async function postUserCreditCard(auth: string, _data: any) {
  const resp = await fetch(
    URL_USER_CREDIT_CARDS,
    makeFetchOption(
      {
        method: "POST",
        body: stringify(_data),
      },
      auth
    )
  );
  await assertApiError(resp);
  const data = await resp.json();
  return data;
}

export async function getProfileDataWithURL(auth: string, url: string) {
  const resp = await fetch(url, makeFetchOption({}, auth));
  await assertApiError(resp);
  const data = await resp.json();
  return data;
}

export async function getProfileData(auth: string) {
  return await getProfileDataWithURL(auth, URL_USER_PROFILE);
}

export async function getToken(username: string, password: string) {
  const resp = await fetch(
    URL_TOKEN_AUTH,
    makeFetchOption({
      method: "POST",
      body: stringify({ username, password }),
    })
  );
  await assertApiError(resp);
  const data = await resp.json();
  return data;
}

export async function postRegisterUser(userData: any) {
  const resp = await fetch(
    URL_USER_REGISTER,
    makeFetchOption({
      method: "POST",
      body: stringify(userData),
    })
  );
  await assertApiError(resp);
  const data = await resp.json();
  return data;
}

export async function refreshToken() {
  const resp = await fetch(
    URL_TOKEN_REFRESH,
    makeFetchOption({
      method: "POST",
    })
  );
  await assertApiError(resp);
  const data = await resp.json();
  return data;
}

export async function verifyToken(auth: string) {
  const resp = await fetch(
    URL_TOKEN_VERIFY,
    makeFetchOption({
      method: "POST",
      body: stringify({ token: auth }),
    })
  );
  return resp.ok;
}

export async function revokeToken() {
  const resp = await fetch(
    URL_TOKEN_REVOKE,
    makeFetchOption({
      method: "POST",
    })
  );
  return resp.ok;
}

export async function getAccountDataWithURL(auth: string, url: string) {
  const resp = await fetch(url, makeFetchOption({}, auth));
  await assertApiError(resp);
  const data = await resp.json();
  return data;
}
export async function getCreditCardWithURL(auth: string, url: string) {
  const resp = await fetch(url, makeFetchOption({}, auth));
  await assertApiError(resp);
  const data = await resp.json();
  return data;
}

