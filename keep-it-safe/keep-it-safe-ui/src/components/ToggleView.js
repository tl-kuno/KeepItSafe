import React from "react";
import eye_open from '../images/toggle-view.png'
import eye_shut from '../images/toggle-hide.png'


const ToggleView = ({toggleState, toggleFunction}) => {
    if (toggleState === false) {
        return(
            <span  onClick={toggleFunction}><img className="navbar-logo" alt="view" src={eye_shut} /></span>
        )
    }
    else {
    return (
        <span  onClick={toggleFunction}><img className="navbar-logo" alt="hide" src={eye_open} /></span>
    );
}
};

export default ToggleView