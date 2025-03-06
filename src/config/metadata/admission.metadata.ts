export const APPLICATION_METADATA = {
  PAGES: {
    HOME: {
      title: 'Bienveido | Escuela de Postgrado',
      description:
        'Bienvenidos a tu panel de postulación. Aquí podrás postularte a la Escuela de Postgrado de la Universidad Nacional de la Amazonía Peruana.',
    },
    CONVOCATORIES: {
      title: 'Convocatorias Disponibles',
      description: 'Descubre nuestras convocatorias activas.',
    },
    PROGRAMS_CONVOCATORIES: {
      title: 'Programas de Posgrado',
      description: 'Descubre nuestros programas de posgrado.',
    },
    PROGRAM_DETAIL: {
      title: (programName: string) => `Programa ${programName}`,
      description: (description: string) => `Conoce más sobre ${description}.`,
    },
    APPLICATION_LIST: {
      title: 'Historial de Postulaciones',
      description:
        'Historial de postulaciones a la Escuela de Posgrado de la Universidad Nacional de la Amazonía Peruana.',
    },
    FILES: {
      title: 'Documentos',
      description: 'Documentos de postulación.',
    },
    PERSONAL_INFO: {
      title: 'Información Personal',
      description: 'Completa tu información personal.',
    },
    ACADEMIC_INFO: {
      title: 'Información Académica',
      description: 'Completa tu información académica.',
    },
    JOB_INFO: {
      title: 'Información Laboral',
      description: 'Completa tu información laboral.',
    },
    LANGUAGES_INFO: {
      title: 'Información de Idiomas',
      description: 'Completa tu información de idiomas.',
    },
    CONTACT_INFO: {
      title: 'Información de Contacto',
      description: 'Completa tu información de contacto.',
    },
  },
}
