import react from 'react';
import Card from '../components/Card';
import OvsLogo from '../images/ovs-logo.png';
import { Link } from 'react-router-dom';

import styles from './Login.module.css';

const Login = (props) => {
    return (
        <>
            <img className={styles.logo} src={OvsLogo} alt="OVS Logo"/>
            <Card page="login">
                <h1 className={styles.title}>Login</h1>
                <Link to="/vote">
                    <button className={styles.button}>Log in with Singpass</button>
                </Link>
            </Card>
        </>
    )
}

export default Login;
