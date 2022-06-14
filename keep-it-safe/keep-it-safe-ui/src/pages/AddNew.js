import React, {useState} from 'react';
import LoginDataService from '../services/login'
import Navigation from '../components/Navigation';
import ToggleSwitch from '../components/ToggleSwitch';
import ToggleView from '../components/ToggleView';
import Footer from '../components/Footer';
import Axios from 'axios';

const AddNew = props => {
  
  const [viewSettings, setViewSettings] = useState(false);
  const [viewPassword, setViewPassword] = useState(false);
  const [enableSave, setEnableSave] = useState(false);
  const [useLower, setUseLower] = useState(true);
  const [useUpper, setUseUpper] = useState(true);
  const [useNum, setUseNum] = useState(true);
  const [useSym, setUseSym] = useState(true);
  const [numChar, setNumChar] = useState(12);
  
  const [websiteName, setWebsiteName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const addLogin = () => {
    var data = {
      websiteName: websiteName,
      username: username,
      password: password,
    }
    LoginDataService.createLogin(data)
    alert(`Your login for ${websiteName} has been saved`)
  };

  async function generatePassword(e) {
    e.preventDefault();
    const baseUrl='http://127.0.0.1:5000/'
    const lowParam='lower=' + String(useLower)
    const upParam='upper=' + String(useUpper)
    const numParam='nums=' + String(useNum)
    const symParam='sym=' + String(useSym)
    const lenParam='length=' + String(numChar)
    const completeUrl = baseUrl + '?'+ lowParam + '&' + upParam + '&' + numParam + '&' + symParam + '&' + lenParam
    const { data } = await Axios.get(completeUrl)
    setPassword(data.password)
  }

  function passwordVisibility(e) {
    e.preventDefault()
    setViewPassword(!viewPassword)
    if ((document.getElementById("passwordField").type === "password")) {
      document.getElementById("passwordField").type = "text"
    } else {
      (document.getElementById("passwordField")).type = "password"      
    } 
  }

  
  function copyPassword() {
    navigator.clipboard.writeText(password)
    alert(`Password copied`)
  }

  return (
    <div>
      <Navigation />
      <div className ="main-content">
        <form className="block-container">
          <div className='block-container-inner'>
          <h3>Password Generator</h3>
          <p className="describe-gen">Enter your own password to save or generate a random, highly secure password.</p>
          <div className="form-field--container">
            <div className="form-field-float">
              <div className = "enable-save" style={{display:enableSave ? 'block': 'none'}}>
                  <div className="form-field--entry">
                    <label>Website Name: </label><br/>
                    <input
                      type='text'
                      required
                      value={websiteName}
                      onChange={(e) => setWebsiteName(e.target.value)}
                      />
                  </div>
                  <div className="form-field--entry">
                    <label>Username: </label><br/>
                    <input
                      type='text'
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      />
                  </div>
              </div>
              <div className="form-field--entry" id="password-generator">
              <label>Password: </label><br/> 
                <input
                      id="passwordField"
                      type="password"
                      required
                      placeholder='click + to generate'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      />
                      <span className="span-button" onClick={generatePassword}><i class="bi bi-plus-square"/></span>
                    <ToggleView
                      toggleState={viewPassword}
                      toggleFunction ={passwordVisibility}/>
                      <span className="span-button" onClick={() => {copyPassword()}}><i className="bi bi-clipboard"/></span>
              </div>
              <div className='table-key'>
                  <span className='key-item'><i className="bi bi-plus-square"/>    Generate Password</span>
                  <span className='key-item'><i className="bi bi-eye"/>    View/Hide Password</span>
                  <span className='key-item'><i className="bi bi-clipboard"/>    Copy Password</span>
                </div>
                <br></br>
                  <div className="form-field--entry">
                    <button onClick={addLogin} style={{display:enableSave ? 'block': 'none'}} >Save</button>
                  </div>
              <div className = "form-field--entry" id = "toggles">
                <ToggleSwitch
                    isOn={enableSave}
                    handleToggle = {() => setEnableSave(!enableSave)}/>
                <div className='toggle-label'>Enable Saving</div><br/>
                <ToggleSwitch
                    isOn={viewSettings}
                    handleToggle = {() => setViewSettings(!viewSettings)}/>
                <div className='toggle-label'>View Settings</div>
              </div>

              </div>
          </div>
          <div className="form-field--container">
            <div className="form-field-float">
              <div className = "form-field--entry" id="viewSettings" style={{display:viewSettings ? 'block': 'none'}}>
              <hr></hr>
              <p className="describe-gen">Set password length and allowed characters</p>
                <div className='toggle-block-container'>
                  <ToggleSwitch
                    isOn={useLower}
                    handleToggle = {() => setUseLower(!useLower)}/>
                  <div className='toggle-label'>Lowercase letters</div>
                </div> 
                <div className='toggle-block-container'>
                  <ToggleSwitch
                    isOn={useUpper}
                    handleToggle = {() => setUseUpper(!useUpper)}/>
                  <div className='toggle-label'>Uppercase letters</div>
                </div> 
                <div className='toggle-block-container'>
                  <ToggleSwitch
                    isOn={useNum}
                    handleToggle = {() => setUseNum(!useNum)}/>
                  <div className='toggle-label'>Numbers</div>
                </div> 
                <div className='toggle-block-container'>
                  <ToggleSwitch
                    isOn={useSym}
                    handleToggle = {() => setUseSym(!useSym)}/>
                  <div className='toggle-label'>Characters &#40; @ $ ! & % &#41;</div>
                </div>
                <div>
                Number of Characters: 
                <input placeholder="default is 16" className='numChar' type='number' step='4' onChange={(e) => setNumChar(e.target.value)}/>              
                </div>
              </div>
            </div>
          </div>
        </div>
        </form>
      </div>
      <Footer />  
    </div>
  );
};

export default AddNew;
