import axios from "axios";
import { useState } from "react";
import { LOGIN,bascURL } from "../../Api/Api";
import Cookie from "cookie-universal";
import { useNavigate } from "react-router-dom";


export default function Login(){
  //C:\Users\PC-AHMED\Desktop\React Project\E-Commerce\Api-backEnd
    const cookie=Cookie();
    const navigate=useNavigate()
      //states
  const [form,setForm]=useState({
    email:"",password:""
  });
  //handle form change
  const handleChange=(e)=>{
    setForm({...form,[e.target.name]:e.target.value})
  };
  //handleSubmit
  async function handleSubmit(e){
    e.preventDefault()
    try{
    const res=await axios.post(`${bascURL}/${LOGIN}`,form);
    const token=res.data.token;
    cookie.set("token",token)
    console.log("login succes");
    navigate("/dashboard");

    }catch (error){
        console.log(error);
    }
  }
  console.log(form);
    return (
        <div className="">
            <p className="text-3xl font-bold text-blue-600">Login page</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input id="name" placeholder="Enter your Email..." value={form.email} name="email" onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="password">password:</label>
                    <input id="password" placeholder="Enter your Password..." value={form.password} name="password" onChange={handleChange}/>
                </div>
                <button type="submit">Register</button>
                <button type="submit"><a href={"http://127.0.0.1:8000/login-google"}>login with google</a></button>

            </form>
        </div>
    )
}