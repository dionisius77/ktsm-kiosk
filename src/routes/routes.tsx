import { Navigate, RouteObject } from 'react-router-dom';
import DashboardLayout from 'layout/dashboard';
import Messages from 'pages/dashboard/messages';
import Login from 'pages/login';

const protectedRoutes: RouteObject[] = [
  { path: '', element: <Navigate to='/messages' /> },
  {
    path: '',
    element: <DashboardLayout />,
    children: [
      {
        path: 'messages',
        element: <Messages />,
      },
    ],
  },
  { path: '*', element: <Navigate to='/messages' /> },
];

const publicRoutes: RouteObject[] = [
  { path: '', element: <Login /> },
  { path: '404', element: <div>Not Found</div> },
  { path: '*', element: <Navigate to='/' /> },
];

export { publicRoutes, protectedRoutes };
