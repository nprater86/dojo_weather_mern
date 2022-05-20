import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Main = props => {
    const { preference, position, positionLoaded } = props;
    const history = useHistory();

    useEffect(()=>{
        if(positionLoaded === true){
            history.push(`/day/${preference}/test/test`);
        }
    },[positionLoaded])

    return (
        <div>
            <h4 className="m-auto">Search for a city to get started!</h4>
        </div>
    );
}

export default Main;