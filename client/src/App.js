import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// import all components
import Login from './components/Login';
import Password from './components/Password';
import PageNotFound from './components/PageNotFound';
import Profile from './components/Profile';
import Register from './components/Register';
import Reset from './components/Reset';
import Recovery from './components/Recovery';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/password',
      element: <Password />,
    },
    {
      path: '/profile',
      element: <Profile />,
    },
    {
      path: '/reset',
      element: <Reset />,
    },
    {
      path: '/recovery',
      element: <Recovery />,
    },
    {
      path: '*',
      element: <PageNotFound />,
    },
  ]);

  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
