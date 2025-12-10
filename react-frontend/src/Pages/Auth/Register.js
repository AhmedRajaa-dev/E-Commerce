import axios from "axios";
import { useState } from "react";
import { REGISTER,bascURL } from "../../Api/Api";
import Cookie from "cookie-universal";
import { useNavigate } from "react-router-dom";


export default function Register(){
    const cookie=new Cookie();
    const navigate=useNavigate();

      //states
  const [form,setForm]=useState({
    name:"",email:"",password:""
  });
  //handle form change
  const handleChange=(e)=>{
    setForm({...form,[e.target.name]:e.target.value})
  };
  //handleSubmit
  async function handleSubmit(e){
    e.preventDefault()
    try{
   const res= await axios.post(`${bascURL}/${REGISTER}`,form);
    const token=res.data.token;
    cookie.set("token",token);
    console.log("register succes");
    navigate("/users");

    }catch (error){
        console.log(error);
    }
  }
  console.log(form);
    return (
        <div className="">
            <h1>Register page</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input id="name" placeholder="Enter your Name..." value={form.name} name="name" onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input id="name" placeholder="Enter your Email..." value={form.email} name="email" onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="password">password:</label>
                    <input id="password" placeholder="Enter your Password..." value={form.password} name="password" onChange={handleChange}/>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}