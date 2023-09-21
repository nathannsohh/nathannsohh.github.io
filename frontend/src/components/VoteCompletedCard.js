import Card from './Card';
import LogoutButton from './LogoutButton';

import styles from './VoteCompletedCard.module.css';

const VoteCompletedCard = () => {
    return (
        <Card page="voteCompleted">
            <span className={styles.text}>Thank you for casting your vote!</span>
            <LogoutButton />
        </Card>
    )
}

export default VoteCompletedCard;