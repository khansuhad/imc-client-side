
const AdmissionForm = () => {
    return (
        <div>
            <h1 className="text-3xl font-semibold text-center mt-10">Admission Form </h1>
            <div className="lg:px-12 px-4 mt-20">
      <div className="md:w-2/3 mx-auto mb-20">
        <form >
          <div className="flex flex-col lg:flex-row gap-8 items-center mb-8">
            <div className="lg:w-1/2 w-full">
              <label
                className="text-base text-black w-full"
              >
               Name
              </label>
              <input
                type="text"
                name="name"
                required
                className="block border border-[#5E1675] rounded-lg py-2 px-2 mt-2 w-full"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label
      
                className="text-base text-black w-full"
              >
                Class
              </label>
              <input
                type="text"
      required
                name="subject"
                className="block border border-[#5E1675] px-2 rounded-lg py-2 mt-2 w-full"
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-8 items-center mb-8">
            <div className="lg:w-1/2 w-full">
              <label
              
                className="text-base text-black w-full"
              >
              School
              </label>
              <input
                type="text"
           required
                name="email"
                className="block border border-[#5E1675] px-2 rounded-lg py-2 mt-2 w-full"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label
              
                className="text-base text-black w-full"
              >
                Phone number
              </label>
              <input
                type="number"
          
                name="phoneNumber"
                className="block border border-[#5E1675] px-2 rounded-lg py-2 mt-2 w-full"
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-8 items-center mb-8">
            <div className="lg:w-1/2 w-full">
              <label
              
                className="text-base text-black w-full"
              >
              Parent&rsquo;s name
              </label>
              <input
                type="text"
           required
                name="email"
                className="block border border-[#5E1675] px-2 rounded-lg py-2 mt-2 w-full"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label
              
                className="text-base text-black w-full"
              >
              Parent&rsquo;s  Phone number
              </label>
              <input
                type="number"
          
                name="phoneNumber"
                className="block border border-[#5E1675] px-2 rounded-lg py-2 mt-2 w-full"
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-8 items-center mb-8">
            <div className="lg:w-1/2 w-full">
              <label
              
                className="text-base text-black w-full"
              >
              Admission Date
              </label>
              <input
                type="date"
           required
                name="date"
                className="block border border-[#5E1675] px-2 rounded-lg py-2 mt-2 w-full"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label
              
                className="text-base text-black w-full"
              >
              Batch
              </label>
              <input
                type="number"
          
                name="phoneNumber"
                className="block border border-[#5E1675] px-2 rounded-lg py-2 mt-2 w-full"
              />
            </div>
          </div>

          <div className="w-full mb-8">
            <label
           
              className="text-base text-black w-full"
            >
              Message
            </label>
            <textarea  required name="message" cols="30" rows="5" className="block border  border-[#5E1675] rounded-lg py-2 px-2 mt-2 w-full"></textarea>
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

export default AdmissionForm;