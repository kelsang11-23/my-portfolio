import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import React from 'react';
import { recordVisit } from '@/db/api';

import routes from './routes';

// import Header from '@/components/common/Header';
// import { AuthProvider } from '@/contexts/AuthContext';
// import { RouteGuard } from '@/components/common/RouteGuard';
import { Toaster } from '@/components/ui/toaster';
// 访客追踪组件
function VisitorTracker() {
  const location = useLocation();

  useEffect(() => {
    // 记录访问
    const trackVisit = async () => {
      try {
        const pageUrl = window.location.href;
        const userAgent = navigator.userAgent;
        const referrer = document.referrer;
        
        await recordVisit(pageUrl, userAgent, referrer);
      } catch (error) {
        console.error('记录访问失败:', error);
      }
    };
    trackVisit();
  }, [location.pathname]); // 路由变化时触发

  return null;
}

const App: React.FC = () => {
  return (
    <Router>
      {/*<AuthProvider>*/}
      {/*<RouteGuard>*/}
       <VisitorTracker />
      <div className="flex flex-col min-h-screen">
        {/*<Header />*/}
        <main className="flex-grow">
          <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={route.element}
            />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
      <Toaster />
      {/*</RouteGuard>*/}
      {/*</AuthProvider>*/}
    </Router>
  );
};

export default App;
