"use client";
import React, { useState } from "react";
import axios from 'axios';
import { Button, Input } from "@material-tailwind/react";

const CreateUser = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!id || !name || !email || !password) {
        alert("please fill all the input fields");
        return;

  }

  try {
  const response =  await axios.post("/api/users",{
    id,
    name,
    email,
    password
  })

  if(response.status === 200) {
    alert("user created successfully");
    setId('');
    setName('');
    setEmail('');
    setPassword("");
  }
 else{
    alert("something went wrong")
    return;
 }


}
catch(error){
    alert(error);
    return;
  }
  }


  return (
    <div>
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <Input
            label="ID"
            type="number"
            placeholder="ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />

<Input
            label="Name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

<Input
            label="Email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

<Input
            label="Password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
  <div>
  <Button className="mt-2 "  type="submit">
            Create
          </Button>
  </div>
       
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
