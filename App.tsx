import React, { useState, useEffect } from 'react';
import { useLoaderData, useNavigate, Outlet, useLocation } from 'react-router-dom';
import SplashScreen from "./components/SplashScreen";

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { initialRoute } = useLoaderData() as { initialRoute: string };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      if (location.pathname === '/') {
        navigate(initialRoute, { replace: true });
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [initialRoute, navigate, location.pathname]);

  useEffect(() => {
    if (!showSplash && location.state && location.state.redirect) {
      navigate(location.state.redirect, { replace: true, state: {} });
    }
  }, [showSplash, location, navigate]);

  if (showSplash) {
    return <SplashScreen />;
  }

  return <Outlet />;
};

export default App;