import React from "react";


const ToggleView = ({toggleState, toggleFunction}) => {
    if (toggleState === false) {
        return(
            <span className="span-button" onClick={toggleFunction}><i class="bi bi-eye"/></span>
        )
    }
    else {
    return (
        <span  className="span-button" onClick={toggleFunction}><i class="bi bi-eye-slash"/></span>
    );
}
};

export default ToggleView