'use client';
import bannerCss from "./banner.module.css"
import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Pagination, Autoplay } from 'swiper/modules';

// Define image paths (place images inside public/assets/images)
const images = [
  '/assets/images/1.jpg', '/assets/images/2.jpg', '/assets/images/4.jpg',
  '/assets/images/5.jpg', '/assets/images/6.jpg', '/assets/images/7.jpg',
  '/assets/images/8.jpg', '/assets/images/9.jpg', '/assets/images/11.jpg',
  '/assets/images/13.jpg', '/assets/images/14.jpg', '/assets/images/15.jpg',
  '/assets/images/16.jpg'
];

export default function Banner() {
  return (
    <div className='px-5'>
      <Swiper
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className='mySwiper'
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <figure className='w-full overflow-hidden'>
              <Image
                src={src}
                alt={`Slide ${index + 1}`}
                width={800} // Adjust based on your layout needs
                height={500} // Adjust based on your layout needs
                className={`w-full object-cover ${bannerCss['home-banner-img-ratio']}`}
                priority={index === 0} // Prioritize first image for faster loading
              />
            </figure>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
