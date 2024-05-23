import React from "react";
import "../style/Body.css";
import Body from "./Body";
import useAuth from "../utils/useAuth";
import { useEffect,useRef } from "react";
import { useToast } from "../utils/ToastSetUp";


function Home() {
  const {auth} = useAuth()
  const {notifyWarning} = useToast()

  const hasMounted = useRef(false);

  useEffect(()=>{
    const checkLogin = () =>{
      if(!auth?.id && !hasMounted.current){
        notifyWarning("Hi! there, please LogIn to know more about us")
      }
      hasMounted.current = true;
    }

    checkLogin()

  },[auth?.id,notifyWarning])

  
  return (
    <main>
      <Body />
      <footer className="footer">
      <p>© 2024 Foodie Recipe. All rights reserved.</p>
    </footer>
    </main>
  );
}

export default Home;
