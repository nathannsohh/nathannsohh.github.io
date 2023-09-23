import react from 'react';
import Card from './Card';
import QrCode from '../images/qr-code.svg'
import styles from './ConfirmModal.module.scss'

const ConfirmModal = (props) => {
    return (
        <div className={styles.overlay}>
            <Card page="modal">
                <div className={styles.close}><input id="button" type="button" value="X" onClick={props.closeModal} /></div>
                <h1 className={styles["modal-title"]}>Confirm Vote Submission</h1>
                {
                    props.selectedName != null ? 
                        <span className={styles["modal-text"]}>You are casting your vote for <b>{props.selectedName}</b>. To proceed, please scan the QR code below to digitally sign your vote. <i>(Click on the QR Code to simulate the Digital Signing process)</i></span> :
                        <span className={styles["modal-text"]}>You have not selected a candidate and your vote will be voided. To proceed, please scan the QR code below to digitally sign your vote. <i>(Click on the QR Code to simulate the Digital Signing process)</i></span> 
                }
                <div onClick={props.submit}>
                    <img src={QrCode} alt="Digital Signature QR Code" width="30%"/>
                </div>
            </Card>
        </div>
    )
}

export default ConfirmModal;