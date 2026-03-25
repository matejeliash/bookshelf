import { createContext, useEffect,useContext, type ReactNode, useState } from "react";
import type { TokenData } from "../api";


type AuthContextType = {
    isLoggedIn : boolean;
    login : (tokenData : TokenData ) => void ;
    logout : () => void;
    isTokenValid :() => boolean;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {


    const [isLoggedIn,setIsLoggedIn] = useState<boolean>(false);


    useEffect( () =>{

      const prevToken = localStorage.getItem("token")
      const prevExpTimeStr = localStorage.getItem("expTime")
      if (prevToken &&  prevExpTimeStr){ 

        const prevExpTime = parseInt(prevExpTimeStr)
        if (prevExpTime > Date.now()){
          setIsLoggedIn(true)
        }
        else{
          logout()
        }

      }


        const token = localStorage.getItem("token");

        setIsLoggedIn(!!token);

    },[]);


    const login  = (tokenData: TokenData) => {
        localStorage.setItem("token",tokenData.token);
        const expTime = Date.now()+ tokenData.expiresIn
        localStorage.setItem("expTime",expTime.toString())
        setIsLoggedIn(true);
    }



    const logout  = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("expTime");
        setIsLoggedIn(false);
    }

    const isTokenValid = () =>{

      const prevToken = localStorage.getItem("token")
      const prevExpTimeStr = localStorage.getItem("expTime")
      if (prevToken &&  prevExpTimeStr){ 

        const prevExpTime = parseInt(prevExpTimeStr)
        if (prevExpTime > Date.now()){
          setIsLoggedIn(true)
          return true;

        }
        else{
          logout()
          return false;
        }

      }
      else{
        logout()
        return false

      }





    }



  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout ,isTokenValid: isTokenValid}}>
      {children}
    </AuthContext.Provider>
  );



}


export function useAuth():AuthContextType{
    const context = useContext(AuthContext);

    if (!context) throw new Error("context error")


    return context;
}

