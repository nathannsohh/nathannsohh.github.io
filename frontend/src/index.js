import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

import Login from './routes/Login';
import Voting from './routes/Voting';
import VoteCompleted from './routes/VoteCompleted';
import ErrorPage from './routes/ErrorPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Login />
      },
      {
        path: "/vote",
        element: <Voting />
      },
      {
        path: "/complete",
        element: <VoteCompleted />
      },
    ]
  },
  
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain="dev-a8wbfg24o6z1sg5m.us.auth0.com"
    clientId="zlEwEKRRZaP93smxm6lVH1f4dFUsWGCx"
    authorizationParams={{
      // redirect_uri: window.location.origin
      redirect_uri: "http://localhost:3001/vote"
    }}
  >
    <RouterProvider router={router} />
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
