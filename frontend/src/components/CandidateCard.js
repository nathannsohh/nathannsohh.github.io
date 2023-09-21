import Card from './Card';
import styles from './CandidateCard.module.scss'

const CandidateCard = (props) => {
    const imageLink = props.imageURL;
    const candidateName = props.name;

    const selectHandler = () => {
        props.updateSelection(props.index)
    }
    
    return (
        <Card page="candidate">
            <img className={styles["candidate-picture"]} src={imageLink} alt="Candidate" />
            <span className={styles["candidate-name"]}>{candidateName}</span>
            <button className={`${styles["voting-button"]} ${props.selected ? "" : styles.white}`} onClick={selectHandler}>X</button>
        </Card>
    )
}

export default CandidateCard;