import { useEffect, useState } from "react";
import { useUser } from "./UserContext";

export function UserSection() {
  const { user, setUser } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  // localStorage로부터 초기 로딩 완료 여부 판단
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, [setUser]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  if (isLoading) return <p>로딩 중...</p>;

  return (
    <div>
      <p>{user?.name ?? "Guest"}님 환영합니다!</p>
      {user && <button onClick={handleLogout}>로그아웃</button>}
    </div>
  );
}