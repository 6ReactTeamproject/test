import { UserSection } from "../components/Travel/UserSection";
import { useNavigate, useLocation, useNavigationType } from "react-router-dom";
import DropdownMenu from "../components/common/DropDownMenu";
import { useEffect, useRef } from "react";
import { useUser } from "../components/Travel/UserContext";

const Layout = ({ children }) => {
  const nav = useNavigate();
  const location = useLocation();
  const routeHistory = useRef([]);
  const customHistory = useRef({
    entries: [],
    index: -1,
  });
  const navType = useNavigationType();
  const user = useUser();

  useEffect(() => {
    if (customHistory.current.index === -1) {
      customHistory.current.entries.push(location.pathname);
      customHistory.current.index = 0;
    } else {
      switch (navType) {
        case "PUSH":
          customHistory.current.entries = customHistory.current.entries.slice(
            0,
            customHistory.current.index + 1
          );
          customHistory.current.entries.push(location.pathname);
          customHistory.current.index++;
          break;
        case "REPLACE":
          customHistory.current.entries[customHistory.current.index] =
            location.pathname;
          break;
        case "POP": {
          const idx = customHistory.current.entries.indexOf(location.pathname);
          if (idx !== -1) {
            customHistory.current.index = idx;
          } else {
            customHistory.current.entries.push(location.pathname);
            customHistory.current.index =
              customHistory.current.entries.length - 1;
          }
          break;
        }
        default:
          break;
      }
    }

    if (user) {
      if (
        navType === "POP" &&
        ["/login", "/signup"].includes(location.pathname)
      ) {
        // 현재 인덱스 위치
        let i = customHistory.current.index;
        // 뒤로 이동하며 로그인/회원가입 경로를 건너뜀
        while (
          i > 0 &&
          ["/login", "/signup"].includes(customHistory.current.entries[i])
        ) {
          i--;
        }
        if (i >= 0) {
          const target = customHistory.current.entries[i];
          customHistory.current.index = i;
          nav(target, { replace: true });
          return;
        }
      }
    }

    // 마지막 비인증(public) 경로를 세션에 저장
    const publicPaths = ["/login", "/signup"];
    if (!publicPaths.includes(location.pathname)) {
      sessionStorage.setItem("lastPublicPath", location.pathname);
    }

    // 독자적으로 기록하는 경로 히스토리 저장
    routeHistory.current.push(location.pathname);
  }, [location, navType, nav, user]);

  return (
    <div>
      <header
        style={{
          backgroundColor: "#f8f9fa",
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{ cursor: "pointer", fontWeight: "bold", fontSize: "20px" }}
          onClick={() => nav("/")}
        >
          로고예시
        </div>
        <div>
          <UserSection />
        </div>
      </header>

      <nav
        style={{
          backgroundColor: "#e9ecef",
          padding: "10px",
          display: "flex",
        }}
      >
        <div style={{ marginLeft: "auto" }}>
          <DropdownMenu
            trigger={<p>메뉴</p>}
            options={[
              { label: "여행 소개", onClick: () => nav("/intro") },
              { label: "멤버 소개", onClick: () => nav("/team") },
              { label: "게시판", onClick: () => nav("/post") },
            ]}
          />
        </div>
      </nav>

      <main style={{ padding: "20px" }}>{children}</main>

      <footer
        style={{
          backgroundColor: "#dee2e6",
          padding: "10px",
          marginTop: "30px",
        }}
      >
        푸터
      </footer>
    </div>
  );
};

export default Layout;
