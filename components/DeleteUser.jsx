"use client";
import axios from "axios";
import { Button, Input } from "@material-tailwind/react";

import React, { useState } from "react";

const DeleteUser = () => {
  const [id, setId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id) {
      alert("please provide the user id");
      return;
    }
    try {
      const response = await axios.delete(`/api/users/${id}`);
      if (response.status===200) {
        alert("user deleted successfully");
        setId("");
      } else {
        alert(response.result || "something went wrong");
      }
    } catch (error) {
      alert(error);
      return;
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          label="User ID"
          type="number"
          placeholder="User ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <Button className="mt-2 " type="submit">
          Delete User
        </Button>
      </form>
    </div>
  );
};

export default DeleteUser;
