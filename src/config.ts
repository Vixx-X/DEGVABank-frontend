export const REFRESH_MAX_AGE = 86400000; // 1 day in ms

const API_URL = "https://api.bank.vittorioadesso.com";

// Server side auth urls
export const AUTH_URLS = {
  URL_TOKEN_AUTH: `${API_URL}/token/`,
  URL_TOKEN_REFRESH: `${API_URL}/token/refresh/`,
  URL_TOKEN_VERIFY: `${API_URL}/auth/token/verify/`,
  URL_TOKEN_REVOKE: `${API_URL}/token/revoke/`,
};

// Api urls for client
export const API_URLS = {
  // Token
  URL_TOKEN_AUTH: `/api/auth`,
  URL_TOKEN_REFRESH: `/api/auth/refresh`,
  URL_TOKEN_VERIFY: `/api/auth/verify`,
  URL_TOKEN_REVOKE: `/api/auth/revoke`,
  // User
  URL_USER_REGISTER: `${API_URL}/user/register/`,
  URL_USER_PROFILE: `${API_URL}/user/profile/`,
  URL_USER_ADDRESSES: `${API_URL}/user/addresses/`,
  URL_PASSWORD_RESET: `${API_URL}/user/password-reset/`,
  URL_PASSWORD_RESET_CONFIRM: `${API_URL}/user/password-reset/confirm/[uidb64]/[token]/`,
  URL_CHANGE_EMAIL: `${API_URL}/user/change-email/`,
  URL_CHANGE_PASSWORD: `${API_URL}/user/change-password/`,
  URL_OTP_REQUEST: `${API_URL}/user/generate-otp/`,
};

// Server routes paths
export const SERVER_URLS = {
  URL_LOGIN: "/user/login",
  URL_REGISTER: "/user/register",
  URL_PASSWORD_RESET: "/user/password-reset",
  URL_PASSWORD_RESET_CONFIRM: "/user/password-reset/confirm/[uidb64]/[token]",
  URL_USER_CHANGE_EMAIL: "/user/change-email",
  URL_USER_CHANGE_PASSWORD: "/user/change-password",
  URL_USER_PROFILE: "/user/profile",
  URL_USER_CONFIG: "/user/config/",
  URL_USER_TRANSACTION: "/user/transaction/",

  // dashboard
  URL_HOME: "/home",
  URL_LANDING: "/",
};