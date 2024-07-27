import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
    { src: 'images/cba1.png' },
    { src: 'images/council2.png' },
    { src: 'images/eagles1.png' },
];

const Courtesy = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
              breakpoint: 768, // Adjust based on your desired breakpoint for mobile
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              }
            }
          ]
    };

    return (
        <div className="flex flex-col justify-center items-center bg-gradient-to-r from-blue-100 to-pink-100">
            <h1 className="text-3xl font-semibold mb-4 text-center text-gradient">
                Special Thanks To Our Supporters
            </h1>
            <div className="w-96 h-48 mb-8 p-0">
                <Slider {...settings}>
                    {images.map((image, index) => (
                        <div key={index} className="flex justify-center items-center">
                            <img
                                src={image.src}
                                alt={`Slide ${index}`}
                                className="w-full h-full object-contain border-4 border-gray-300 rounded-lg"
                                style={{ height: '200px', width: '400px' }}
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default Courtesy;