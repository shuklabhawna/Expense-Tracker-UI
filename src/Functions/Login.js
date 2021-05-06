import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from '../Utilities/Common';
import '../css/Login.css';

 
function Login(props) {
  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
 
  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    
    axios.post('/users/signin', { username: username.value, password: password.value }).then(response => {
      setLoading(false);
      setUserSession(response.data.token, response.data.user);
      props.history.push('/dashboard');
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }
 
  return (
    <div className="login-wrapper">
          <h1>Please Log In</h1>
          <form >
            <table>
            <tr>
              <td>Username</td>
              <td><input type="text" {...username} autoComplete="new-password"/> </td>
            </tr>
            <tr>
              <td>Password</td>
              <td><input type="password" {...password} autoComplete="new-password" /></td>
            </tr>
            <tr>
              <td colSpan="2">
            <div>
              {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
            </div>
            </td>
            </tr>
            </table>
          </form>
        </div>
		
  );
}
 
const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);
 
  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}
 
export default Login;