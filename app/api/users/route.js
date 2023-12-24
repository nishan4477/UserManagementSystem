
import { users } from "@/app/util/db";
import { NextResponse } from "next/server";
import fs from "fs"
// 1. get all users
export function GET(){
    const data = users;
    return NextResponse.json({data},  {status: 200});
}

// 4. create the user

export async function POST(req, res){
    let { id, name, email, password} = await req.json();

    // check if all the field is fill

    if(!id|| !name ||!email ||!password){
        return NextResponse.json({result:  "please fill all the field"},{status:400})
    }

    else{
        // add the user to the in memory array

        users.push({id, name, email, password});

        // extract just the user array from the updated data
        const updatedUsersArray = users;
        const updatedData = JSON.stringify(updatedUsersArray,null,2);

        // write the updated Users array into json string
        fs.writeFileSync('./app/util/db.js' , `export const users=${updatedData};`,"utf-8");


        return NextResponse.json({result:"user created successfully"})




    }
}

//5. Update User


export async function PUT(req, res) {
    let { id, name, email, password} = await req.json();

    const userIndex = users.findIndex((user)=> user.id == id)

    if(userIndex == -1){
        return NextResponse.json({result:  "user not found"},{status:400})
    }

    if(name){
        users[userIndex].name = name;
    }

    if(email){
        users[userIndex].email = email;
    }
    if(password){
        users[userIndex].password = password;
    }

     // extract just the user array from the updated data
     const updatedUsersArray = users;
     const updatedData = JSON.stringify(updatedUsersArray,null,2);

     // write the updated Users array into json string
     fs.writeFileSync('./app/util/db.js' , `export const users=${updatedData};`,"utf-8");


     return NextResponse.json({result:"user updated successfully"})



}