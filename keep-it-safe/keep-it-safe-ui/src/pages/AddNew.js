import React, {useState} from 'react';
import Navigation from '../components/Navigation';
import ToggleSwitch from '../components/ToggleSwitch'
import Footer from '../components/Footer';
import Axios from 'axios';

function AddNew(){
  
  const [viewSettings, setViewSettings] = useState(false);
  const [useLower, setUseLower] = useState(true);
  const [useUpper, setUseUpper] = useState(true);
  const [useNum, setUseNum] = useState(true);
  const [useSym, setUseSym] = useState(true);
  const [numChar, setNumChar] = useState(12);
  
  const [website, setWebsite] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loginList, setLoginList] = useState([]);

  const addLogin = () => {
    Axios.post("http://localhost:4500/addnew", {
      website: website,
      username: username,
      password: password,
    }).then(() => {
      setLoginList([
        ...loginList,
        {
          website: website,
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

  return (
    <div>
      <Navigation />
      <div className='main-content'>
        <form className='block-container'>
          <div className='block-container-inner'>
              <input
                type='text'
                required
                placeholder='click to generate password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
              <button onClick={generatePassword}> Generate Password </button>
          <label>Website: </label>
            <input
              type='text'
              required
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              />
            <label>Username: </label>
            <input
              type='text'
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              />
            <button onClick={addLogin}>Save</button>
          </div>
        </form>
        <div className='block-container'>
          <div className='block-container-inner'>
            <div className='toggle-block-container'>
              <ToggleSwitch
                isOn={viewSettings}
                handleToggle = {() => setViewSettings(!viewSettings)}/>
              <div className='toggle-label'>View Settings</div>
            </div>         
              <div style={{display:viewSettings ? 'block': 'none'}} className='more-settings'>
                <p>Select the characters you would like to include:</p>
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
                  <div className='toggle-label'>Special Characters &#40; @ $ ! & % &#41;</div>
                </div>
                <div>
                Number of Characters: 
                <input className='numChar' type='number' step='4' onChange={(e) => setNumChar(e.target.value)}/>              
                </div>
              </div>
            </div>
          </div>
      </div>
      <Footer />  
    </div>
  );
};

export default AddNew
