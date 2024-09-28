export const API_ENDPOINTS = {
  MEMO: {
    CREATE_MEMOS: '/memos', 
    MODIFY_MEMO: '/memos/:memoId',
  },
  AUTH: {
    LOGIN: '/auth/login/:pageId',
    LOGOUT: '/auth/logout',
  },
  PAGE: {
    GET_PAGE: '/page/:pageId',
  }
};
