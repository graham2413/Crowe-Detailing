import React, {useCallback} from "react";
import { withRouter } from "react-router";
import firebase from "../config";
import { Link } from "react-router-dom";
import "../CSS/login.css"

const Login = ({ history }) => {

  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
   
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
          history.push("/");
        
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

// reset password
function resetPassword() { 
  const email = document.getElementById('email').value

  if(email !== ""){
  firebase.auth().sendPasswordResetEmail(email)
  .then(() => {
alert("Password reset email sent!")
  })
  .catch((error) => {
  alert(error);
  console.log("here");
  })
}
else{
  alert("Please enter your email first, then select \"Reset password\".")
}
}


  return (
    <body className="loginbody">
    <div className="central-box">
      <h1>Welcome to Crowe Detailing</h1>
      <h2 className="signintext">Log in below</h2>
      <form onSubmit={handleLogin}>
        <label> 
          <input className="loginp" name="email" id="email" type="email" placeholder="email@email.com" />
        </label>
        <br></br>    <br></br>
        <label>
          <input className="loginp" name="password" type="password" placeholder="password123" />
        </label> 
        <br></br>
        <button className="signintopage-registerintopage-buttons" type="submit">Log in</button>
      </form>
      <button onClick={resetPassword}>Reset Password</button>
      <div>
       <Link to="/Register" className="register-signin-links">
          I don't have an account. Sign me up!
        </Link>
      </div>
    </div>
    </body>
  );
};

export default withRouter(Login);