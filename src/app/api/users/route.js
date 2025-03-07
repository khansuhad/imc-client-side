import { getServerSession } from "next-auth";
import dbConnect, { collections } from "../../../lib/dbConnect"
import { authOptions } from "@/lib/authOptions";


export async function GET(req) {
  const { searchParams } = req.nextUrl; // Access searchParams from nextUrl
  const email = searchParams.get("email"); // Get the 'email' query parameter
  
  if (!email) {
    return new Response(
      JSON.stringify({ error: "Email is required" }),
      { status: 400 }
    );
  }

  try {
    // Connect to the database
// Get the database instance

    // Query the users collection to find the user by email
    const user = await dbConnect(collections.users).findOne({ email });
    const session = await getServerSession(authOptions)
    const verifyEmail = session?.user?.email === email 
    if(verifyEmail) {
      if (!user) {
        return new Response(
          JSON.stringify({ error: "User not found" }),
          { status: 404 }
        );
      }
  
      // Return the user as a JSON response
      return new Response(JSON.stringify(user), { status: 200 });
    }
    else {
      return new Response(JSON.stringify({message : "Forbidden access"}), { status: 403 });
    }
   
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Internal Server Error", details: error.message }),
      { status: 500 }
    );
  }
}
export async function POST() {
    // Simulate fetching users from a database
    const users =  { id: 1, name: 'Alice' }
   
    const result  = await dbConnect(collections.users).insertOne(users)
  
    // Return a JSON response
    return Response.json(
        result
    )
  }
  