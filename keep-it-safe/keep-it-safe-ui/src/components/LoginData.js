import React from 'react';

function Login({ login }) {
    let website = String(login.websiteDomain)
    let full_website = "https://" + website
    return (
        <tr className="data-row">
            <td>{login.websiteName}<br/><a href={full_website} target="_blank" rel="noreferrer" >{login.websiteDomain}</a></td>
            <td>Username: {login.username}<br/>Password: {login.password}</td>
        </tr>
    );
}

export default Login;