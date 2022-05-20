import React, {useState} from 'react';
import Navigation from '../components/Navigation';
import ToggleSwitch from '../components/ToggleSwitch';
import ToggleView from '../components/ToggleView';
import Footer from '../components/Footer';
import Axios from 'axios';
import add from '../images/plus.png'

function AddNew(){
  
  const [viewSettings, setViewSettings] = useState(false);
  const [viewPassword, setViewPassword] = useState(false);
  const [enableSave, setEnableSave] = useState(false);
  const [useLower, setUseLower] = useState(true);
  const [useUpper, setUseUpper] = useState(true);
  const [useNum, setUseNum] = useState(true);
  const [useSym, setUseSym] = useState(true);
  const [numChar, setNumChar] = useState(12);
  
  const [websiteName, setWebsiteName] = useState('');
  const [websiteDomain, setWebsiteDomain] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loginList, setLoginList] = useState([]);

  const addLogin = () => {
    Axios.post("http://localhost:4500/addnew", {
      websiteName: websiteName,
      websiteDomain: websiteDomain,
      username: username,
      password: password,
    }).then(() => {
      setLoginList([
        ...loginList,
        {
          websiteName: websiteName,
          websiteDomain: websiteDomain,
          username: username,
          password: password,
        },
      ]);
    });
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


  return (
    <div>
      <Navigation />
      <div className ="main-content">
        <form className="block-container" action="/events" method="POST">
          <div className='block-container-inner'>
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
                    <label>Website Domain: </label><br/>
                    <input
                      type='text'
                      required
                      value={websiteDomain}
                      onChange={(e) => setWebsiteDomain(e.target.value)}
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
                      placeholder='click to generate'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      />
                      <span onClick={generatePassword}>
                      <img 
                      className="navbar-logo" 
                      src={add} alt="view"/>
                      </span>
                    <ToggleView
                      toggleState={viewPassword}
                      toggleFunction = {passwordVisibility}/>
              </div>
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
                <input className='numChar' type='number' step='4' onChange={(e) => setNumChar(e.target.value)}/>              
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
