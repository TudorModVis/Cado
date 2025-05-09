'use client'

import React, { useEffect, useRef, useState } from 'react'
import BlogCard from './BlogCard'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';
import BlogTitle from './BlogTitle';
import { trpc } from '@/app/_trpc/client';
import { useLocale } from 'next-intl';

export default function BlogCarousel() {
    const {data, isLoading} = trpc.blog.getLimitedBlogs.useQuery({limit: 6});
    const swiperRef = useRef<SwiperRef>(null);
    const locale = useLocale();
    const [slidesPerView, setSlidesPerView] = useState(2); // Default to mobile view
    
    const updateSlidesPerView = () => {
        setSlidesPerView(window.innerWidth >= 1024 ? 4 : 2);
    };

    useEffect(() => {
        // Set initial value
        updateSlidesPerView();
        
        // Add resize listener
        window.addEventListener('resize', updateSlidesPerView);
        
        // Clean up
        return () => {
            window.removeEventListener('resize', updateSlidesPerView);
        };
    }, []);
 
    const goToNextSlide = () => {
        swiperRef.current?.swiper.slideNext();
    };

    const goToPreviousSlide = () => {
        swiperRef.current?.swiper.slidePrev();
    };

    return (
        <>
            <BlogTitle goToNextSlide={goToNextSlide} goToPreviousSlide={goToPreviousSlide}/>
            <div className='col-span-8 lg:col-span-15 -mr-4 lg:-mr-16 overflow-hidden mb-24 lg:mb-42'>
                <div className='-mr-12 lg:-mr-18 rounded-tl-2xl mt-8'>
                    <Swiper
                        modules={[Autoplay]}
                        autoplay={{
                            delay: 5000,
                        }}
                        ref={swiperRef}
                        slidesPerView={slidesPerView}
                        loop={true}
                        className="h-auto"
                        speed={400}
                        style={{
                            "--swiper-transition-timing-function": "cubic-bezier(0.65, 0, 0.35, 1)"
                        } as React.CSSProperties}
                    >
                        {
                            isLoading || !data?.blogs ? 
                            <></> :
                            <>
                                {data.blogs.map((blog, index) => (
                                    <SwiperSlide key={index} className='pr-2 lg:pr-6 mb-1'>
                                        <BlogCard 
                                            id={blog._id} 
                                            src={blog.image} 
                                            tag={blog.tag} 
                                            title={blog.title[locale]} 
                                        />
                                    </SwiperSlide>
                                ))}
                            </>
                        }
                    </Swiper>
                </div>
            </div>
        </>
    );
}