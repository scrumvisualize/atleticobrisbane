import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';



const AtleticoImageSlider = () => {

    const slides = [
    
        { id: 1, src: 'images/ab-slide-1.JPG', text: 'Masters Squad' },
        { id: 2, src: 'images/ab-slider-2.JPG', text: 'Curious Crowd' },
        { id: 3, src: 'images/juniors.JPG', text: 'Our Junior Boys' },
        { id: 4, src: 'images/ab-slider-3.JPG', text: 'Mens Squad' },
        { id: 5, src: 'images/runnersup.JPG', text: 'Runners Up 2024' },
        { id: 6, src: 'images/training.jpeg', text: 'Training' },
    ];

    const [slideImages, setSlideImages ] = useState(slides);
    const sliderRef = useRef(null);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000, // Set autoplay speed to 4 seconds
    };

    useEffect(() => {
        setSlideImages(slides);
    }, []);

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
            <div className="relative w-full h-96">
                <div onClick={handleLeftArrowClick} className="absolute top-20 md:top-64 left-0 z-10">
                    <img src="images/arrow-left.PNG" className="w-12 h-12 md:w-20 md:h-20"></img>
                </div>
                <div onClick={handleRightArrowClick} className="absolute top-20 right-0 z-10 md:top-64">
                    <img src="images/arrow-right.PNG" className="w-12 h-12 md:w-20 md:h-20"></img>
                </div>
                <Slider ref={sliderRef} {...settings}>
                    {slideImages.map((item, index) => (
                        <div key={index}>
                            <img src={item.src} alt={`Slide ${index + 1}`} />
                            <section className="overlay-text rounded-lg">
                                <div className="text-center p-2 ml-[-20px]">{item.text}</div>
                            </section>
                            
                        </div>
                    ))}
                </Slider>
            </div>
            <div className="relative h-96 md:h-[490px] bg-gradient-to-br from-[#0C1324] to-[#cb6ce6] mt-[-140px] md:mt-0">
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