import react from 'react';
import styles from './LogoutButton.module.scss';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = (props) => {
    const { logout } = useAuth0();
    const logoutHandler = () => {
        logout({
            logoutParams: {
                returnTo: window.location.origin 
            }
        })
    }

    return (
        <>
            <button 
                className={`${styles["log-out"]} ${props.page === "voting" ? styles.voting : ""}`}
                onClick={logoutHandler}
                >Log Out</button>
        </>
    )
}

export default LogoutButton;