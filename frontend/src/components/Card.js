import react from 'react';
import styles from './Card.module.scss'

const Card = (props) => {
    return <div className={`${styles.card} ${styles[`${props.page}`]}`}>
        {props.children}
    </div>
}

export default Card;