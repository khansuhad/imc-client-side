import dbConnect, { collections } from "../../../lib/dbConnect";




export async function POST(request) {
    const { bloodGroup, district } = await request.json();
  
    console.log('Received blood group:', bloodGroup);
    console.log('Received district:', district);
  
    try {
      // Start with a basic filter
     let filters = {}
   if(bloodGroup && district){
     filters = {
        status: "accepted",
        bloodGroup :bloodGroup ,
        district : district  // Always filter by "accepted" status
      }; 
      const bloodData = await dbConnect(collections.bloods).find(filters).toArray();
      
      console.log('Fetched blood data:', bloodData);
  
      // Return the results as a JSON response
      return new Response(JSON.stringify(bloodData), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
   }
   if(bloodGroup){
     filters = {
        status: "accepted",
        bloodGroup :bloodGroup 
      }; 
      const bloodData = await dbConnect(collections.bloods).find(filters).toArray();
      
      console.log('Fetched blood data:', bloodData);
  
      // Return the results as a JSON response
      return new Response(JSON.stringify(bloodData), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
   }
   if(district){
     filters = {
        status: "accepted",
        district : district
      }; 
      const bloodData = await dbConnect(collections.bloods).find(filters).toArray();
      
      console.log('Fetched blood data:', bloodData);
  
      // Return the results as a JSON response
      return new Response(JSON.stringify(bloodData), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
   }

  
      console.log('Filters:', filters);
  
      // Perform the query with the filters
      const bloodData = await dbConnect(collections.bloods).find(filters).toArray();
      
      console.log('Fetched blood data:', bloodData);
  
      // Return the results as a JSON response
      return new Response(JSON.stringify(bloodData), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error(error);
  
      // Return error response
      return new Response(
        JSON.stringify({ error: "Internal Server Error" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }
  


