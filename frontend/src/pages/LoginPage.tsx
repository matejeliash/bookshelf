
import { use, useState } from "react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { PasswordField } from "../components/PasswordField";
import { TextField } from "../components/TextField";
import { apiLogin, type LoginData } from "../api";
import { useAuth } from "../auth/AuthContext";
import { TextButton } from "../components/TextButton";
import { useNavigate } from "react-router-dom";


export function LoginPage(){

    const {login} = useAuth();
    const navigate = useNavigate();

  const [username,setUsername] = useState<string>("")
  const [password,setPassword] = useState<string>("")
  const [error,setError] = useState<string>("")



  const onLogin = async () => {
  const loginData: LoginData = { username, password };

  const tokenData = await apiLogin(loginData);

  if (tokenData) {
    login(tokenData);
     navigate("/shelf");
  }else{
    setError("Error: wrong credentials")
  }
};

    return (

        <>
        <Navbar/>

        <div className="container">
        
        <h1>Login</h1>

      <div className="searchForm">

        <p className="searchFieldTitle">username</p>

        <TextField value={username} onchange={setUsername}  defaultvalue={""} ></TextField>

        <p className="searchFieldTitle">password</p>
        <PasswordField value={password} onchange={setPassword} ></PasswordField>

        <div className="searchButtonContainer">
        <TextButton onclick={onLogin} text={"Confirm"} ></TextButton>
        </div>
      </div>

        {error && <i><h3 className="errorField">{error}</h3></i>}

        <p>If you don't have account, you can register on <a href="/register">REGISTER</a> page.</p>



        <Footer/>
    </div>
        </>
    )


}