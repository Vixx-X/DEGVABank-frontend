import { API_URLS } from "@config";
import { assertApiError } from "@utils/assertApiError";
import { makeFetchOption } from "@utils/makeFetchOption";
import { makeUrl } from "@utils/makeUrl";
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
  URL_USER_TRANSACTIONS,
  URL_USER_PAYWAY_APP,
  URL_USER_PAYWAY_APPS,
  URL_USER_PAYWAY_KEYS,
  URL_PAYWAY_ACCOUNT,
  URL_PAYWAY_CARD,
  URL_OTP,
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

export async function postTransferUser(auth: string, _data: any) {
  const resp = await fetch(
    URL_USER_TRANSACTIONS,
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

export async function postPayway(auth: string, _data: any) {
  const resp = await fetch(
    URL_USER_PAYWAY_APPS,
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

export async function putPayway(auth: string, app_id: string, _data: any) {
  const resp = await fetch(
    makeUrl(URL_USER_PAYWAY_APP, { app_id }),
    makeFetchOption(
      {
        method: "PUT",
        body: stringify(_data),
      },
      auth
    )
  );
  await assertApiError(resp);
  const data = await resp.json();
  return data;
}

export async function deletePayway(auth: string, app_id: string) {
  const resp = await fetch(
    makeUrl(URL_USER_PAYWAY_APP, { app_id }),
    makeFetchOption(
      {
        method: "DELETE",
      },
      auth
    )
  );
  await assertApiError(resp);
}

export async function postPaywayKey(auth: string, app_id: string) {
  const resp = await fetch(
    makeUrl(URL_USER_PAYWAY_KEYS, { app_id }),
    makeFetchOption(
      {
        method: "POST",
      },
      auth
    )
  );
  await assertApiError(resp);
  const data = await resp.json();
  return data;
}

export async function postPaywayAccount(auth: string, _data: any) {
  const resp = await fetch(
    URL_PAYWAY_ACCOUNT,
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

export async function postPaywayCard(_data: any) {
  const resp = await fetch(
    URL_PAYWAY_CARD,
    makeFetchOption({
      method: "POST",
      body: stringify(_data),
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

export async function getListPaywayDataWithURL(auth: string, url: string) {
  const resp = await fetch(url, makeFetchOption({}, auth));
  await assertApiError(resp);
  const data = await resp.json();
  return data.results;
}

export async function getPaywayDataWithURL(auth: string, url: string) {
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

export async function getTransactionWithURL(auth: string, url: string) {
  const resp = await fetch(url, makeFetchOption({}, auth));
  await assertApiError(resp);
  const data = await resp.json();
  return data;
}

export async function getRequestWithURL(auth: string, url: string) {
  const resp = await fetch(url, makeFetchOption({}, auth));
  await assertApiError(resp);
  const data = await resp.json();
  return data;
}

export async function GenerateOTP(auth: string, _data: any) {
  const resp = await fetch(
    URL_OTP,
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
