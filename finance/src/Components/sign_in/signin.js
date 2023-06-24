import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from '../../Images/logo.png';
import { UserAuth } from "../Usecontext/UseContext";
import facebook from "../../Images/facebook.png";
import apple from "../../Images/apple.png";
import google from "../../Images/google.png";
import "./signin.css";
import { useNavigate } from "react-router-dom";
const Signin = () => {
  const {user,logOut} = UserAuth();

  const { googleSignIn } = UserAuth();
  const navigate=useNavigate();
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    if(user!=null){
      navigate('/homepage')

    }
  
  },[user])

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isMatchEmail, setIsMatchEmail] = useState(false);
  const [isMatchPass, setIsMatchPass] = useState(false);
  const [index, setIndex] = useState();

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    setIsMatchEmail(false);

    const storedEmails = JSON.parse(localStorage.getItem("gmail"));
    if (storedEmails.includes(e.target.value)) {
      setIndex(storedEmails.indexOf(e.target.value));
      setIsMatchEmail(true);
    }
  };

  const onChangePass = (e) => {
    setPass(e.target.value);
    setIsMatchPass(false);

    const storedPasswords = JSON.parse(localStorage.getItem("Pass"));
    if (storedPasswords[index] === e.target.value) {
      setIsMatchPass(true);
    }
  };

  const onClick = (e) => {
    localStorage.setItem("index", index);
  };

  return (
    <>
      <div className="contain">
        <div className="signin-logo">
          <img src={logo} alt="" />
          <div className="logo-name">FlowFinance</div>
        </div>
        <div className="d-flex align-items-center flex-column  input">
          <div className="sign_mono">
            <h1>Sign in</h1>
          </div>
          <div className="signin-inputs-div">
            <input
              type="text"
              placeholder="Enter email"
              onChange={onChangeEmail}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              onChange={onChangePass}
            />
          </div>
          <div className="forgot_pas">Forgot password?</div>
          <div className="have-account">
            If you don't have an account
            <Link to="/signup">
              <span>&nbsp;Register here!</span>
            </Link>
          </div>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-primary btn_sign_in"
            disabled={!(isMatchEmail && isMatchPass)}
            onClick={onClick}
          >
            <Link to="/HomePage">Sign In</Link>
          </button>
        </div>
        <div className="signin-continue_with mt-1">or continue with</div>
        <div className="d-flex justify-content-center gap-3 my-4">
          <img src={facebook} width="10%" alt="" />
          <img src={apple} width="10%" alt="" />
          {/* <Link to="#" onClick={handleGoogleSignIn}> */}
            <img src={google} width="10%" alt="" onClick={handleGoogleSignIn} />
          {/* </Link> */}
        </div>
      </div>
    </>
  );
};

export default Signin;
