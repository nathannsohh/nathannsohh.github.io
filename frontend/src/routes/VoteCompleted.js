import react from 'react';
import Card from '../components/Card';
import OvsLogo from '../images/ovs-logo.png';

import styles from './VoteCompleted.module.css';
import { Link } from 'react-router-dom';

const VoteCompleted = () => {
    return (
        <>
            <img src={OvsLogo} width="15%" alt="OVS Logo"/>
            <Card page="voteCompleted">
                <span className={styles.text}>Thank you for casting your vote!</span>
                <Link to="/">
                    <button className={styles["log-out"]}>Log Out</button>
                </Link>
            </Card>
        </>
    )
}

export default VoteCompleted;