import { Link } from "react-router-dom"
export default function Sidebar(){
  return(
    <div className="sidebar">
        <Link to="/mypage">마이페이지</Link>
        <Link to="/mypage/nickname">닉네임 변경</Link>
        <Link to="/mypage/password">비밀번호 변경</Link>
      </div>
  )
}
