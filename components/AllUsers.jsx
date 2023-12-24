"use client"


import React,{useState, useEffect} from 'react'
import { List, ListItem, Card } from '@material-tailwind/react'

const AllUsers = () => {

    const [users, setUsers]= useState("")

    useEffect(() => {
      const fetchALlUsers = async ()=>{
        const response = await fetch("/api/users");
        const usersInfo = await response.json();
        console.log(usersInfo.data);
        setUsers(usersInfo.data);
      };
      fetchALlUsers();
      
    },[]);
  return (
    <div>
      {users && users.map((user)=>(
       
          <Card key={user.id} className='mb-4'>
            <List>
              <ListItem>{user.name}</ListItem>

            </List>


          </Card>

      )

    )}


    </div>
  )
}

export default AllUsers;