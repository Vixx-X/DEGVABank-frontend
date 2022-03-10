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
  //Account
  URL_USER_ACCOUNTS: `${API_URL}/user/accounts/`,
  URL_USER_CREDIT_CARDS: `${API_URL}/user/credit-cards/`,
  URL_USER_TRANSACTIONS: `${API_URL}/user/transactions/`,
  URL_USER_PAYWAY_KEYS: `${API_URL}/user/payway-meta/[app_id]/keys/`,
  URL_USER_PAYWAY_APPS: `${API_URL}/user/payway-meta/`,
  URL_USER_PAYWAY_APP: `${API_URL}/user/payway-meta/[app_id]/`,
  URL_USER_REQUESTS: `${API_URL}/user/petitions/`,
  URL_PAYWAY_ACCOUNT: `${API_URL}/paygateway/account/`,
  URL_PAYWAY_CARD: `${API_URL}/paygateway/card/`,
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
  URL_USER_TRANSACTION: "/user/transaction",
  URL_USER_TRANSFER: "/user/transfer",
  URL_USER_REQUEST: "/user/request",
  URL_USER_PAYWAY_APPS: "/user/payways",
  URL_USER_PAYWAY_APP: "/user/payways/[app_id]",
  URL_DOCUMENTATION: "/payways/docs",
  
  // dashboard
  URL_HOME: "/home",
  URL_PAYWAYS_DOCS: "/payways/docs",
  URL_LANDING: "/",
};
