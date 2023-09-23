import react from 'react';
import styles from './LoginButton.module.scss'
import SingpassLogo from '../images/singpass_logo_white.png'
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
    
    const loginHandler = async () => {
        await loginWithRedirect();
    }

    return (
        <button 
        className={styles.button} 
        onClick={loginHandler}>
            Log in with 
            <img className= {styles.logo} src={SingpassLogo} alt='Singpass Logo' />
        </button>
    )
}

export default LoginButton;