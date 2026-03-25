

import { use, useState } from "react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { PasswordField } from "../components/PasswordField";
import { TextField } from "../components/TextField";
import { apiLogin, apiVerify, type LoginData, type VerifyData } from "../api";
import { useAuth } from "../auth/AuthContext";
import { TextButton } from "../components/TextButton";
import { useNavigate } from "react-router-dom";


export function VerifyPage(){

    const {login} = useAuth();
    const navigate = useNavigate();

  const [email,setEmail] = useState<string>("")
  const [verificationCode,setVerificationCode] = useState<string>("")
  const [error,setError] = useState<string>("")
  const [success,setSuccess] = useState<string>("")



  const onVerify = async () => {
  const verifyData: VerifyData = { email,verificationCode};


  try{
    const res = await apiVerify(verifyData);
        setError("")
        setSuccess("User verified")

  }catch (e:any){
    setSuccess("")
    setError(e.toString())




  }
};

    return (

        <>
        <Navbar/>

        <div className="container">
        
        <h1>Login</h1>

      <div className="searchForm">

        <p className="searchFieldTitle">email</p>

        <TextField value={email} onchange={setEmail}  defaultvalue={""} ></TextField>

        <p className="searchFieldTitle">verification code</p>
        <TextField value={verificationCode} onchange={setVerificationCode } defaultvalue="" ></TextField>

        <div className="searchButtonContainer">
        <TextButton onclick={onVerify} text={"Confirm"} ></TextButton>
        </div>
      </div>

        {error && <i><h3 className="errorField">{error}</h3></i>}
        {success && <i><h3 className="successField">{success}</h3></i>}

        <p>If you don't have account, you can register on <a href="/register">REGISTER</a> page.</p>



        <Footer/>
    </div>
        </>
    )


}