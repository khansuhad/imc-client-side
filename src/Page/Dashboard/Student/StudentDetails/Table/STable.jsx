import useAddPayment from "../../../../../Hock/useAddPayment";

const STable = () => {
  const {addPayments} = useAddPayment();
    return (
        <div className="w-[90%] mx-auto">
                        <table className="table border ">
              {/* head */}
              <thead className="md:text-xl font-bold text-white border-2 bg-slate-700 dark:text-white">
                <tr>
                  <th>Date</th>
                  <th>Transaction Details</th>
                  <th>Total Amount </th>
                  <th>Collection</th>
                  <th>Entry</th>
              
                </tr>
              </thead>
              <tbody className=" ">
            {
              addPayments?.map((payment , index) =>   <tr className={` ${index % 2 ==! 0 ?  'bg-gray-100' : 'bg-white'} `} key={payment?._id}>
                <td>
                  {payment?.date}
                </td>
                <td>
                 {payment?.transectionDetails}
                </td>
                <td>{payment?.collection}</td>
                <td>{payment?.amount}</td>
                <td>{payment?.entry}</td>
    
              
        
            </tr>)
            }
             
              </tbody>
            </table>

        </div>
    );
};

export default STable;