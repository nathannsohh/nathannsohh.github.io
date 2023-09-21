import react from 'react';
import Card from './Card';

const Error = (props) => {
    return (
        <Card page="voteCompleted">
            <span>We have encountered an error. Please reload or try again later.</span>
        </Card>
    )
}

export default Error;