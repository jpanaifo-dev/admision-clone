const URL_BASE = '/admin'

export const ADMIN_URLS_APP = {
  HOME: {
    URL_BASE: `${URL_BASE}`,
    UNAUTHORIZED: `/unauthorized`,
    DASHBOARD: `${URL_BASE}/dashboard`,
  },
  LOGIN: {
    URL_BASE: `/auth`,
    LOGOUT: `${URL_BASE}/logout`,
  },
  USERS: {
    URL_BASE: `${URL_BASE}/users`,
    USER_DETAIL: (id: string) => `${URL_BASE}/users/${id}`,
  },
  ROLES: {
    URL_BASE: `${URL_BASE}/roles`,
    ROLE_DETAIL: (id: string) => `${URL_BASE}/roles/${id}`,
  },
  SETTINGS: {
    URL_BASE: `${URL_BASE}/settings`,
  },
  PROFILE: {
    URL_BASE: `${URL_BASE}/profile`,
    SETTINGS: `${URL_BASE}/profile/settings`,
  },
  CONVOCATORIES: {
    URL_BASE: `${URL_BASE}/convocatorias`,
    CREATE: `${URL_BASE}/convocatorias/nuevo`,
    EDIT: (id: string) => `${URL_BASE}/convocatorias/${id}/editar`,
    CONVOCATORY_DETAIL: (id: string) => `${URL_BASE}/convocatorias/${id}`,
    CONVOCATORY_TIMELINE: (id: string) =>
      `${URL_BASE}/convocatorias/${id}/cronograma`,
    CONVOCATORY_PROGRAMS: (id: string) =>
      `${URL_BASE}/convocatorias/${id}/programas`,
  },
}
