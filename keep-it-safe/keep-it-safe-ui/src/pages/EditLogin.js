import React, {useEffect, useState} from 'react';
import LoginDataService from '../services/login'
import Navigation from '../components/Navigation';
import ToggleSwitch from '../components/ToggleSwitch';
import ToggleView from '../components/ToggleView';
import Footer from '../components/Footer';
import Axios from 'axios';
import add from '../images/plus.png'

function EditLogin() {

    const [viewSettings, setViewSettings] = useState(false);
    const [viewPassword, setViewPassword] = useState(false);
    const [useLower, setUseLower] = useState(true);
    const [useUpper, setUseUpper] = useState(true);
    const [useNum, setUseNum] = useState(true);
    const [useSym, setUseSym] = useState(true);
    const [numChar, setNumChar] = useState(12);
    

    const queryParams = new URLSearchParams(window.location.search);
    const [loginId, setLoginId] = useState(queryParams.get('id'));
    const [websiteName, setWebsiteName] = useState(queryParams.get('websiteName'));
    const [username, setUsername] = useState(queryParams.get('username'));
    const [password, setPassword] = useState(queryParams.get('password'));

    const updateLogin = () => {
      var data = {
        _id: loginId,
        websiteName: websiteName,
        username: username,
        password: password,
      }
      LoginDataService.updateLogin(data)
      alert(`Your login for ${websiteName} has been updated`)
      window.open("/view-all", "_parent")
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
        <form action="/view-all" onSubmit={updateLogin}className="block-container">
          <div className='block-container-inner'>
          <h3>Edit Login Information</h3>
          <p></p>
          <div className="form-field--container">
            <div className="form-field-float">
              <div className = "enable-save">
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
                      <span onClick={generatePassword}>
                      <img 
                      className="navbar-logo" 
                      src={add} alt="view"/>
                      </span>
                    <ToggleView
                      toggleState={viewPassword}
                      toggleFunction ={passwordVisibility}/>
              </div>
                  <div className="form-field--entry">
                    <button type="submit ">Update</button>
                  </div>
              <div className = "form-field--entry" id = "toggles">
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
  )
}

export default EditLogin
