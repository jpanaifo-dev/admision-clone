const URL_BASE = '/admision'
const URL_PAYMENTS = '/informacion-pagos'

export const ADMISSION_URLS_APP = {
  HOME: {
    URL_BASE: `${URL_BASE}`,
  },
  CONVOCATION: {
    URL_BASE: `${URL_BASE}/convocatorias`,
    PROGRAMS_BY_CONVOCATION: (uuid: string) =>
      `${URL_BASE}/convocatorias/${uuid}`,
    PROGRAM_DETAIL: (uuid: string, id: string) =>
      `${URL_BASE}/convocatorias/${uuid}/${id}`,
  },
  APPLICATION: {
    URL_BASE: `${URL_BASE}/postulaciones`,
    PROGRAM: (
      uuid: string,
      plan: string,
      headquarter: string,
      payment: string,
      id: string
    ) =>
      `${URL_BASE}/postulaciones/${uuid}/?plan=${plan}&sede=${headquarter}&payment=${payment}&application=${id}`,
  },
  PROFILE: {
    URL_BASE: `${URL_BASE}/informacion-personal`,
    CONTACT: `${URL_BASE}/informacion-personal/contacto`,
    ACADEMIC: `${URL_BASE}/informacion-personal/academico`,
    JOB: `${URL_BASE}/informacion-personal/laboral`,
    LANGUAGES: `${URL_BASE}/informacion-personal/idiomas`,
    ACCOUNT: `${URL_BASE}/mi-cuenta`,
  },
  APPY_TO_PROGRAM: {
    URL_BASE: `${URL_BASE}/postular`,
    PROGRAM: (uuid: string, plan: string, headquarter: string) =>
      `${URL_BASE}/postular/${uuid}/${plan}/${headquarter}`,
    SUCCESS: (uuid: string, plan: string, headquarter: string, slug: string) =>
      `${URL_BASE}/postular/${uuid}/${plan}/${headquarter}/${slug}/success`,
  },
  FILES: {
    URL_BASE: `${URL_BASE}/mis-archivos`,
    FILE_TYPE: (type: string) => `${URL_BASE}/mis-archivos/${type}`,
  },
  AUTH: {
    LOGIN: `${URL_BASE}/login`,
    REGISTER: `${URL_BASE}/sign-up`,
  },
  // AUTH: {
  //   URL_BASE: `${URL_BASE}/auth`,
  //   LOGIN: `${URL_BASE}/auth/login`,
  //   REGISTER: `${URL_BASE}/auth/register`,
  // },
}

export const LANDINGS_URLS_APP = {
  PAYMENTS: {
    URL_BASE: `${URL_PAYMENTS}`,
  },
}
