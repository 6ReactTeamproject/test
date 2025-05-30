import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './AppRouter'
import { UserContext } from './components/Travel/UserContext'
import './index.css'

function Root() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  return (
    <StrictMode>
      <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <AppRouter setUser={setUser} />
        </BrowserRouter>
      </UserContext.Provider>
    </StrictMode>
  );
}

createRoot(document.getElementById('root')).render(<Root />);
