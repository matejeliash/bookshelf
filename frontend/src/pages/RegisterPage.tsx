
import { use, useState } from "react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { PasswordField } from "../components/PasswordField";
import { TextField } from "../components/TextField";
import { apiLogin, apiRegister, type LoginData, type RegisterData } from "../api";
import { useAuth } from "../auth/AuthContext";
import { TextButton } from "../components/TextButton";
import { useNavigate } from "react-router-dom";


export function RegisterPage(){

    const {login} = useAuth();
    const navigate = useNavigate();

  const [username,setUsername] = useState<string>("")
  const [email,setEmail] = useState<string>("")
  const [password,setPassword] = useState<string>("")
  const [password2,setPassword2] = useState<string>("")
  const [error,setError] = useState<string>("")
  const [success,setSuccess] = useState<string>("")

   function isValidEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
} 

  const onRegister = async () => {

    if (!isValidEmail(email)){
        setError("Invalid e-mail address !!!")
        return;

    }
  
    if(password !== password2){
        setError("Password do not match !!!")
        return;
    }

  const registerData: RegisterData = { username, password,email};
  
  try{
    const res = await apiRegister(registerData);
        setError("")
        setSuccess("User registered")

  }catch (e:any){
    setSuccess("")
    setError(e.toString())

  }

};

    return (

        <>
        <Navbar/>

        <div className="container">

        <h1>Register</h1>

      <div className="searchForm">

        <p className="searchFieldTitle">username</p>

        <TextField value={username} onchange={setUsername}  defaultvalue={""} ></TextField>
        <p className="searchFieldTitle">email</p>

        <TextField value={email} onchange={setEmail}  defaultvalue={""} ></TextField>

        <p className="searchFieldTitle">password</p>
        <PasswordField value={password} onchange={setPassword} ></PasswordField>
        
        <p className="searchFieldTitle">password</p>
        <PasswordField value={password2} onchange={setPassword2} ></PasswordField>

        <div className="searchButtonContainer">
        <TextButton onclick={onRegister} text={"Confirm"} ></TextButton>
        </div>
      </div>

        {error && <i><h3 className="errorField">{error}</h3></i>}
        {success && <i><h3 className="successField">{success}</h3></i>}



        <Footer/>
    </div>
        </>
    )


}