import HomePage from './pages/HomePage';
import GuestbookPage from './pages/GuestbookPage';
import VisitorsPage from './pages/VisitorsPage';
import type { ReactNode } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'Home',
    path: '/',
    element: <HomePage />
  },
  {
    name: 'Guestbook',
    path: '/guestbook',
    element: <GuestbookPage />,
  },
  {
    name: 'Visitors',
    path: '/visitors',
    element: <VisitorsPage />,
  },
];

export default routes;
