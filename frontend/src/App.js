import './App.css';

import { useNavigate, BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Auth0Provider, withAuthenticationRequired } from '@auth0/auth0-react';

import Voting from './routes/Voting';
import Login from './routes/Login';

const ProtectedRoute = ({ component, ...args }) => {
  const Component = withAuthenticationRequired(component, args);
  return <Component />
}

const Auth0ProviderWithRedirectCallback = ({children, ...props}) => {
  const navigate = useNavigate();
  const onRedirectCallback = (appState) => {
    navigate((appState && appState.returnTo) || window.location.pathname);
  };
  return (
    <Auth0Provider onRedirectCallback={onRedirectCallback} {...props}>
      {children}
    </Auth0Provider>
  )
}

function App() {
  return (
    <div className="App">
       <BrowserRouter>
        <Auth0ProviderWithRedirectCallback
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: window.location.origin + '/vote'
        }}
      >
        <Routes>
          <Route
            path="/vote"
            element={<ProtectedRoute component={Voting} />}
          />
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Auth0ProviderWithRedirectCallback>
    </BrowserRouter>
    </div>
  );
}

export default App;
