export const API_ENDPOINTS = {
  MEMO: {
    MEMOS: '/memo',
    MODIFY_MEMO: '/memo/:memoId',
    MEMO_CATEGORIES: '/memo?category=:category&&page_id=:pageId',
  },
  AUTH: {
    LOGIN: '/auth/login/:pageId',
    LOGOUT: '/auth/logout',
    PUT_PAGE: '/page',
  },
  PAGE: {
    GET_PAGE: '/page/:pageId',
  },
};
