import { react, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

import OvsLogo from '../images/ovs-logo.png';
import CandidateWindow from '../components/CandidateWindow';
import ConfirmModal from '../components/ConfirmModal';
import LogoutButton from '../components/LogoutButton'
import VoteCompletedCard from '../components/VoteCompletedCard';
import Error from '../components/Error';
import styles from './Voting.module.css';

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

const URL = "http://localhost:8000/user";

const Voting = () => {

    const { user, isAuthenticated } = useAuth0();
    
    
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [voteCompleted, setVoteCompleted] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const searchResult = await axios.get(URL, { params: { id: user.sub }});
                if (searchResult.data.user) {
                    setVoteCompleted(searchResult.data.user.voted);
                } else {
                    const createResult = await axios.post(URL, {
                        name: user.name,
                        auth0_id: user.sub,
                    })
                    setVoteCompleted(false);
                }
                setLoading(false);
            } catch (e) {
                setError(true)
                setLoading(false);
            }
        }

        if (!isAuthenticated) {
            setLoading(false);
            return;
        }
        fetchData();
        setLoading(false);
        
    }, [])

    const submitVoteHandler = () => {
        setShowModal(true);
    }

    const closeModalHandler = () => {
        setShowModal(false);
    }

    const candidateSelectionHandler = (index) => {
        setSelectedIndex(index);
    }

    const voteHandler = async () => {
        try {
            const response = await axios.put(URL, {
                auth0_id: user.sub,
                name: user.name,
                voted: true,
                selection: selectedIndex
            })
    
            if (response.data.success) {
                setVoteCompleted(true);
            }
    
            setShowModal(false);
        } catch (e) {
            setError(true)
        }
    }

    return (
        <>
            <img src={OvsLogo} width="15%" alt="OVS Logo"/>
            {
                loading ? (<div style={{color:'black'}}>loading...</div> 
                ): ( error ? <Error /> :
                (voteCompleted ? 
                <VoteCompletedCard /> : (
                <div>
                    <CandidateWindow candidates={candidates} candidateSelectionHandler={candidateSelectionHandler}/>
                    <button className={styles["submit-button"]} onClick={submitVoteHandler}>Submit Vote</button>
                </div>)
           ))
           }
            {(voteCompleted) ? null : <LogoutButton page="voting"/>}
            {showModal && <ConfirmModal submit={voteHandler} closeModal={closeModalHandler} selectedName={selectedIndex != null ? candidates[selectedIndex].name : null}/>}
        </>
    )
}

export default Voting;