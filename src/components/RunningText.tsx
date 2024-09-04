import React from 'react'
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const RunningText: React.FC<{ className?: string }> = ({ className = "" }) => {
    return (
        <div className={`${className}`}>
            <Swiper
                freeMode
                spaceBetween={10}
                loop
                slidesPerView={4}
                speed={2000}
                autoplay={{
                    delay: 0,
                    disableOnInteraction: true,
                    reverseDirection: true,
                }}
                modules={[Autoplay]}
            >

                {[
                    { src: "/partners/cls.webp", alt: "image-1" },
                    { src: "/partners/cyperscope.webp", alt: "image-2" },
                    { src: "/partners/synthia.webp", alt: "image-3" },
                    { src: "/partners/certik.webp", alt: "image-4" },
                    { src: "/partners/mexc.webp", alt: "image-5" },
                ].map(({ src }, idx) => (
                    <SwiperSlide key={idx} className='text-center'>
                        <img
                            className="w-[224px] md:w-[224px]"
                            src={src}
                            alt={`Slide ${idx + 1}`}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default RunningText