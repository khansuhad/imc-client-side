

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import './styles.css';

// import required modules
import { Navigation } from 'swiper/modules';

export default function App() {

  return (
    <>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide><img    src="https://i.postimg.cc/MTC73GKF/278175080-350534060425404-4480815337086332200-n.jpg" alt="" className='h-[80vh] bg-cover bg-no-repeat' /></SwiperSlide>
        <SwiperSlide><img src="https://i.postimg.cc/3wbVR2n0/maxresdefault.jpg" alt="" className='h-[80vh] bg-cover bg-no-repeat' /></SwiperSlide>
        <SwiperSlide><img src="https://i.postimg.cc/2SS0ZVqQ/freepik-logo.webp" alt="" className='h-[80vh] bg-cover bg-no-repeat' />
        </SwiperSlide>
        <SwiperSlide ><img src="https://i.postimg.cc/XN9d74vn/12994436-1261164913912540-3496323262739265895-n.jpg" alt=""  /></SwiperSlide>
      
      </Swiper>
    </>
  );
}
