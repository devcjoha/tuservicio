export type ActionId =
  | "REQ_CREATE"
  | "REQ_VIEW_STATUS"
  | "REQ_CANCEL"
  | "REQ_RATE"
  | "REQ_SEARCH"
  | "REQ_FILTER_LOCATION"
  | "REQ_FILTER_TYPE"
  | "REQ_FILTER_POPULARITY"
  | "INST_CREATE"
  | "INST_EDIT"
  | "INST_DELETE"
  | "INST_TOGGLE_ACTIVE"
  | "INST_VIEW_OWN"
  | "INST_VIEW_ALL"
  | "SERV_CREATE"
  | "SERV_EDIT"
  | "SERV_DELETE"
  | "SERV_TOGGLE_ACTIVE"
  | "SERV_VIEW_OWN"
  | "SERV_VIEW_ALL"
  | "EMP_CREATE"
  | "EMP_EDIT"
  | "EMP_DELETE"
  | "REQ_VIEW_INSTITUTION"
  | "REQ_ASSIGN"
  | "REQ_UPDATE_STATUS"
  | "REQ_ACCEPT"
  | "REQ_REJECT"
  | "STATS_VIEW_INSTITUTION"
  | "STATS_VIEW_GLOBAL"
  | "USER_SUSPEND"
  | "USER_DELETE"
  | "USER_VIEW_ALL"
  | "INST_SUSPEND"
  | "SERV_SUSPEND"
  | "DISPUTE_RESOLVE"
  | "REVIEW_MODERATE"
  | "REVIEW_DELETE"
  | "NOTIF_SEND_GLOBAL"
  | "SUPPORT_RESPOND"
  | "ROLE_ASSIGN"
  | "ROLE_VIEW_HISTORY"
  | "LOGS_VIEW_SYSTEM"
  | "LOGS_VIEW_SECURITY"
  | "LOGS_VIEW_AUDIT"
  | "FEATURE_TOGGLE"
  | "SYSTEM_CONFIG"
  | "SYSTEM_MAINTENANCE"
  | "SYSTEM_EMERGENCY";

export type Role = "user" | "owner" | "admin" | "superadmin";

export const rolePermissions: Record<Role, ActionId[]> = {
  user: [
    "REQ_CREATE",
    "REQ_VIEW_STATUS",
    "REQ_CANCEL",
    "REQ_RATE",
    "REQ_SEARCH",
    "REQ_FILTER_LOCATION",
    "REQ_FILTER_TYPE",
    "REQ_FILTER_POPULARITY",
    "INST_CREATE"
  ],

  owner: [
    "REQ_CREATE",
    "REQ_VIEW_STATUS",
    "REQ_CANCEL",
    "REQ_RATE",
    "REQ_SEARCH",
    "REQ_FILTER_LOCATION",
    "REQ_FILTER_TYPE",
    "REQ_FILTER_POPULARITY",
    "INST_CREATE",

    "INST_EDIT",
    "INST_DELETE",
    "INST_TOGGLE_ACTIVE",
    "INST_VIEW_OWN",

    "SERV_CREATE",
    "SERV_EDIT",
    "SERV_DELETE",
    "SERV_TOGGLE_ACTIVE",
    "SERV_VIEW_OWN",

    "EMP_CREATE",
    "EMP_EDIT",
    "EMP_DELETE",

    "REQ_VIEW_INSTITUTION",
    "REQ_ASSIGN",
    "REQ_UPDATE_STATUS",
    "REQ_ACCEPT",
    "REQ_REJECT",

    "STATS_VIEW_INSTITUTION"
  ],

  admin: [
    "INST_VIEW_ALL",
    "SERV_VIEW_ALL",
    "USER_VIEW_ALL",
    "REQ_VIEW_INSTITUTION",
    "REQ_VIEW_STATUS",

    "INST_SUSPEND",
    "SERV_SUSPEND",
    "USER_SUSPEND",

    "DISPUTE_RESOLVE",
    "REVIEW_MODERATE",
    "REVIEW_DELETE",

    "STATS_VIEW_GLOBAL",
    "NOTIF_SEND_GLOBAL",
    "SUPPORT_RESPOND"
  ],

  superadmin: [
    "ROLE_ASSIGN",
    "ROLE_VIEW_HISTORY",

    "INST_EDIT",
    "INST_DELETE",
    "INST_VIEW_ALL",
    "INST_SUSPEND",

    "SERV_EDIT",
    "SERV_DELETE",
    "SERV_VIEW_ALL",
    "SERV_SUSPEND",

    "USER_DELETE",
    "USER_SUSPEND",
    "USER_VIEW_ALL",

    "LOGS_VIEW_SYSTEM",
    "LOGS_VIEW_SECURITY",
    "LOGS_VIEW_AUDIT",

    "FEATURE_TOGGLE",
    "SYSTEM_CONFIG",
    "SYSTEM_MAINTENANCE",
    "SYSTEM_EMERGENCY",

    "STATS_VIEW_GLOBAL"
  ]
};

export function can(role: Role, action: ActionId): boolean {
  return rolePermissions[role].includes(action);
}