/* Login Page */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import alertify from 'alertifyjs';

const Login = () => {
  const navigate = useNavigate();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:5000/api/userLogin', { //Javascript's standard Fetch API
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email,password})
    }).then(response => response.json())
    .then(data => {
      console.log(data);
      if(data.passesMatch === true)
      {
        alertify.success("You've successfully logged in, " + data.user[0].first_name + " " + data.user[0].last_name + "!") //makes use of AlertifyJS to enhance visuals
        navigate("/main", {state: {user: data.user[0]}}); //redirect to /main, passes the user object to the landing page for visual and demonstration purposes
      }
      else
      {
        alertify.error("Unsuccessful login attempt!") //makes use of AlertifyJS (again)
      }
    }).catch(error => {
      console.error('Error:',error);
    });
  };

  return (
    <div>
      <div className='login-div'>
          <div className='login-header text-center'>
              <h3> Sign In</h3>
              <hr/>
          </div>
          <div className='form-group'>
              <form onSubmit={onSubmitHandler}>
                  <input className='form-control' type='email' id='email' placeholder='User E-Mail' required/>
                  <input className='form-control' type='password' placeholder='Password' id='password' required/>
                  <button className='btn' type='submit'>Login</button>
              </form>
          </div>
      </div>
    </div>
  );
};

export default Login;