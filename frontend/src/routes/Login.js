import react from 'react';
import Card from '../components/Card';
import OvsLogo from '../images/ovs-logo.png';
import LoginButton from '../components/LoginButton';

import styles from './Login.module.scss';

const Login = (props) => {
    
    return (
        <>
            <img className={styles.logo} src={OvsLogo} alt="OVS Logo"/>
            <Card page="login">
                <h1 className={styles.title}>Login</h1>
                <LoginButton />
            </Card>
        </>
    )
}

export default Login;
