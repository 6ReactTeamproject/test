export default function HandleAuth(user, navigate, add) {

    if (!user) {
      navigate("/login");
      alert("로그인이 필요한 기능입니다.");
    }
    else {
      navigate(add);
    } 
  }