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
        slidesToShow: 1,
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
        <div className="bg-gradient-to-r from-blue-100 to-pink-100 py-4 px-2">
            <div className="max-w-[800px] mx-auto mb-4">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-center text-gradient">
                    Sincere Thanks To Our Great Supporters
                </h1>
                <div className="w-full max-w-[800px] aspect-[2/1] mt-2">
                    <Slider {...settings}>
                        {images.map((image, index) => (
                            <div key={index} className="flex justify-center items-center">
                                <img
                                    src={image.src}
                                    alt={`Slide ${index}`}
                                    className="w-full h-[400px] object-contain border-4 border-gray-300 rounded-lg"
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default Courtesy;