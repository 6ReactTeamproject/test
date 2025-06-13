import React from "react";
import { useUser } from "../../hooks/UserContext";
import ChangePasswordForm from "./ChangePasswordForm.jsx";
import ChangeNameForm from "./ChangeNameForm.jsx";

export default function MyPage() {
  const { user } = useUser();

  if (!user) return <p>로그인이 필요합니다.</p>;

  return (
    <div className="mypage-page">
      <h2>마이페이지</h2>
      <ChangePasswordForm userId={user.id} />
      <ChangeNameForm userId={user.id} currentName={user.name} />
    </div>
  );
}
