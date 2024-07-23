import React from 'react';
import Footer from "./Footer";

const About = () => {
    return (
        <div className="bg-gray-100 text-gray-900">
            <div className="mb-2 bg-cover bg-center bg-no-repeat h-[120px] md:h-[145px] lg:h-128" style={{ backgroundImage: "url('images/about.png')" }}>
            </div>
            <div className="text-center font-semibold text-xs">
                <h3>Home &#8594; About </h3>
            </div>
            <div className="my-5 text-center"><p className="text-2xl text-red-500">Founders of Altletico Brisbane Soccer Club </p></div>

            <div className="container mx-auto my-5 px-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <p className='text-[#3c3e40]'>Atlético Brisbane is a welcoming soccer club formed by the Malayali community, bringing together soccer enthusiasts of all ages in Brisbane since its establishment in 2018 and official registration in 2020. Our club's mantra, "Aspire, Aim, Achieve," reflects our commitment to excellence, resilience, dedication, and passion for the sport.</p>
                    <p className='text-[#3c3e40]'>Our journey has been supported and driven by key founders including Prince Anand, Saljo, Jibu, Joji, Jibi, and Sibin. We are also grateful to Bhowmic, Ajay, Noby, Robin, and Joe Paul, who have been our proud supporters from the beginning</p>
                    <p className='text-[#3c3e40]'>Atlético Brisbane actively participates in major soccer 7's tournaments across Australia, consistently striving for excellence. In 2024, our dedication was rewarded when our team secured the runner-up trophy in the above 40 category. In the same year, our open age boys proudly claimed third place in prestigious Kairali tournament.</p>
                    <p className='text-[#3c3e40]'> We invite you to join us in this exciting journey, as we continue to grow, compete, and celebrate the beautiful game of soccer.</p>
                </div>
            </div>
            <div className="container mx-auto my-10 px-5">
                <h1 className="text-3xl font-bold text-center mb-8">Committee 2024</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    <div className="bg-white p-5 rounded-lg shadow-lg text-center">
                        <img src="images/profilePhoto-1721355636391.png" alt="Person 1" className="w-[130px] h-[130px] mx-auto rounded-full border-2 border-[#2f73fa] mb-4" />
                        <h2 className="text-xl font-semibold">Arun Kalluparambil</h2>
                        <h3 className="text-gray-600">President</h3>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-lg text-center">
                        <img src="images/profilePhoto-1720012131829.png" alt="Person 2" className="w-[130px] h-[130px] mx-auto rounded-full border-2 border-[#2f73fa] mb-4" />
                        <h2 className="text-xl font-semibold">Joji James</h2>
                        <p className="text-gray-600">Vice President</p>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-lg text-center">
                        <img src="images/profilePhoto-1719710686554.jpeg" alt="Person 3" className="w-28 mx-auto rounded-full border-2 border-[#2f73fa] mb-4" />
                        <h2 className="text-xl font-semibold">Saju Varghese</h2>
                        <p className="text-gray-600">Secretary</p>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-lg text-center">
                        <img src="images/profilePhoto-1719717154481.jpeg" alt="Person 4" className="w-28 mx-auto rounded-full border-2 border-[#2f73fa] mb-4" />
                        <h2 className="text-xl font-semibold">Vinod Mathew</h2>
                        <p className="text-gray-600">Joint Secretary</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-4 md:mt-4">
                    <div className="bg-white p-5 rounded-lg shadow-lg text-center">
                        <img src="https://via.placeholder.com/150" alt="Person 1" className="mx-auto rounded-full mb-4" />
                        <h2 className="text-xl font-semibold">Clitus</h2>
                        <p className="text-gray-600">Treasurer</p>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-lg text-center">
                        <img src="https://via.placeholder.com/150" alt="Person 2" className="mx-auto rounded-full mb-4" />
                        <h2 className="text-xl font-semibold">Rajesh</h2>
                        <p className="text-gray-600">Jt. Treasurer</p>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-lg text-center">
                        <img src="https://via.placeholder.com/150" alt="Person 3" className="mx-auto rounded-full mb-4" />
                        <h2 className="text-xl font-semibold">Paul</h2>
                        <p className="text-gray-600">Committe Member</p>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-lg text-center">
                        <img src="https://via.placeholder.com/150" alt="Person 4" className="mx-auto rounded-full mb-4" />
                        <h2 className="text-xl font-semibold">Jimmy</h2>
                        <p className="text-gray-600">Committe Member</p>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default About;