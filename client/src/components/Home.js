import React from "react";
import "../style/Body.css";
import Body from "./Body";
import useAuth from "../utils/useAuth";
import { useEffect } from "react";
import { useToast } from "../utils/ToastSetUp";


function Home() {
  const {auth} = useAuth()
  const {notifyWarning} = useToast()

  useEffect(()=>{
    if(!auth?.id){
      notifyWarning("Hi! there, please LogIn to know more about us")
    }
  },[auth?.id])
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
