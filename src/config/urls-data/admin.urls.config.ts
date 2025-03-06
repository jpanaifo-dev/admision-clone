const URL_BASE = '/admin'

export const ADMIN_URLS_APP = {
  HOME: {
    URL_BASE: `${URL_BASE}`,
    UNAUTHORIZED: `/unauthorized`,
  },
  LOGIN: {
    URL_BASE: `/auth`,
  },
  DASHBOARD: {
    URL_BASE: `${URL_BASE}/dashboard`,
  },
  USERS: {
    URL_BASE: `${URL_BASE}/users`,
    USER_DETAIL: (id: string) => `${URL_BASE}/users/${id}`,
  },
  ROLES: {
    URL_BASE: `${URL_BASE}/roles`,
    ROLE_DETAIL: (id: string) => `${URL_BASE}/roles/${id}`,
  },
  PERMISSIONS: {
    URL_BASE: `${URL_BASE}/permissions`,
    PERMISSION_DETAIL: (id: string) => `${URL_BASE}/permissions/${id}`,
  },
  SETTINGS: {
    URL_BASE: `${URL_BASE}/settings`,
  },
  PROFILE: {
    URL_BASE: `${URL_BASE}/profile`,
    SETTINGS: `${URL_BASE}/profile/settings`,
  },
  LOGOUT: {
    URL_BASE: `${URL_BASE}/logout`,
  },
}
