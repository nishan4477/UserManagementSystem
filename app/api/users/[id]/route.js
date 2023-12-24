import { users } from "@/app/util/db";
import { NextResponse } from "next/server";
import fs from "fs";

//2. get specific user
export async function GET(_,res){
     const {id} =await res.params;
     const user = users.filter((u) => u.id == id);
     return NextResponse.json({user, ok:true}, {status: 200});

}


// 3.login

export async function POST(req,res){
    let {name, email, password}= await req.json();
    const {id}= await res.params;

    const {name:uName, email:uEmail, password: uPassword} = users.find((u)=> u.id == id);
    if(uName===name && uEmail===email && uPassword===password){
            return NextResponse.json({result:"logged in sucessfully"});


    }
    else if(!name || !email ||!password ){
        return NextResponse.json({result:"Fill all the input fields"});

    }

    else{
            return NextResponse.json({result:"Invalid credentials"});
        }


}

// 6. Delete User


export async function DELETE(req,res){

    const {id} = await res.params;

    const userIndex = users.findIndex((user)=> user.id == id);

    if(userIndex == -1){
        return NextResponse.json({result:  "user not found"},{status:400});
    }

    // Remove the user from the user array

    users.splice(userIndex,1);

// extract just the user array from the updated data
const updatedUsersArray = users;
const updatedData = JSON.stringify(updatedUsersArray,null,2);

// write the updated Users array into json string
fs.writeFileSync('./app/util/db.js' , `export const users=${updatedData};`,"utf-8");


return NextResponse.json({result:"user deleted successfully"},{status:200})



}
