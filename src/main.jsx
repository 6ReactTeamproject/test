import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter";
import { UserContext } from "./hooks/UserContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Root() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 새로고침 시 localStorage에서 로그인 사용자 정보를 복원
    const saved = localStorage.getItem("user");
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  return (
    // 로그인 사용자 상태를 전역으로 공유하기 위한 Context Provider
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <AppRouter setUser={setUser} />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

// React 18 방식으로 루트 DOM 노드에 앱 렌더링
createRoot(document.getElementById("root")).render(<Root />);
