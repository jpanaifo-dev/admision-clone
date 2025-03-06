const URL_BASE = '/admin'
export const urlDataAdmisionAdmin = {
  home: {
    urls: {
      base: `${URL_BASE}`,
    },
    title: 'Inicio',
    description: 'Bienvenido a la plataforma de admisión de la UNAP',
  },
  convocation: {
    urls: {
      base: `${URL_BASE}/convocatorias`,
      history: `${URL_BASE}/convocatorias/historial`,
      create: `${URL_BASE}/convocatorias/crear`,
      edit: `${URL_BASE}/convocatorias/{id}/editar`,
      detail: `${URL_BASE}/convocatorias/{id}`,
    },
    title: 'Convocatorias',
    description: 'Lista de convocatorias',
  },
  admision: {
    urls: {
      base: `${URL_BASE}/evaluaciones`,
      history: `${URL_BASE}/evaluaciones/historial`,
    },
    title: 'Postulaciones',
    description: 'Historial de postulaciones',
  },
  reports: {
    urls: {
      base: `${URL_BASE}/reportes`,
    },
    title: 'Reportes',
    description: 'Reportes de postulaciones',
  },
}
