const URL_BASE = '/'

export const AUTH_URLS_APP = {
  LOGIN: {
    URL_BASE: `${URL_BASE}login`,
    ADMIN: `${URL_BASE}auth`,
  },
  CREATE_ACCOUNT: {
    URL_BASE: `${URL_BASE}sign-up`,
    REGISTER: `${URL_BASE}sign-up/register`,
  },
  FORGOT_PASSWORD: {
    URL_BASE: `${URL_BASE}forgot-password`,
  },
}
