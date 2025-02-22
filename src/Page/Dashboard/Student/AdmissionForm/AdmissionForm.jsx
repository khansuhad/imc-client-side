import ChangedDateValue from "../../../../Component/JavaScript/ChangedDateValue1";
import useAxiosPublic from "../../../../Hock/useAxiosPublic";

const AdmissionForm = () => {
const useAxios = useAxiosPublic();
  const handleForm = (e) =>{
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const id = form.id.value;
    const studentClass = form.studentClass.value;
    const school = form.school.value;
    const phoneNumber = form.phoneNumber.value;
    const parentsName = form.parentsName.value;
    const parentsPhoneNumber = form.parentsPhoneNumber.value;
    const admissionDate = form.admissionDate.value;
    const MonthDate = ChangedDateValue(admissionDate)
    const message = form.message.value;
    const formInfo = {id,name,  dueMonth : [MonthDate], studentClass,school,parentsName, parentsPhoneNumber, admissionDate, message , phoneNumber}
    console.log(formInfo);
 
    useAxios.post("/admissionStudents",formInfo)
    .then(res => {
      console.log(res?.data);
    })

  }
 
    return (
        <div>
            <h1 className="text-3xl font-semibold text-center mt-10">Admission Form </h1>
            <div className="lg:px-12 px-4 mt-20">
      <div className="md:w-2/3 mx-auto mb-20">
        <form onSubmit={handleForm}>
          <div className="flex flex-col lg:flex-row gap-8 items-center mb-8">
            <div className="lg:w-1/2 w-full">
              <label
                className="text-base text-black w-full"
              >
            ID
              </label>
              <input
                type="number"
                name="id"
                required
                className="block border border-[#5E1675] rounded-lg py-2 px-2 mt-2 w-full"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label
      
                className="text-base text-black w-full"
              >
                Name
              </label>
              <input
                type="text"
      required
                name="name"
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
                name="school"
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
                name="parentsName"
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
          
                name="parentsPhoneNumber"
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
                name="admissionDate"
                className="block border border-[#5E1675] px-2 rounded-lg py-2 mt-2 w-full"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label
              
                className="text-base text-black w-full"
              >
             Class
              </label>
              <input
                type="number"
          
                name="studentClass"
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