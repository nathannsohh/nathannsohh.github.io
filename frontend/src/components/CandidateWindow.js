import { react, useState } from 'react';
import Card from './Card';
import CandidateCard from './CandidateCard';
import styles from './CandidateWindow.module.css'

const CandidateWindow = (props) => {

    const createSelectionState = (index = null) => {
        let state = []
        for (let i = 0; i < props.candidates.length; i++) {
            if (index === i) {
                state.push(true)
            } else {
                state.push(false);
            }
        }
        return state;
    }

    const [selectonState, setSelectionState] = useState(createSelectionState());
    const [selectedIndex, setSelectedIndex] = useState(null);


    const updateSelectionState = (index) => {
        setSelectionState(createSelectionState(index));
        setSelectedIndex(index);
        props.candidateSelectionHandler(index)
    }

    const removeVoteHandler = () => {
        setSelectionState(createSelectionState());
        setSelectedIndex(null);
        props.candidateSelectionHandler(null)
    }

    return (
        <Card page="main">
                {selectedIndex != null && <button className={styles["remove-button"]} onClick={removeVoteHandler}>Cancel</button>}
                <h1 className={styles["vote-title"]}>Cast Your Vote!</h1>
                <span className={styles.helptext}>Click on the white box under the candidate's name to select the candidate and click on Submit Vote to submit the vote!</span>
                {props.candidates.map((candidate, index) => {
                    return <CandidateCard imageURL={candidate.imageURL} name={candidate.name} selected = {selectonState[index]} key={index} index={index} updateSelection={updateSelectionState}/>
                })}
        </Card>
    )
}

export default CandidateWindow;