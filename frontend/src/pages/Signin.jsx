import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"
import { useNavigate } from "react-router-dom"

 const Signin = () => {
  const[email,setEmail] = useState("")
  const[pass,setPass]  = useState("")
  const navigate = useNavigate();



  const handleSignIn = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
        username: email,
        password: pass,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing in:", error);
      // Handle error (e.g., show error message to user)
    }
  };

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />

        <InputBox onChange={(e)=>{
          setEmail(e.target.value)
        }} placeholder="your email" label={"Email"} />

        <InputBox onChange={(e)=>{
          setPass(e.target.value)
        }} placeholder="123456" label={"Password"} />

        <div className="pt-4">
          <Button onClick={handleSignIn} label={"Sign in"} />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}
export default Signin