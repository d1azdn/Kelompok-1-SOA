import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import "swiper/css";
import "swiper/css/bundle"
import "swiper/css/navigation";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
export default function HomeSlider(){
    const scrollToCarList = () => {
        // Scroll to the div with id 'car-list'
        const carListSection = document.getElementById('car-list');
        carListSection.scrollIntoView({ behavior: 'smooth' });
      };
    return (
        <div> 
        <Swiper 
            className="relative group"
            slidesPerView={1} 
            loop={true} // Enable infinite loop for the slider
            autoplay={{
            delay: 1000, // Delay between each slide (3 seconds)
            disableOnInteraction: false, // Continue autoplay even after interaction
            }}
            navigation={{
                nextEl: ".button-next-slide",
                prevEl: ".button-prev-slide",
            }}
            modules={[Navigation]}
        >   
            <SwiperSlide>
                <div className="image relative">
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 "></div>
                    
                    <img 
                        className="w-full h-full object-cover max-h-[30rem]" 
                        src="https://d31sro4iz4ob5n.cloudfront.net/upload/car/br-v-2023/feature/exterior/br-v-2023-rhd-style-redefined.jpg" 
                        alt="carousel" 
                    />
                    
                    <div className="space-y-5 title-content absolute top-[25%] left-[8rem] z-10">
                        <h2 className="text-[16px]">Rent Your Dream Car!</h2>
                        <h3 className="text-[50px] font-[700] text-black">All New Honda BRV</h3>
                        <p className="text-[14px] w-[40%] text-black">All New Honda BR-V adalah SUV 7-seater yang dirancang khusus untuk memenuhi kebutuhan keluarga Indonesia. Mengusung desain yang lebih modern dan kokoh, mobil ini menawarkan pengalaman berkendara yang lebih aman dan menyenangkan.</p>
                        <button className="px-[2rem] bg-primary text-[13px] p-2 text-white rounded-md hover:bg-primary-dull" onClick={scrollToCarList}>Mulai Sewa</button>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="image relative">
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10"></div>
                    
                    <img 
                        className="w-full h-full object-cover max-h-[30rem]" 
                        src="https://www.weller-automobile.de/wp-content/uploads/2312_Hyundai_IONIQ5_N_1500x1000.jpg"
                        alt="carousel" 
                    />
                    
                    <div className="space-y-5 title-content absolute top-[25%] left-[8rem] z-20">
                        <h2 className="text-[16px]">Rent Your Dream Car!</h2>
                        <h3 className="text-[50px] font-[700] text-black">Hyundai IONIQ 5 N</h3>
                        <p className="text-[14px] w-[40%] text-black">IONIQ 5 N, the brand’s first high-performance electric vehicle (EV) under the N badge, has been named ‘Performance Car of the Year’ for 2025 at the prestigious China Car of the Year (COTY) Awards.</p>
                        <button className="px-[2rem] bg-primary text-[13px] p-2 text-white rounded-md hover:bg-primary-dull" onClick={scrollToCarList}>Mulai Sewa</button>
                    </div>
                </div>
            </SwiperSlide>
            
            {/* Navigation Buttons */}
            <div className="top-[45%] absolute z-10 button-prev-slide group-hover:left-0 -left-[23rem] duration-500 text-white w-[40px] h-[40px] bg-black grid place-items-center">
                <HiOutlineArrowNarrowLeft />
            </div>
            <div className="top-[45%] absolute z-10 button-next-slide group-hover:right-0 -right-[23rem] duration-500 text-white w-[40px] h-[40px] bg-black grid place-items-center">
                <HiOutlineArrowNarrowRight />
            </div>
        </Swiper>
    </div>
    
    )
}
