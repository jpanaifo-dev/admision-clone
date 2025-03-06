import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ChevronsUp,
  ChevronsDown,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

export const customIcons = {
  moveToAvailable: <ChevronLeft size={16} className="text-gray-600" />,
  moveAllToAvailable: <ChevronsLeft size={16} className="text-gray-600" />,
  moveToSelected: <ChevronRight size={16} className="text-gray-600" />,
  moveAllToSelected: <ChevronsRight size={16} className="text-gray-600" />,
  moveDown: <ChevronDown size={16} className="text-gray-600" />,
  moveUp: <ChevronUp size={16} className="text-gray-600" />,
  moveTop: <ChevronsUp size={16} className="text-gray-600" />,
  moveBottom: <ChevronsDown size={16} className="text-gray-600" />,
};

export const lang = {
  availableHeader: "📝 Programas disponibles",
  selectedHeader: "🖋️ Programas seleccionados",
  noAvailableOptions: "No hay programas disponibles",
  noSelectedOptions: "No hay programas seleccionados",
  availableFilterPlaceholder: "Buscar por nombre...",
  selectedFilterPlaceholder: "Buscar por nombre...",
};

export const dualListData = [
  {
    label: "Plan de estudio 2024-I",
    // disabled: true,
    options: [
      { value: "metodologia_investigacion", label: "Metodología de la Investigación" },
      { value: "estadistica_avanzada", label: "Estadística Avanzada" },
      { value: "etica_profesional", label: "Ética Profesional" },
    ],
  },
  {
    label: "Plan de estudio 2024-II",
    options: [
      { value: "gestion_proyectos", label: "Gestión de Proyectos" },
      { value: "innovacion_tecnologica", label: "Innovación Tecnológica" },
      { value: "liderazgo_organizacional", label: "Liderazgo Organizacional" },
    ],
  },
  {
    label: "Plan de estudio 2025-I",
    options: [
      { value: "seminario_tesis_i", label: "Seminario de Tesis I" },
      { value: "seminario_tesis_ii", label: "Seminario de Tesis II" },
      { value: "publicacion_cientifica", label: "Publicación Científica" },
    ],
  },
  {
    label: "Plan de estudio 2025-II",
    options: [
      { value: "defensa_tesis", label: "Defensa de Tesis" },
      { value: "examen_grado", label: "Examen de Grado" },
      { value: "sustentacion_proyecto", label: "Sustentación de Proyecto" },
    ],
  },
];
