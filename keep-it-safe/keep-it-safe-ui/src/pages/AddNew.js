import React, {useState} from 'react';
import Navigation from '../components/Navigation';
import ToggleSwitch from '../components/ToggleSwitch'
import Footer from '../components/Footer';
import axios from 'axios';


function AddNew(){
  
  const [viewSettings, setViewSettings] = useState(false);
  const [useLower, setUseLower] = useState(true);
  const [useUpper, setUseUpper] = useState(true);
  const [useNum, setUseNum] = useState(true);
  const [useSym, setUseSym] = useState(true);
  
  const [website, setWebsite] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  async function generatePassword(e) {
    e.preventDefault();
    const baseUrl='http://127.0.0.1:5000/'
    const lowParam="lower=" + String(useLower)
    const upParam="upper=" + String(useUpper)
    const numParam="nums=" + String(useNum)
    const symParam="sym=" + String(useSym)
    const lenParam="length=" + String(12)
    const completeUrl = baseUrl + "?"+ lowParam + "&" + upParam + "&" + numParam + "&" + symParam + "&" + lenParam
    const { meta, data } = await axios.get(completeUrl)
    setPassword(data.password)
    return (console.log(data.password))
  }

  return (
    <div>
      <Navigation />
      <body className="main-content">
        <form className="add-new-form">
          <div className="password-gen">
            <input
              className='password-input'
              type="text"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
            <button onClick={generatePassword}> Generate Password </button>
          </div>

        <label>Website: </label>
          <input
            type="text"
            required
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            />
          <label>Username: </label>
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
        </form>
        <div className="toggle-container">
          <ToggleSwitch
            isOn={viewSettings}
            handleToggle = {() => setViewSettings(!viewSettings)}/>
          <div className='toggle-label'>View Settings</div>
        </div>         
          <div style={{display:viewSettings ? 'block': 'none'}} className="more-settings">
            <p>Select the characters you would like to include:</p>
            <div className="toggle-container">
              <ToggleSwitch
                isOn={useLower}
                handleToggle = {() => setUseLower(!useLower)}/>
              <div className='toggle-label'>Lowercase letters</div>
            </div> 
            <div className="toggle-container">
              <ToggleSwitch
                isOn={useUpper}
                handleToggle = {() => setUseUpper(!useUpper)}/>
              <div className='toggle-label'>Uppercase letters</div>
            </div> 
            <div className="toggle-container">
              <ToggleSwitch
                isOn={useNum}
                handleToggle = {() => setUseNum(!useNum)}/>
              <div className='toggle-label'>Numbers</div>
            </div> 
            <div className="toggle-container">
              <ToggleSwitch
                isOn={useSym}
                handleToggle = {() => setUseSym(!useSym)}/>
              <div className='toggle-label'>Special Characters &#40; @ $ ! & % &#41;</div>
            </div> 
          </div>
      </body>
      <Footer />  
    </div>
  );
};

export default AddNew
