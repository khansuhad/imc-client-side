
import { ObjectId } from "mongodb";
import dbConnect, { collections } from "../../../lib/dbConnect"
import { revalidatePath } from "next/cache";
 // Adjust imports according to your actual code setup

 export async function PATCH(request) {
    const { searchParams } = request.nextUrl; // Get query params
    const id = searchParams.get("id");
    const status = searchParams.get("status");
  
    try {
      // Prepare the update query
      const updatedDoc = {
        $set: {
          status: status,
        },
      };
  
      // Perform the update operation
      const result = await dbConnect(collections.bloods).updateOne(
        { _id: new ObjectId(id) },  // Find document by its ObjectId
        updatedDoc  // Apply the update
      );
  
      console.log(result);
  
      // Trigger revalidation of the path
      revalidatePath("/dashboard/admin/blood-list");
      revalidatePath("/search-blood");
      // Return success response
      return new Response(
        JSON.stringify({ success: 'Donation status updated successfully' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } catch (error) {
      console.error(error);
  
      // Return error with the correct Response object
      return new Response(
        JSON.stringify({ error: 'Internal Server Error' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }
export async function GET() {


  try {
    

    const bloodData = await dbConnect(collections.bloods).find().toArray();
    revalidatePath("/dashboard/admin/blood-list");
    // Return data with the correct Response object
    return new Response(JSON.stringify(bloodData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);

    // Return error with the correct Response object
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}



export async function POST(req) {

   const body = await req.json()
    const result  = await dbConnect(collections.bloods).insertOne(body)
    revalidatePath("/dashboard/admin/blood-list");
    // Return a JSON response
    return Response.json(
        result
    )
  }
  