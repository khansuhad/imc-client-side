import useAxiosPublic from "../../../../Hock/useAxiosPublic";


const Addpayment = () => {
  const useAxios = useAxiosPublic();
  const handleForm = (e) =>{
    e.preventDefault();
    const form = e.target;
    const transectionDetails = form.transectionDetails.value;
    const collection = form.collection.value;
    const amount = form.amount.value;
    const date = form.date.value;
    const entry = form.entry.value;
    
    const formInfo = {transectionDetails,collection,amount,date,entry }
    console.log(formInfo);
 
    useAxios.post("/addpayment",formInfo)
    .then(res => {
      console.log(res?.data);
    })

  }
    return (
        <div>
        <h1 className="text-3xl font-semibold text-center mt-10">Add payment </h1>
        <div className="lg:px-12 px-4 mt-20">
  <div className="md:w-2/3 mx-auto mb-20">
    <form onSubmit={handleForm}>
      <div className="flex flex-col lg:flex-row gap-8 items-center mb-8">
        <div className="lg:w-1/2 w-full">
          <label
            className="text-base text-black w-full"
          >
           Transection details
          </label>
          <input
            type="text"
            name="transectionDetails"
            required
            className="block border border-[#5E1675] rounded-lg py-2 px-2 mt-2 w-full"
          />
        </div>
        <div className="lg:w-1/2 w-full">
          <label
  
            className="text-base text-black w-full"
          >
            Total amount
          </label>
          <input
            type="text"
  required
            name="amount"
            className="block border border-[#5E1675] px-2 rounded-lg py-2 mt-2 w-full"
          />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-8 items-center mb-8">
        <div className="lg:w-1/2 w-full">
          <label
          
            className="text-base text-black w-full"
          >
          Collection
          </label>
          <input
            type="text"
       required
            name="collection"
            className="block border border-[#5E1675] px-2 rounded-lg py-2 mt-2 w-full"
          />
        </div>
        <div className="lg:w-1/2 w-full">
          <label
          
            className="text-base text-black w-full"
          >
            date
          </label>
          <input
            type="date"
      
            name="date"
            className="block border border-[#5E1675] px-2 rounded-lg py-2 mt-2 w-full"
          />
        </div>
      </div>
    
    

      <div className="w-full mb-8">
        <label
       
          className="text-base text-black w-full"
        >
          Entry
        </label>
        <textarea  required name="entry" cols="30" rows="5" className="block border  border-[#5E1675] rounded-lg py-2 px-2 mt-2 w-full"></textarea>
      </div>
   
      <div className="w-36 mx-auto border rounded-lg">
      <input type="submit" value="Submit" className="btn-primary py-3 bg-primary px-8 text-white font-medium rounded-b-md cursor-pointer inline-block w-full "/>
      </div>
    </form>
  </div>
  
</div>

    </div>
    );
};

export default Addpayment;