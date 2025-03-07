"use client"
import { useRef, useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import aboutUsCss from "./styles.module.css"
const AboutUs = () => {
    const AboutUsVideo = "/assets/videos/aboutUsVideo.mp4";
    const logo = "/assets/images/Logo.webp";
    const videoRef = useRef(null); // Reference to the video element
    const [isPlaying, setIsPlaying] = useState(false); // Track if the video is playing

    // Function to play video
    const handlePlayVideo = () => {
        const video = videoRef.current;
        if (video) {
            video.play();
            setIsPlaying(true); // Update state to hide the cover and play button
        }
    };

    // Function to handle pause and end events
    const handlePauseVideo = () => {
        setIsPlaying(false); // Show cover logo again on pause
    };

    return (
        <div className="px-5 py-2">
            <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-8 items-center">
                {/* Text Section */}
                <div className="space-y-4 font-tiroBangla">
                    <h1 className="text-3xl font-bold font-inter">আমাদের সম্পর্কে</h1>
                    <p className="leading-relaxed">
                    Infinity Math Center-এ আমরা বিশ্বাস করি যে গণিত কেবল একটি বিষয় নয়, এটি একটি শক্তিশালী টুল যা আমাদের চিন্তা এবং সমস্যা সমাধানের দক্ষতা বৃদ্ধি করে। আমাদের লক্ষ্য হচ্ছে ছাত্র-ছাত্রীদের মধ্যে গণিতের প্রতি আগ্রহ সৃষ্টি করা এবং তাদের একাডেমিক দক্ষতাকে উন্নত করা।
                    </p>
                    <ul className="list-disc list-inside space-y-2 font-tiroBangla ">
                 
আমাদের প্রতিষ্ঠানে:
<li>বিশেষজ্ঞ শিক্ষকগণ: আমাদের শিক্ষকদের প্রশিক্ষণ এবং অভিজ্ঞতা ছাত্রদের শেখার প্রক্রিয়াকে আরও সহজ এবং কার্যকরী করে তোলে।</li>
<li>বিকল্প শিক্ষণ পদ্ধতি: গণিতের কঠিন বিষয়গুলো সহজভাবে বোঝানোর জন্য আমরা ইন্টারেক্টিভ এবং অংশগ্রহণমূলক শিক্ষণ পদ্ধতি গ্রহণ করি।</li>
<li>ব্যক্তিগত মনোযোগ: আমরা ছাত্রদের প্রয়োজন অনুযায়ী বিশেষভাবে গাইড করি এবং প্রতিটি ছাত্রের একক প্রতিভা উন্মোচনে সহায়তা করি।</li>
<li>শিক্ষার্থীদের সাফল্য: আমরা সবসময় চেষ্টা করি আমাদের শিক্ষার্থীদের ভবিষ্যৎ পরীক্ষায় এবং জীবনের বিভিন্ন ক্ষেত্রে সফল করতে।</li>
<li>আমাদের উদ্দেশ্য হলো, প্রতিটি ছাত্র যেন গণিতকে বুঝতে এবং ভালো করতে পারে, যাতে তারা তাদের লক্ষ্য পূরণে সক্ষম হয়।</li>
<li>সার্বক্ষণিক সিসি ক্যামেরা দ্বারা পর্যবেক্ষিত </li>
<li>ব্যাচ ভিত্তিক করানো হয় </li>
<li>মৌলভীবাজার জেলার প্রথম স্মার্ট বোর্ড সম্বলিত সম্পূর্ণ শীতাতপ নিয়ন্ত্রিত ডিজিটাল ক্লাসরুম।</li>

                    </ul>
                </div>

                {/* Video Section */}
                <div className="relative w-full">
                    {/* Video Player */}
                    <video
                        ref={videoRef}
                        className={`w-full rounded-2xl object-cover ${isPlaying ? 'block' : 'hidden'}`}
                        controls
                        src={AboutUsVideo}
                      
                        onEnded={handlePauseVideo}
                    />

                    {/* Cover Image with Play Button */}
                    {!isPlaying && (
                        <div className="relative w-full  ">
                            <img
                                src={logo}
                                alt="Logo"
                                className="w-full h-full object-cover border-[2px] border-yellow-600 p-5 rounded-2xl"
                            />
                            <div
                                className="absolute inset-0 flex items-center justify-center cursor-pointer"
                                onClick={handlePlayVideo}
                            >
                                <DotLottieReact
                                    src="https://lottie.host/4c23cacf-dc43-4c2b-9a57-5aa59f1d35b4/x1GGlGdCgO.lottie"
                                    loop
                                    autoplay
                                    className="lg:w-[80px] lg:h-[80px] w-[60px] h-[60px]"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
