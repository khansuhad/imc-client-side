import axios from 'axios';


const Check = () => {

  const sendSMS = async () => {
    try {
      const greenwebsms = new URLSearchParams();
      greenwebsms.append('token', '1196418472917392780491ebff42bd422c43a2fa2cc3d55be3c15');
      greenwebsms.append('to', '+8801646556476');
      greenwebsms.append('message', 'test sms');
    const response = await  axios.post('https://api.bdbulksms.net/api.php', greenwebsms).then(response => {
        console.log(response.data);
      });
  
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error sending SMS:", error.response ? error.response.data : error.message);
    }
  };
  

  
  return (
<div>
  <button onClick={sendSMS}>hi</button>
</div>
  );
};

export default Check;
