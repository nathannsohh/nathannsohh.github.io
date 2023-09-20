import { react, useState } from 'react';
import OvsLogo from '../images/ovs-logo.png';
import Card from '../components/Card';
import CandidateCard from '../components/CandidateCard';
import ConfirmModal from '../components/ConfirmModal';
import LogoutButton from '../components/LogoutButton'
import styles from './Voting.module.css';
import { Link } from 'react-router-dom';

const candidates = [
    {
        imageURL: "https://milkeninstitute.org/sites/default/files/grid/speakers/0031U000026RrXCQA0-bc83e1d0c023510bb1726aafa0800863.png",
        name: "Tharman Shanmugaratnam"
    },
    {
        imageURL: "https://asb.edu.my/wp-content/uploads/2023/03/BoG-photo-NKS.jpg",
        name: "Ng Kok Song"
    },
    {
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Tan_Kin_Lian_in_a_suit_and_tie.jpg/220px-Tan_Kin_Lian_in_a_suit_and_tie.jpg",
        name: "Tan Kin Lian"
    }
]

const Voting = () => {

    const createSelectionState = (index = null) => {
        let state = []
        for (let i = 0; i < candidates.length; i++) {
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
    const [showModal, setShowModal] = useState(false);

    const submitVoteHandler = () => {
        setShowModal(true);
    }

    const closeModalHandler = () => {
        setShowModal(false);
    }

    const updateSelectionState = (index) => {
        setSelectionState(createSelectionState(index));
        setSelectedIndex(index);
    }

    const removeVoteHandler = () => {
        setSelectionState(createSelectionState());
        setSelectedIndex(null);
    }

    return (
        <>
            <img src={OvsLogo} width="15%" alt="OVS Logo"/>
            <LogoutButton page="voting"/>
            <Card page="main">
                {selectedIndex != null && <button className={styles["remove-button"]} onClick={removeVoteHandler}>Remove Vote</button>}
                <h1 className={styles["vote-title"]}>Cast Your Vote!</h1>
                <span className={styles.helptext}>Click on the white box under the candidate's name to select the candidate and click on Submit Vote to submit the vote!</span>
                {candidates.map((candidate, index) => {
                    return <CandidateCard imageURL={candidate.imageURL} name={candidate.name} selected = {selectonState[index]} key={index} index={index} updateSelection={updateSelectionState}/>
                })}
            </Card>
            <button className={styles["submit-button"]} onClick={submitVoteHandler}>Submit Vote</button>
            {showModal && <ConfirmModal closeModal={closeModalHandler} selectedName={selectedIndex != null ? candidates[selectedIndex].name : null}/>}
        </>
    )
}

export default Voting;