/** * ARCHIVO GENERADO AUTOMÁTICAMENTE POR EL BACKEND
   * NO EDITAR MANUALMENTE */
 
  export type ActionId =
   "101" | "102" | "103" | "104" | "201" | "202" | "203" | "204" | "205" | "206" | "207" | "208" | "209" | "210" | "211" | "212" | "213" | "301" | "302" | "303" | "304" | "305" | "306" | "307" | "401" | "402" | "403" | "404" | "405" | "406" | "407" | "501" | "502" | "503" | "601" | "602" | "701" | "702" | "703" | "801" | "802" | "803" | "804" | "900" | "901" | "902" | "903" | "904" | "905" | "906" | "907" | "908" | "909" | "910" | "911" | "912";

  export type ActionType =
  "AUTH_REGISTER"
  | "AUTH_LOGIN"
  | "AUTH_LOGOUT"
  | "AUTH_PROFILE"
  | "REQ_SERV_CREATE"
  | "REQ_SERV_VIEW_STATUS"
  | "REQ_SERV_CANCEL"
  | "REQ_SERV_RATE"
  | "REQ_SERV_SEARCH"
  | "REQ_SERV_FILTER_LOCATION"
  | "REQ_SERV_FILTER_TYPE"
  | "REQ_SERV_FILTER_POPULARITY"
  | "REQ_VIEW_COMPANY"
  | "REQ_ASSIGN"
  | "REQ_SERV_UPDATE_STATUS"
  | "REQ_SERV_ACCEPT"
  | "REQ_SERV_REJECT"
  | "COMPANY_CREATE"
  | "COMPANY_EDIT"
  | "COMPANY_DELETE"
  | "COMPANY_TOGGLE_ACTIVE"
  | "COMPANY_VIEW_ID"
  | "COMPANY_VIEW_ALL"
  | "COMPANY_SUSPEND"
  | "SERV_CREATE"
  | "SERV_EDIT"
  | "SERV_DELETE"
  | "SERV_TOGGLE_ACTIVE"
  | "SERV_VIEW_OWN"
  | "SERV_VIEW_ALL"
  | "SERV_SUSPEND"
  | "EMP_CREATE"
  | "EMP_EDIT"
  | "EMP_DELETE"
  | "STATS_VIEW_COMPANY"
  | "STATS_VIEW_GLOBAL"
  | "USER_SUSPEND"
  | "USER_DELETE"
  | "USER_VIEW_ALL"
  | "DISPUTE_RESOLVE"
  | "REVIEW_MODERATE"
  | "REVIEW_DELETE"
  | "SUPPORT_RESPOND"
  | "PERMISSIONS_VIEW"
  | "ROLE_ASSIGN"
  | "ROLE_VIEW_HISTORY"
  | "LOGS_VIEW_SYSTEM"
  | "LOGS_VIEW_SECURITY"
  | "LOGS_VIEW_AUDIT"
  | "FEATURE_TOGGLE"
  | "SYSTEM_CONFIG"
  | "SYSTEM_MAINTENANCE"
  | "SYSTEM_EMERGENCY"
  | "PERMISSIONS_VIEW_ONE"
  | "PERMISSIONS_EDIT"
  | "PERMISSIONS_CREATE";

  export const PERMISSIONS_ROLES = {
  "user": [
    "201",
    "202",
    "203",
    "204",
    "205",
    "206",
    "207",
    "208",
    "301",
    "104"
  ],
  "owner": [
    "201",
    "104",
    "209",
    "210",
    "211",
    "212",
    "213",
    "302",
    "304",
    "305",
    "401",
    "402",
    "403",
    "404",
    "405",
    "501",
    "502",
    "503",
    "601"
  ],
  "admin": [
    "202",
    "209",
    "306",
    "307",
    "406",
    "407",
    "602",
    "701",
    "703",
    "801",
    "802",
    "803",
    "804",
    "910",
    "104"
  ],
  "superadmin": [
    "302",
    "303",
    "305",
    "306",
    "307",
    "401",
    "402",
    "403",
    "406",
    "407",
    "702",
    "900",
    "902",
    "903",
    "904",
    "905",
    "906",
    "907",
    "908",
    "909",
    "910",
    "911",
    "912",
    "104"
  ]
} as const;
  
  export const PERMISSIONS_LINKS = {
  "101": {
    "required": "AUTH_REGISTER",
    "name": "Registro de usuario",
    "label": "Registrarse",
    "href": "/register",
    "category": "auth",
    "icon": "user-plus",
    "description": "Permite al usuario crear una nueva cuenta",
    "order": 1
  },
  "102": {
    "required": "AUTH_LOGIN",
    "name": "Login de usuario",
    "label": "Iniciar sesión",
    "href": "/login",
    "category": "auth",
    "icon": "LogIn",
    "description": "Permite al usuario acceder a su cuenta",
    "order": 2
  },
  "103": {
    "required": "AUTH_LOGOUT",
    "name": "Cerrar Sesión",
    "label": "Cerrar sesión",
    "href": "/logout",
    "category": "auth",
    "icon": "LogOut",
    "description": "Finaliza la sesión activa del usuario",
    "order": 3
  },
  "104": {
    "required": "AUTH_PROFILE",
    "name": "Ruta Protegida de usuario",
    "label": "Perfil",
    "href": "/profile",
    "category": "auth",
    "icon": "UserRound",
    "description": "Accede a la ruta protegida del perfil de usuario",
    "order": 4
  },
  "201": {
    "required": "REQ_SERV_CREATE",
    "name": "Crear solicitud de servicio",
    "label": "Nueva solicitud",
    "href": "/request-new",
    "category": "main",
    "icon": "CirclePlus",
    "description": "Permite al usuario crear una nueva solicitud de servicio",
    "order": 1
  },
  "202": {
    "required": "REQ_SERV_VIEW_STATUS",
    "name": "Ver estado de solicitudes",
    "label": "Mis solicitudes",
    "href": "/request",
    "category": "main",
    "icon": "List",
    "description": "Permite al usuario ver el estado de sus solicitudes",
    "order": 2
  },
  "203": {
    "required": "REQ_SERV_CANCEL",
    "name": "Cancelar solicitud",
    "label": "Cancelar solicitud",
    "href": "/request-cancel",
    "category": "main",
    "icon": "CircleX",
    "description": "Permite al usuario cancelar una solicitud activa",
    "order": 3
  },
  "204": {
    "required": "REQ_SERV_RATE",
    "name": "Calificar servicio completado",
    "label": "Calificar servicio",
    "href": "/request-qualify",
    "category": "main",
    "icon": "Star",
    "description": "Permite al usuario calificar un servicio completado",
    "order": 4
  },
  "205": {
    "required": "REQ_SERV_SEARCH",
    "name": "Buscar servicios",
    "label": "Buscar servicios",
    "href": "/services-search",
    "category": "search",
    "icon": "Search",
    "description": "Permite al usuario buscar servicios disponibles",
    "order": 1
  },
  "206": {
    "required": "REQ_SERV_FILTER_LOCATION",
    "name": "Filtrar por localización",
    "label": "Filtrar por ubicación",
    "href": "/services-filter/location",
    "category": "search",
    "icon": "MapPin",
    "description": "Filtra servicios según la ubicación",
    "order": 2
  },
  "207": {
    "required": "REQ_SERV_FILTER_TYPE",
    "name": "Filtrar por tipo",
    "label": "Filtrar por tipo",
    "href": "/services-filter/type",
    "category": "search",
    "icon": "Filter",
    "description": "Filtra servicios según el tipo",
    "order": 3
  },
  "208": {
    "required": "REQ_SERV_FILTER_POPULARITY",
    "name": "Filtrar por popularidad",
    "label": "Filtrar por popularidad",
    "href": "/services-filter/popularity",
    "category": "search",
    "icon": "UserStar",
    "description": "Filtra servicios según popularidad",
    "order": 4
  },
  "209": {
    "required": "REQ_VIEW_COMPANY",
    "name": "Ver solicitudes de la Compañía",
    "label": "Solicitudes de compañía",
    "href": "/company-request",
    "category": "management",
    "icon": "Building",
    "description": "Permite ver las solicitudes de la compañía",
    "order": 5
  },
  "210": {
    "required": "REQ_ASSIGN",
    "name": "Asignar profesional",
    "label": "Asignar profesional",
    "href": "/request-assign",
    "category": "management",
    "icon": "UserCheck",
    "description": "Permite asignar un profesional a una solicitud",
    "order": 6
  },
  "211": {
    "required": "REQ_SERV_UPDATE_STATUS",
    "name": "Cambiar estado de solicitud",
    "label": "Actualizar estado",
    "href": "/request-state",
    "category": "management",
    "icon": "SquarePower",
    "description": "Permite actualizar el estado de una solicitud",
    "order": 7
  },
  "212": {
    "required": "REQ_SERV_ACCEPT",
    "name": "Aceptar solicitud",
    "label": "Aceptar solicitud",
    "href": "/request-accept",
    "category": "management",
    "icon": "CircleCheckBig",
    "description": "Permite aceptar una solicitud",
    "order": 8
  },
  "213": {
    "required": "REQ_SERV_REJECT",
    "name": "Rechazar solicitud",
    "label": "Rechazar solicitud",
    "href": "/request-reject",
    "category": "management",
    "icon": "CircleSlash2",
    "description": "Permite rechazar una solicitud",
    "order": 9
  },
  "301": {
    "required": "COMPANY_CREATE",
    "name": "Crear Compañía",
    "label": "Registrar compañía",
    "href": "/dashboard/user/create-company",
    "category": "management",
    "icon": "Building",
    "description": "Permite crear una nueva compañía",
    "order": 1
  },
  "302": {
    "required": "COMPANY_EDIT",
    "name": "Editar Compañía",
    "label": "Editar compañía",
    "href": "/company-edit",
    "category": "management",
    "icon": "SquarePen",
    "description": "Permite editar datos de la compañía",
    "order": 2
  },
  "303": {
    "required": "COMPANY_DELETE",
    "name": "Eliminar Compañía",
    "label": "Eliminar compañía",
    "href": "/company-delete",
    "category": "management",
    "icon": "SquareX",
    "description": "Permite eliminar una compañía",
    "order": 3
  },
  "304": {
    "required": "COMPANY_TOGGLE_ACTIVE",
    "name": "Activar/desactivar Compañía",
    "label": "Activar/Desactivar compañía",
    "href": "/company-state",
    "category": "management",
    "icon": "CirclePower",
    "description": "Permite activar o desactivar una compañía",
    "order": 4
  },
  "305": {
    "required": "COMPANY_VIEW_ID",
    "name": "Ver Compañía por Id",
    "label": "Ver compañía",
    "href": "/company",
    "category": "management",
    "icon": "Building",
    "description": "Permite ver la compañía una Compañía por Id",
    "order": 5
  },
  "306": {
    "required": "COMPANY_VIEW_ALL",
    "name": "Ver todas las Compañías",
    "label": "Todas las compañías",
    "href": "/companies",
    "category": "admin",
    "icon": "Building",
    "description": "Permite ver todas las compañías registradas en el sistema",
    "order": 6
  },
  "307": {
    "required": "COMPANY_SUSPEND",
    "name": "Suspender Compañía",
    "label": "Suspender compañía",
    "href": "/company-suspend",
    "category": "admin",
    "icon": "CirclePause",
    "description": "Permite suspender temporalmente una compañía",
    "order": 7
  },
  "401": {
    "required": "SERV_CREATE",
    "name": "Owner crear servicio",
    "label": "Crear servicio",
    "href": "/services-new",
    "category": "management",
    "icon": "CirclePlus",
    "description": "Permite al owner crear un nuevo servicio",
    "order": 1
  },
  "402": {
    "required": "SERV_EDIT",
    "name": "Owner editar servicio",
    "label": "Editar servicio",
    "href": "/services-edit",
    "category": "management",
    "icon": "SquarePen",
    "description": "Permite al owner editar un servicio existente",
    "order": 2
  },
  "403": {
    "required": "SERV_DELETE",
    "name": "Owner eliminar servicio",
    "label": "Eliminar servicio",
    "href": "/services-delete",
    "category": "management",
    "icon": "SquareX",
    "description": "Permite al owner eliminar un servicio",
    "order": 3
  },
  "404": {
    "required": "SERV_TOGGLE_ACTIVE",
    "name": "Owner Activar/desactivar servicio",
    "label": "Activar/Desactivar servicio",
    "href": "/services-state",
    "category": "management",
    "icon": "CirclePower",
    "description": "Permite al owner activar o desactivar un servicio",
    "order": 4
  },
  "405": {
    "required": "SERV_VIEW_OWN",
    "name": "Owner ver servicios propios",
    "label": "Mis servicios",
    "href": "/services-my",
    "category": "management",
    "icon": "List",
    "description": "Permite al owner ver sus propios servicios",
    "order": 5
  },
  "406": {
    "required": "SERV_VIEW_ALL",
    "name": "Ver todos los servicios",
    "label": "Todos los servicios",
    "href": "/services",
    "category": "admin",
    "icon": "ListChecks",
    "description": "Permite ver todos los servicios registrados",
    "order": 6
  },
  "407": {
    "required": "SERV_SUSPEND",
    "name": "Suspender servicio",
    "label": "Suspender servicio",
    "href": "/services-suspend",
    "category": "admin",
    "icon": "CirclePause",
    "description": "Permite suspender temporalmente un servicio",
    "order": 7
  },
  "501": {
    "required": "EMP_CREATE",
    "name": "Owner Crear empleado",
    "label": "Crear empleado",
    "href": "/employees-new",
    "category": "management",
    "icon": "UserPlus",
    "description": "Permite al owner crear un nuevo empleado",
    "order": 1
  },
  "502": {
    "required": "EMP_EDIT",
    "name": "Owner Editar empleado",
    "label": "Editar empleado",
    "href": "/employees-edit",
    "category": "management",
    "icon": "UserRoundPen",
    "description": "Permite al owner editar datos de un empleado",
    "order": 2
  },
  "503": {
    "required": "EMP_DELETE",
    "name": "Owner Eliminar empleado",
    "label": "Eliminar empleado",
    "href": "/employees-delete",
    "category": "management",
    "icon": "UserRoundX",
    "description": "Permite al owner eliminar un empleado",
    "order": 3
  },
  "601": {
    "required": "STATS_VIEW_COMPANY",
    "name": "Owner Ver estadísticas de Compañía",
    "label": "Estadísticas de compañía",
    "href": "/statistics-company",
    "category": "management",
    "icon": "SquareKanban",
    "description": "Permite al owner ver estadísticas de su compañía",
    "order": 1
  },
  "602": {
    "required": "STATS_VIEW_GLOBAL",
    "name": "Ver estadísticas globales",
    "label": "Estadísticas globales",
    "href": "/statistics-global",
    "category": "admin",
    "icon": "ChartBar",
    "description": "Permite ver estadísticas globales del sistema",
    "order": 2
  },
  "701": {
    "required": "USER_SUSPEND",
    "name": "Suspender usuario",
    "label": "Suspender usuario",
    "href": "/users-suspend",
    "category": "admin",
    "icon": "CirclePause",
    "description": "Permite suspender temporalmente un usuario",
    "order": 1
  },
  "702": {
    "required": "USER_DELETE",
    "name": "Eliminar usuario",
    "label": "Eliminar usuario",
    "href": "/users-delete",
    "category": "admin",
    "icon": "CircleX",
    "description": "Permite eliminar un usuario del sistema",
    "order": 2
  },
  "703": {
    "required": "USER_VIEW_ALL",
    "name": "Ver todos los usuarios",
    "label": "Todos los usuarios",
    "href": "/users",
    "category": "admin",
    "icon": "UsersRound",
    "description": "Permite ver todos los usuarios registrados",
    "order": 3
  },
  "801": {
    "required": "DISPUTE_RESOLVE",
    "name": "Resolver disputas",
    "label": "Resolver disputas",
    "href": "/disputes-solve",
    "category": "admin",
    "icon": "Gavel",
    "description": "Permite resolver disputas entre usuarios o compañías",
    "order": 1
  },
  "802": {
    "required": "REVIEW_MODERATE",
    "name": "Revisar calificaciones",
    "label": "Moderar calificaciones",
    "href": "/reviews-moderate",
    "category": "admin",
    "icon": "StarHalf",
    "description": "Permite moderar calificaciones de servicios",
    "order": 2
  },
  "803": {
    "required": "REVIEW_DELETE",
    "name": "Eliminar calificaciones",
    "label": "Eliminar calificación",
    "href": "/reviews-delete",
    "category": "admin",
    "icon": "CircleX",
    "description": "Permite eliminar calificaciones de servicios",
    "order": 3
  },
  "804": {
    "required": "SUPPORT_RESPOND",
    "name": "Responder tickets de soporte",
    "label": "Responder soporte",
    "href": "/support-responder",
    "category": "admin",
    "icon": "LifeBuoy",
    "description": "Permite responder tickets de soporte",
    "order": 4
  },
  "900": {
    "required": "PERMISSIONS_VIEW",
    "name": "Ver los permisos",
    "label": "Permisos",
    "href": "/permissions",
    "category": "setting",
    "icon": "ShieldUser",
    "description": "Permite ver todos los permisos",
    "order": 1
  },
  "901": {
    "required": "ROLE_ASSIGN",
    "name": "Cambiar roles",
    "label": "Asignar roles",
    "href": "/roles-assign",
    "category": "setting",
    "icon": "UserCog",
    "description": "Permite asignar o cambiar roles de usuarios",
    "order": 1
  },
  "902": {
    "required": "ROLE_VIEW_HISTORY",
    "name": "Ver historial de roles",
    "label": "Historial de roles",
    "href": "/roles-record",
    "category": "setting",
    "icon": "History",
    "description": "Permite ver el historial de cambios de roles en el sistema",
    "order": 2
  },
  "903": {
    "required": "LOGS_VIEW_SYSTEM",
    "name": "Ver logs del sistema",
    "label": "Logs del sistema",
    "href": "/logs-system",
    "category": "setting",
    "icon": "Server",
    "description": "Permite visualizar los registros generales del sistema",
    "order": 3
  },
  "904": {
    "required": "LOGS_VIEW_SECURITY",
    "name": "Ver logs de seguridad",
    "label": "Logs de seguridad",
    "href": "/logs-security",
    "category": "setting",
    "icon": "Shield",
    "description": "Permite visualizar los registros relacionados con la seguridad",
    "order": 4
  },
  "905": {
    "required": "LOGS_VIEW_AUDIT",
    "name": "Ver logs de auditoría",
    "label": "Logs de auditoría",
    "href": "/logs-audit",
    "category": "setting",
    "icon": "ClipboardList",
    "description": "Permite visualizar los registros de auditoría del sistema",
    "order": 5
  },
  "906": {
    "required": "FEATURE_TOGGLE",
    "name": "Activar/desactivar features",
    "label": "Activar/Desactivar features",
    "href": "/config-features",
    "category": "setting",
    "icon": "CirclePower",
    "description": "Permite activar o desactivar funcionalidades del sistema",
    "order": 6
  },
  "907": {
    "required": "SYSTEM_CONFIG",
    "name": "Configurar políticas internas",
    "label": "Configuración del sistema",
    "href": "/config-system",
    "category": "setting",
    "icon": "Settings",
    "description": "Permite configurar políticas internas del sistema",
    "order": 7
  },
  "908": {
    "required": "SYSTEM_MAINTENANCE",
    "name": "Acciones de mantenimiento",
    "label": "Mantenimiento",
    "href": "/config-maintenance",
    "category": "setting",
    "icon": "BrushCleaning",
    "description": "Permite ejecutar acciones de mantenimiento del sistema",
    "order": 8
  },
  "909": {
    "required": "SYSTEM_EMERGENCY",
    "name": "Acciones de emergencia",
    "label": "Emergencia",
    "href": "/config-emergency",
    "category": "setting",
    "icon": "TriangleAlert",
    "description": "Permite ejecutar acciones de emergencia en el sistema",
    "order": 9
  },
  "910": {
    "required": "PERMISSIONS_VIEW_ONE",
    "name": "Ver un permiso",
    "label": "Ver permiso",
    "href": "/permission-one",
    "category": "setting",
    "icon": "ShieldUser",
    "description": "Permite ver un permiso",
    "order": 1
  },
  "911": {
    "required": "PERMISSIONS_EDIT",
    "name": "Editar un permiso",
    "label": "Editar Permisos",
    "href": "/permission-edit",
    "category": "setting",
    "icon": "ShieldUser",
    "description": "Permite editar un permiso",
    "order": 1
  },
  "912": {
    "required": "PERMISSIONS_CREATE",
    "name": "Crear un nuevo permiso",
    "label": "Crear Permiso",
    "href": "/permission-new",
    "category": "setting",
    "icon": "ShieldUser",
    "description": "Permite crear un permiso",
    "order": 1
  }
} as const;