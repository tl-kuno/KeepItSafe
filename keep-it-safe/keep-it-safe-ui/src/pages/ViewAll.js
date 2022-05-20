import React from 'react';
import {useState, useEffect} from 'react';
import Axios from 'axios';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import LoginDataTable from '../components/LoginDataTable';


function ViewAll() {

  const [logins, setLogins] = useState([]);

  const loadLogins = async () => {
    const response = await Axios.get("http://localhost:4500/view-all");
    const data = await response.data;
    console.log(data)
    setLogins(data);
}

useEffect(() => {
    loadLogins(setLogins);
}, []);


  return (
    <div>
        <Navigation />
        <div className="main-content">
          <div className="display-block">
            <div className="display-block-inner">
              <h1>View All</h1>
              <LoginDataTable logins= {logins}></LoginDataTable>
              </div>
          </div>
        </div>
        <Footer />
    </div>
  )
}

export default ViewAll
