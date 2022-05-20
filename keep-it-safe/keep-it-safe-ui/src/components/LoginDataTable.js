import React from 'react';
import LoginData from './LoginData';

function LoginTable({ logins }) {
    return (
        <table id="login-table" className="view-all-container">
            <tbody>
            <tr>
              <th>Website</th>
              <th>Login</th>
            </tr>
                {logins.map((login, i) => <LoginData login={login} key={i} />)}
            </tbody>
        </table>
    );
}

export default LoginTable;
