import React, { useCallback } from "react";
import { withRouter } from "react-router";
import firebase from "../config";
import { Link } from "react-router-dom";
import "../CSS/login.css"

const Register = ({ history }) => {
  const handleSignUp = useCallback(async event => {
    event.preventDefault();

    const {full_name, email, password } = event.target.elements;

    // below two added
    const database = firebase.database()
    const auth = firebase.auth()

   
    try {

   await auth
        .createUserWithEmailAndPassword(email.value, password.value)
         history.push("/")

          var user = auth.currentUser
          var database_ref = database.ref()

          var userData = {
            full_name: full_name.value,
            email: email.value,
            type: "regular"
        }         
            
          database_ref.child('Users/' + user.uid).set(userData)  

    } catch (error) {
      alert(error);
    }
  }, [history]);

  return (
    <body className="loginbody">
    <div className="central-box">
      <h1>Sign up</h1>
      {/* <h2 className="signuptext">Students signup below, Workers and TA's must email for account creation - cgnorri2@go.olemiss.edu</h2> */}
      <form onSubmit={handleSignUp}>
      <label>
          <input className="loginp" name="full_name" type="text" placeholder="Full name" />
        </label>
        <br></br>    <br></br>
        <label>
          <input className="loginp" name="email" type="email" placeholder="email@email.com" />
        </label>
        <br></br>    <br></br>
        <label>
          <input className="loginp" name="password" type="password" placeholder="password123" />
        </label>
        <br></br>
        <button className="signintopage-registerintopage-buttons" type="submit">Sign Up</button>
      </form>
      <div>
        <Link to="/Login" className="register-signin-links">
          I already have an account. Take me to login!
        </Link>
      </div>
    </div>
    </body>
  );
};

export default withRouter(Register);