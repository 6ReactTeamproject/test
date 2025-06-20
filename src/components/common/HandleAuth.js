export default function HandleAuth(user, navigate, add) {
  // 사용자가 로그인하지 않은 경우
  if (!user) {
    alert("로그인이 필요한 기능입니다.");
    navigate("/login"); // 로그인 페이지로 이동
  }
  // 사용자가 로그인한 경우
  else {
    navigate(add); // 지정된 경로로 이동
  }
}
