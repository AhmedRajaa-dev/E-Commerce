import axios from "axios";
import { useState } from "react";
import { REGISTER,bascURL } from "../../Api/Api";


export default function Register(){
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
    await axios.post(`${bascURL}/${REGISTER}`,form);
    console.log("register succes");

    }catch (error){
        console.log(error);
    }
  }
  console.log(form);
    return (
        <div className="">
            <h1>Login page</h1>
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