

import { use, useEffect, useState } from "react";
import { apiGetUsername } from "../api";
import { useAuth } from "../auth/AuthContext";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";


export function InvalidSessionPage(){



    return (

        <>
        <Navbar/>

        <div className="container">


            <h1>{"Session in invalid or expited"}</h1>
            <h1>{"Click on home button"}</h1>


        <Footer/>
    </div>
        </>
    )


}