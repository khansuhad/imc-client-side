
import dbConnect, { collections } from "../../../../lib/dbConnect"

export async function POST(req) {
    // Simulate fetching users from a database
    const user = await req.json()
   const findUser = await dbConnect(collections.users).findOne({email :user?.email})
   if(findUser){
    return Response.json(
        {message : "email already exists , try another email"}
    )
   }
    const result  = await dbConnect(collections.users).insertOne(user)
  
    // Return a JSON response
    return Response.json(
        result
    )
  }
export async function GET() {

   const findUser = await dbConnect(collections.users).find().toArray()
   if(findUser){
    return Response.json(
       findUser
    )
   }
    const result  = await dbConnect(collections.users).insertOne(user)
  
    // Return a JSON response
    return Response.json(
        result
    )
  }