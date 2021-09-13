import React, {useState} from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as yup from 'yup';
import { useHistory } from "react-router";

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState("")
  const {push} = useHistory();


  const handleChange = e => {
      const {name, value} = e.target
      setFormData({...formData, [name]: value})
  }

  const handleSubmit = e => {
      e.preventDefault()
      if(formData.username === "" || formData.password === "") {
        setError("Username or Password not valid.")
      } else {
        login()
      }
  }

  const login = () => {
    setError("")
    axios.post('http://localhost:5000/api/login', formData)
      .then(res => {
        localStorage.setItem('token', res.data.payload);
        
        push('/bubbles');
        
      })
      .catch(e => {             
          setError(e.response.data.error)
      })
  }

  return (
    <div>
        <h1>Welcome to the Bubbles App</h1>
        <div data-testid="loginForm" className="login-form">
          <form onSubmit={handleSubmit}>
              <div className="input-container">
                <label htmlFor="username">
                  Username:
                  <input type="text" name="username" id="username" placeholder="Username" value={formData.username} onChange={handleChange}/>
                </label>
                <label htmlFor="password">
                  Password:
                  <input type="password" name="password" id="password" placeholder="Password" value={formData.password} onChange={handleChange}/>
                </label>
              </div>
              <button type="submit" id="submit">Login</button>
              <p id="error" className="error">{error}</p>
          </form>
        </div>
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state necessary for form functioning.
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to "Lambda" / "School", save that token to localStorage and redirect to a BubblePage route.
//6. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE id="username" and id="password"
//7. MAKE SURE YOUR SUBMIT BUTTON INCLUDES id="submit"
//8. MAKE SURE YOUR ERROR p tag contains the id="error"