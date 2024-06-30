import React from 'react';
import MainNavbar from './MainNavbar';
import Footer from './Footer';

const Contact = () => {
    return (
        <div>
            <MainNavbar />
            <div className="mb-2 bg-cover bg-center bg-no-repeat h-[130px] md:h-[200px] lg:h-128" style={{ backgroundImage: "url('images/contact.png')" }}>
            </div>
            <div className="text-center font-semibold text-xs">
                <h3>Home &#8594; Contact </h3>
            </div>
            <div className="flex flex-col md:flex-row max-w-6xl mx-auto px-4 md:px-6 py-8">
                <div className="md:w-1/2 md:pr-4">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Club Joining & Membership Enquiries</h2>
                    <p className="text-base text-gray-700 mb-4">For club joining and membership-related queries, please contact us at:</p>
                    <p className="text-base text-gray-700 mb-4 font-semibold">secretary@atletico.com.au</p>

                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Sponsorship Matters</h2>
                    <p className="text-base text-gray-700 mb-4">For sponsorship matters, please reach out to below email:</p>
                    <p className="text-base text-gray-700 mb-4 font-semibold">secretary@atletico.com.au</p>

                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Working Days and Time</h2>
                    <p className="text-base text-gray-700 mb-4">Monday to Saturday</p>
                    <p className="text-base text-gray-700 mb-4">9:00 AM to 7:00 PM</p>
                </div>

                <div className="md:w-1/2 md:pl-4">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input type="text" id="name" name="name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" id="email" name="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" />
                        </div>

                        <div>
                            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile</label>
                            <input type="tel" id="mobile" name="mobile" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                            <textarea id="message" name="message" rows="4" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"></textarea>
                        </div>

                        <button type="submit" className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">Submit</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Contact;