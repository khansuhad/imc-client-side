
const STable = () => {
    return (
        <div className="w-[90%] mx-auto">
                        <table className="table border">
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
              <tbody className="bg-white">
              <tr>
            <td>
               1-02-2024
            </td>
            <td>
               March - 2024
            </td>
            <td>2000</td>
            <td>2000</td>
            <td>Ahmod Ali</td>

          
    
        </tr>
             
              </tbody>
            </table>

        </div>
    );
};

export default STable;