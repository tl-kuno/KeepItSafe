import React from 'react';

const ToggleSwitch = ({ label, isOn, handleToggle }) => {
  return (
    <label className="toggle">
      <input  type="checkbox"
              id={label}
              checked={isOn}
              onChange={handleToggle}/>
      <span className="toggle-slider"/>
    </label>
  );
};

export default ToggleSwitch