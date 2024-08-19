import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';



const AtleticoImageSlider = () => {

    const slides = [

        { id: 1, src: 'images/ab-slide-1.JPG', text: 'Masters Squad' },
        { id: 2, src: 'images/ab-slider-3.JPG', text: 'Mens Squad' },
        { id: 3, src: 'images/menswinning.png', text: 'Well Done Boys' },
        { id: 4, src: 'images/mensrand.png', text: 'Third Place' },
        { id: 5, src: 'images/juniors.JPG', text: 'Our Junior Boys' },
        { id: 6, src: 'images/Sydney.jpeg', text: 'At Sydney' },
        { id: 7, src: 'images/runnersup.JPG', text: 'Runners Up 2024' },
        { id: 8, src: 'images/ab-slider-2.JPG', text: 'Curious Crowd' },
        { id: 9, src: 'images/training.jpeg', text: 'Training' },
    ];

    const [loading, setLoading] = useState(true);
    const [slideImages, setSlideImages] = useState(slides);
    const sliderRef = useRef(null);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000, // Set autoplay speed to 4 seconds
    };

    const handleImageLoad = () => {
        setLoading(false);
    };

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, [slideImages]);

    const handleLeftArrowClick = () => {
        if (sliderRef.current) {
            sliderRef.current.slickPrev();
        }
    };

    const handleRightArrowClick = () => {
        if (sliderRef.current) {
            sliderRef.current.slickNext();
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 md:ml-0 gap-2 mt-2">
            <div className="relative w-full h-80">
                {
                    loading && (
                        <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-75 z-30">
                            <div className="flex justify-center items-center">
                                <div className="w-16 h-16 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        </div>
                    )}
                <div onClick={handleLeftArrowClick} className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10 cursor-pointer mt-2 md:mt-20">
                    <img src="images/arrow-left.png" className="w-8 h-8 md:w-20 md:h-20"></img>
                </div>
                <div onClick={handleRightArrowClick} className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10 cursor-pointer mt-1 md:mt-20">
                    <img src="images/arrow-right.png" className="w-8 h-8 md:w-20 md:h-20"></img>
                </div>
                <Slider ref={sliderRef} {...settings}>
                    {slideImages.map((item, index) => (
                        <div key={index} className="w-full h-full">
                            <img
                                src={item.src}
                                alt={`Slide ${index + 1}`}
                                onLoad={handleImageLoad}
                                className="w-full h-full object-cover rounded"
                            />
                            {/* <div className="absolute overlay-text rounded-lg mt-4 md:mt-2 py-[10px]">
                                <div className="w-full h-full flex items-center justify-center">
                                    <div className="absolute inset-x-0 bottom-0 mb-2 md:mb-0 md:relative md:bottom-auto text-base text-center p-2 ml-[-20px]">
                                        {item.text}
                                    </div>
                                </div>
                            </div> */}
                            <div className="relative h-10 rounded-lg mt-2 md:mt-2">
                                <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-r from-blue-500 to-purple-500 overlay-text rounded-lg flex items-center justify-center">
                                    <div className="absolute inset-x-0 bottom-[4px] h-[calc(100%-4px)] flex items-center justify-center">
                                        <p className="text-center text-sm sm:text-base md:text-lg lg:text-xl px-2 line-clamp-2">
                                            {item.text}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
            <div className="relative h-96 md:h-[498px] bg-gradient-to-br from-[#0C1324] to-[#cb6ce6] mt-[-50px] sm:mt-[-48px] md:mt-0 rounded">
                <div className="ml-8 mt-10">
                    <h1 className="text-[#f0184a] text-xl">Ipswich Arena</h1>
                </div>
                <div className="ml-8 mt-10">
                    <h1 className="text-white text-3xl">IMA tournament 2024: All Australia 7's soccer</h1>
                </div>
                <div className="ml-8 mt-10">
                    <svg width="150" height="50" className="transition-transform transform hover:scale-110">
                        <line x1="0" y1="15" x2="120" y2="15" stroke="#f0184a" strokeWidth="2" />
                        <polygon points="120,10 140,15 120,20" fill="#f0184a" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default AtleticoImageSlider;