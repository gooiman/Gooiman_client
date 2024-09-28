export const API_ENDPOINTS = {
  MEMO: {
    MEMOS: '/memos', 
    MODIFY_MEMO: '/memos/:memoId',
  },
  AUTH: {
    LOGIN: '/auth/login/:pageId',
    LOGOUT: '/auth/logout',
    PUT_PAGE: '/page'
  },
  PAGE: {
    GET_PAGE: '/page/:pageId',
  }
};
