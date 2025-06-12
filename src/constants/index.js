export const API_BASE_URL = "http://localhost:3001";

export const VALID_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif"];

export const ROUTES = {
  HOME: "/",
  TEAM: "/team",
  INTRO: "/intro",
  LOGIN: "/login",
  SIGNUP: "/signup",
  BOARD: "/board",
  POST: "/post",
};

export const MESSAGES = {
  REQUIRED_FIELD: "필수 항목을 입력해주세요.",
  CREATE_SUCCESS: "게시글이 생성되었습니다.",
  CREATE_FAIL: "게시글 생성에 실패했습니다.",
  UPDATE_SUCCESS: "수정이 완료되었습니다.",
  DELETE_CONFIRM: "삭제할까요?",
  LOGIN_REQUIRED: "댓글을 작성하려면 로그인하세요.",
};
