import react from 'react';
import Card from '../components/Card';
import OvsLogo from '../images/ovs-logo.png';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import styles from './Login.module.css';

const Login = (props) => {
    const { loginWithRedirect } = useAuth0();
    
    const loginHandler = async () => {
        await loginWithRedirect();
    }
    return (
        <>
            <img className={styles.logo} src={OvsLogo} alt="OVS Logo"/>
            <Card page="login">
                <h1 className={styles.title}>Login</h1>
                <button className={styles.button} onClick={loginHandler}>Log in with Singpass</button>
            </Card>
        </>
    )
}

export default Login;
