import { Link } from "react-router-dom";
import useAllTests from "../../../../Hock/useAllTests";

const AllTest = () => {
    const {tests} = useAllTests();
    return (
        <div>
            <h1>all test</h1>
            {
          <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-5 justify-center">
          {
        tests?.map((test) => <Link to={`/dashboard/allTests/${test?._id}`} key={test?._id}>
                         <div className="card lg:w-80 bg-base-100 shadow-xl">
<figure><img src="https://i.postimg.cc/d1r3c0FG/Whats-App-Image-2023-12-19-at-4-48-51-AM.jpg" alt="Shoes" className="h-44" /></figure>
<div className="card-body text-center">
  <h2 className="font-bold text-xl">{test?.testName}</h2>
  <p>Class : {test?.testClass}</p>
  <p>Phone Number : {test?.date}</p>
</div>
</div>
              </Link> ) 
             
          }
         
      </div>
      
        }
        </div>
    );
};

export default AllTest;