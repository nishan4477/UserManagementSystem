import React,{useState} from 'react'
import { Button, Card, Input, List, ListItem } from '@material-tailwind/react'

const SpecificUser = () => {
   const [userId, setUserId] = useState('')
     const [userData, setUserData] = useState(null) 

     const fetchUserData = async () => {
        const response = await fetch(`/api/users/${userId}`)
        if(response.ok) {
            const res = await response.json()
            setUserData(res.user)
        }
        else {
            console.log("Error fetching user data")
                    setUserData(null)
                }
     }
  return (
    <div>
        <div className="flex">
            <div className="w-72">
                <Input type='text' value={userId} onChange={(e)=> setUserId(e.target.value)}  label='Enter the user id'/>
                


            </div>
            <Button className='ml-4' onClick={()=> fetchUserData()}>Fetch User Data</Button>


        </div>
      {userData ? (
        userData.map(({id, name, email, password})=> (
            <>
            <Card className='w-96 mt-5'>
                <List>
                    <ListItem>{id}</ListItem>
                    <ListItem>{name}</ListItem>
                    <ListItem>{email}</ListItem>
                    <ListItem>{password}</ListItem>

                </List>

            </Card>
            
            </>
        ))
      ): (
        <p className='mt-2'>search for specific user </p>
      ) }




    </div>
  )
}

export default SpecificUser;