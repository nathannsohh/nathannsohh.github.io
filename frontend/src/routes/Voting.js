import { react, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

import OvsLogo from '../images/ovs-logo.png';
import CandidateWindow from '../components/CandidateWindow';
import ConfirmModal from '../components/ConfirmModal';
import LogoutButton from '../components/LogoutButton'
import VoteCompletedCard from '../components/VoteCompletedCard';
import Error from '../components/Error';
import styles from './Voting.module.scss';

const URL = process.env.REACT_APP_API_URL;

const Voting = () => {

    const { user, isAuthenticated } = useAuth0();
    
    
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [candidates, setCandidates] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [voteCompleted, setVoteCompleted] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const getUserPromise = axios.get(URL + '/user', { params: { id: user.sub }});
                const getCandidatesPromise = axios.get(URL + '/candidates');
                const [userResult, candidateResult] = await Promise.all([getUserPromise, getCandidatesPromise]);
                
                if (userResult.data.user) {
                    setVoteCompleted(userResult.data.user.voted);
                } else {
                    await axios.post(URL + '/user', {
                        name: user.name,
                        auth0_id: user.sub,
                    })
                    setVoteCompleted(false);
                }

                if (candidateResult.data.success && candidateResult.data.candidates.length) {
                    setCandidates(candidateResult.data.candidates);
                }
            } catch (e) {
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        if (!isAuthenticated) {
            setLoading(false);
            return;
        }
        fetchData();
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
            const response = await axios.put(URL + '/user', {
                auth0_id: user.sub,
                name: user.name,
                voted: true,
                selection: selectedIndex
            })
    
            if (response.data.success) {
                setVoteCompleted(true);
            }
        } catch (e) {
            setError(true)
        } finally {
            setShowModal(false);
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