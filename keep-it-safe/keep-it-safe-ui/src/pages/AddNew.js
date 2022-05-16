import React, {useState} from 'react';
import Navigation from '../components/Navigation';
import ToggleSwitch from '../components/ToggleSwitch'
import Footer from '../components/Footer';


function AddNew(){
  
  const [viewSettings, setViewSettings] = useState(false);
  const [savePassword, setSavePassword] = useState(false);

  return (
    <div>
      <Navigation />
      <body className="main-content">
        <h2>Generate New Passwword</h2>
        <form className="add-new-form">
        <div className="toggle-container">
          <ToggleSwitch
            isOn={viewSettings}
            handleToggle = {() => setViewSettings(!viewSettings)}/>
          <div className='toggle-label'>
            <p>View Settings</p>   
          </div>
          </div>         
          <div className="toggle-container">
          <ToggleSwitch
            isOn={savePassword}
            handleToggle = {() => setSavePassword(!savePassword)}/>
            <p className="toggle-label">Allow Saving</p>   
          </div>
        </form>
      </body>
      <Footer />  
    </div>
  );
};

export default AddNew
