import react from 'react';
import Card from '../components/Card';
import OvsLogo from '../images/ovs-logo.png';
import LogoutButton from '../components/LogoutButton';

import styles from './VoteCompleted.module.css';
import { Link } from 'react-router-dom';

const VoteCompleted = () => {
    return (
        <>
            <img src={OvsLogo} width="15%" alt="OVS Logo"/>
            <Card page="voteCompleted">
                <span className={styles.text}>Thank you for casting your vote!</span>
                <LogoutButton />
            </Card>
        </>
    )
}

export default VoteCompleted;