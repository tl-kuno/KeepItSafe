import React from 'react';
import {useState, useEffect} from 'react';
import LoginDataService from '../services/login'
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';


export default function ViewAll() {

  const [loginList, setLoginList] = useState([])
  const [nameList, setNameList] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [suggestion, setSuggestion] = useState("")
  const [suggested, setSuggested] = useState(false)
  const [viewPassword, setViewPassword] = useState(false);

  useEffect(() => {getLogins(); getSiteNames()},[]);
  useEffect(() => {updateFilter()},[searchTerm] )

  function getLogins() {
    LoginDataService.getAll()
    .then((response) => {
      setLoginList(response.data.logins)
      setFilteredData(response.data.logins)
    }
  )};

  function getSiteNames() {
    LoginDataService.getNames()
    .then((response) => {
      const websiteNames = []
      response.data.map(wName => {
          var websiteName = wName.toLowerCase()
          return websiteNames.push(websiteName)
      })
      setNameList(websiteNames)
    })
  };
  
  function updateFilter() {
      const newFilter = loginList.filter((value) => {
        return (value.websiteName.toLowerCase()).includes(searchTerm.toLowerCase())
      })
        setFilteredData(newFilter)
  }
  
  const suggestionSearch = () => {
    setSuggested(!suggested)
    console.log(nameList)
    LoginDataService.suggestTerm(searchTerm, nameList)
    .then((response) => {
        var suggestedTerm = String(response.data.data[0])
        setSuggestion(suggestedTerm)
        if (suggestedTerm === "") {
          var new_string = "No suggestions available."
        } else {
          new_string = `Did you mean <b>${suggestedTerm}</b> ?`      
        }
        document.getElementById("suggestion-result").innerHTML = new_string
    
    })}

  const changeSearchTerm = () =>{
    setSearchTerm(suggestion)
    document.getElementById("search-box").value = suggestion
    setSuggestion("")
    setSuggested(false)
  }

  function editLogin(loginId, websiteName, username, password ) {
    const url = `/edit-login?id=${loginId}&websiteName=${websiteName}&username=${username}&password=${password}`
    window.open(url, "_parent")
  }


  function deleteLogin(loginId, websiteName){
    if (window.confirm(`Are you sure you want to delete login information for ${websiteName}?\nThis information will be deleted forever.`)) {
      LoginDataService.deleteLogin(loginId)
      window.location.reload()
    }
  }

  function copyPassword(password, websiteName) {
    navigator.clipboard.writeText(password)
    alert(`Password for ${websiteName} copied`)
  }

  function toggglePasswordView(id) {
    setViewPassword(!viewPassword)
    if ((document.getElementById(id).className === "hidetext")) {
      document.getElementById(id).className = "website-data-password"
    } else {
      (document.getElementById(id)).className = "hidetext"      
    } 
  }

  return (
    <div>
      <Navigation />
      <div className ="main-content">
        <div className="block-container">
          <div className="block-container-inner">
            <div className="form-field-container">
              <h3>View All</h3>
              <div className='search'>
                <div className='search-input'>
                    <input id="search-box" type="text" placeholder="Search logins.. " onChange={(e) => setSearchTerm(e.target.value)}></input>
                    <div className='search-icon'></div>
                </div>
                <div className='search-suggestion'>
                <table id="login-table" className="table table-striped table-hover table data-sticky-header">
                    <tbody>
                      <tr>
                      <th>Website</th>
                      <th>Username</th>
                      <th>Password</th>
                      <th></th>
                      </tr>
                        {filteredData.map((login, i) => 
                        <tr key={login.id} className="data-row">
                          <td className="website-name-data">{login.websiteName}</td>
                          <td className="website-username-data">{login.username}</td>
                          <td className= "hidetext" type="password" id={login.password}>{login.password}</td>
                          <td className='text-end'>
                          <span className="span-button" onClick={() => {toggglePasswordView(login.password)}}><i className="bi bi-eye"/></span>
                          <span className="span-button" onClick={() => {copyPassword(login.password, login.websiteName)}}><i className="bi bi-clipboard"/></span>
                          <span className="span-button" onClick={() => {editLogin(login._id, login.websiteName, login.username, login.password)}}><i className="bi bi-pencil-square"/></span>
                          <span className="span-button" onClick={() => {deleteLogin(login._id, login.websiteName)}}><i className="bi bi-x-square"/></span>                           
                          </td>
                        </tr>)}
                    </tbody>
                </table>
                </div>
                {filteredData.length === 0 && (
                  <div id="search-error">
                    <p id= "suggestion-result">No results found. Click the button for a suggested search based on your saved information.</p>
                    {suggested=== false &&(
                      <button onClick={suggestionSearch}>Get Suggestion</button>
                    )}
                    {suggested===true && ( 
                      <button onClick={changeSearchTerm}>Accept Suggestion</button>
                    )}
                  </div>
                )}
            </div>
                <div className='table-key'>
                  <span className='key-item'><i className="bi bi-eye"/> View Password</span>
                  <span className='key-item'><i className="bi bi-clipboard"/> Copy Password</span>
                  <span className='key-item'><i className="bi bi-pencil-square"/> Edit Password</span>
                  <span className='key-item'><i className="bi bi-x-square"/> Delete Password</span>
                </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};