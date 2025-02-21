import React, { useRef } from 'react';
import "./IdCard.css"
import { useReactToPrint } from 'react-to-print';
import { useLoaderData } from 'react-router-dom';
const IdCard = () => {
    const data = useLoaderData()
        const contentRef = useRef(null);
       
         const reactToPrintFn = useReactToPrint({
          contentRef,
          documentTitle: `wow.pdf`,
          pageStyle: `
            @page {
              size: auto;
              margin: 0;
            }
           .scale {
              transform: scale(1.33); /* Increase scale to 120% */
              transform-origin: top left; /* Ensure it scales from the top-left corner */
            }
          `,
        });
    return (
        <div className='bg-button-gradient-backend min-h-screen'>
        
        <div >
        <div className=" flex justify-center  py-10 " >
        
        <div className="w-[155px] h-[246px] bg-white font-poppins relative overflow-hidden border-[0.25px] border-[#139EE2]" ref={contentRef}  
        >
         <div className='flex '>
         <div className='w-[22px] h-[246px] bg-id-card-gradient relative flex justify-center items-center pl-2'>
            <h1 className='text-creation-link text-center '>www.creationit.info</h1>
          </div>
     <div className='flex-1 '>
     <div className='flex-1 flex flex-col items-center'>
    <figure className='w-[95px] h-[29px] mt-[15px]'><img src="https://s3-alpha-sig.figma.com/img/8027/9a29/87a2a9ca72d1d7397b0eb39fdedf053a?Expires=1736726400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UBx63O27Uzh9Jd~TigK5-nliONbrpSHDQiPjiC5yGYuBiVHQol8EuT~LEZIppkhwceMa~2RiwbnSLFx7JtGu8ykK5UGlqc8gMBtavJ08cEZbLjfjGOCIpvTNqRD56lt9twyErR1w3ybcF~CW8oEkDD4TKOfy-BZRHI5x2Oftggyid~DFO5CmVoL2JD0DUCSVFxOpOgSwmzcPJOqJBlGSZAMzcBh-5xjnY1SMZvZO9h48Cj6d8tAEe57cb0KHJVzmQJCXHVOycMU2lCt~ka6aKP9f7Li8OSr3btKIlNEiztHlBI3i4YTuazChHwklepZXLQL9MuArgVOr8xnoErOQIw__" alt="" /></figure>
    <figure className='w-[67px] h-[76px] mt-[4px] '><img src={data?.photoURL} className='border-[0.5px] border-[#139EE2]' alt="" /></figure>
    <span className='h1-id-card '>{data?.name}</span>
    <span className='h4-id-card'>{data?.course}</span>
    <div className='flex text-[7px] mt-[10px] '>
        <div className='font-normal'>
            <h1>Student ID </h1>
            <h1>Batch No</h1>
            <h1>Blood Group</h1>
          </div>
          <hr className='bg-black border-black mx-1 w-[0.25px] h-[30px]'/>
          <div className='font-medium'>
            <h1> {data?.registrationNo} </h1>
            <h1> {data?.batch}</h1>
            <h1> {data?.bloodGroup}</h1>
          </div>
        </div>
     
          </div>
          <div className="flex flex-col justify-start mt-[13px] ml-3 ">
    <figure className="w-[56px] h-[22px]  "><img src="https://s3-alpha-sig.figma.com/img/1082/5727/a6a18b842fc8ba3472968449cc8ff730?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Qe3AoJHhMAMBkDp7xgWrCM591FNR7hdCdSNCvM6H98oEuJK89J5ALAkySgpNnQs-Ix72twORXconjwY1HKMKzP49MoftwAgJqTJic8rzlnM0XHjmuVRRagpHgyQY32icwcyK0c7WRywqjngCSWvPMKPnkk3-sIR-HY4nxgD3pJzXN-MiuwQaCVrNofboRDjMefHzLB-bXPZHo9Acz5itttXsiTGQSV-7i064oMCl6wUzkhRDNPJNdkVOA2yohchGpaZvw~c3XdVavHhkyLBd5slyI0DxG6KaoYh-k5YSfIZE5RgPMP6hXIybXd3nAC3I7kVzQ-3Ih~4KXVpCUs9x6g__" alt="" /></figure>

    <h1 className="text-[6px]  font-medium -mt-[3px]" >Founder & CEO</h1>
    </div>
     </div>
         </div>
        <figure className='w-[93.113px] h-[48px] absolute -bottom-3 -right-[18px] overflow-hidden'><img src="https://s3-alpha-sig.figma.com/img/984c/7195/183487b7e89182488ae6a9b0f72635d4?Expires=1736726400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=QgFiSdKI3TasPdLPcIks~BmaDMH-JpFaDGBX-QHkODl-6~5iapNx8fDJ6X-uwOcWUBxxF3NJt2zN8VnpzL5eNU~AtQio7rkyWH8-o8r9bc3jd1x6uRX~uLLkpzTp7l2N6r3trlbSsyHj9IWetucVqmYxUo2V2RAZgVhIXKaYrLT4GUq~1y0izvP4YOd8XObhgPe6v1eaDn0zNxiJ0zoXTgnC3~rvznVvqMZcJ44OWaqpVe071ZaExeoWQr7~GyfoHMXsicvGRT-k96cJZu1BuLJeMXVyCfIAyOZiStz7KjpW6zeKdFd-KUifA8x67ceWrMZKFsb2hHd95NCM0AZuoQ__" alt="" /></figure>
        </div>
        </div>
        <div className="flex justify-center items-center mt-5 ">
             <button onClick={reactToPrintFn} className=" flex justify-center items-center bg-button-gradient-backend text-white px-10 py-2 rounded">Print</button>
             
             </div>
        </div>
        </div>
    );
};

export default IdCard;