import React, { useState, useEffect } from 'react';
import Footer from './Footer';
const pdfUrl = "images/atletico-memership-form.pdf";

const Contact = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // scroll to top when the component is mounted
        window.scrollTo(0, 0);
      }, []);

    const toggleCollapse = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div>
            <div className="mb-2 bg-cover bg-center bg-no-repeat h-[120px] md:h-[145px] lg:h-128" style={{ backgroundImage: "url('images/contact.png')", backgroundPosition: 'center 84%' }}>
            </div>
            <div className="text-center font-semibold text-xs">
                <h3>Home &#8594; Contact </h3>
            </div>
            <div className="flex flex-col md:flex-row max-w-6xl mx-auto px-4 md:px-6 py-8">
                <div className="md:w-1/2 md:pr-4">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Club Joining & Membership Enquiries</h2>
                    <p className="text-base text-gray-700 mb-4">For club joining and membership-related queries, please contact us at:</p>
                    <p className="text-base text-[#337ab7] mb-4 font-semibold">atleticobne@gmail.com</p>
                    <div className="container mx-auto p-0">
                        <p className="text-base text-gray-700 mb-4">Please download, fill the membership form and email back to us:</p>
                        <div className="border rounded-md shadow-md mb-4">
                            <div
                                className="bg-blue-500 text-white px-4 py-3 cursor-pointer flex justify-between items-center"
                                onClick={toggleCollapse}
                            >
                                <h2 className="text-lg font-semibold">Membership Form</h2>
                                <svg
                                    className={`w-6 h-6 transition-transform transform ${isOpen ? 'rotate-180' : ''}`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d={isOpen ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'}
                                    />
                                </svg>
                            </div>
                            {isOpen && (
                                <div className="p-4">
                                    <div className="w-full" style={{ height: 'calc(100vh - 200px)' }}>
                                        <iframe
                                            title="PDF Viewer"
                                            className="w-full h-full"
                                            src={pdfUrl}
                                            frameBorder="0"
                                            allowFullScreen
                                            style={{ minHeight: '400px' }}
                                        ></iframe>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Sponsorship Matters</h2>
                    <p className="text-base text-gray-700 mb-4">For sponsorship matters, please reach out to below email:</p>
                    <p className="text-base text-[#337ab7] mb-4 font-semibold">atleticobne@gmail.com</p>

                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Working Days and Time</h2>
                    <p className="text-base text-gray-700 mb-4">Monday to Saturday</p>
                    <p className="text-base text-gray-700 mb-4">9:00 AM to 5:00 PM</p>
                </div>

                <div className="md:w-1/2 md:pl-4">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
                    <p className="text-base text-gray-700 mb-4">Please reach us in below numbers, preferably send us a text message.</p>
                    <div className="md:w-1/2 md:pl-4">
                        <div className="grid gap-4">
                            <div className="text-gray-700 flex items-center space-x-2">
                                <span className="text-xl font-semibold">Arun :</span>
                                <a href="tel:+0431533623" className="flex items-center space-x-1 hover:underline">
                                    <img src="images/call-50.png" className="h-6 w-6 text-gray-500" />
                                    <span className="font-semibold">&#8594; 0431533623</span>
                                </a>
                            </div>
                            <div className="text-gray-700 flex items-center space-x-2">
                                <span className="text-xl font-semibold">Saju :</span>
                                <a href="tel:+0451145007" className="flex items-center space-x-1 hover:underline">
                                    <img src="images/call-50.png" className="h-6 w-6 text-gray-500 ml-2" />
                                    <span className="font-semibold"> &#8594; 0451145007</span>
                                </a>
                            </div>
                            <div className="text-gray-700 flex items-center space-x-2">
                                <span className=" text-xl font-semibold">Clitus :</span>
                                <a href="tel:+0421936406" className="flex items-center space-x-1 hover:underline">
                                    <img src="images/call-50.png" className="h-6 w-6 text-gray-500" />
                                    <span className="font-semibold">&#8594; 0421936406</span>
                                </a>
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Contact;