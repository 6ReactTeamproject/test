// // src/App.jsx
// import { useEffect, useState } from "react";
// import { UserContext } from "./components/Travel/UserContext";
// import AppRouter from "./AppRouter";

// export default function App() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const saved = localStorage.getItem("user");
//     if (saved) {
//       setUser(JSON.parse(saved));
//     }
//   }, []);

//   return (
//     <UserContext.Provider value={user}>
//       <AppRouter setUser={setUser} />
//     </UserContext.Provider>
//   );
// }
