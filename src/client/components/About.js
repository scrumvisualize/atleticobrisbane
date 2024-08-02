import React from 'react';
import Footer from "./Footer";

const About = () => {
    return (
        <div className="bg-gray-100 text-gray-900 bg-gradient-to-r from-blue-100 to-pink-100">
            <div className="mb-2 bg-cover bg-center bg-no-repeat h-[120px] md:h-[150px] lg:h-128" style={{ backgroundImage: "url('images/aboutus.png')", backgroundPosition: 'center 80%' }}>
            </div>
            <div className="text-center font-semibold text-xs">
                <h3>Home &#8594; About </h3>
            </div>
            <div className="my-5 text-center"><p className="text-2xl text-red-500">A brief introduction on Atlético Brisbane Soccer Club</p></div>
            <div className="container mx-auto my-5 px-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <p className="text-[14px] text-[#3c3e40] leading-relaxed">
                            <span className='font-semibold'>Atlético Brisbane </span>(formerly known as Southside Soccer Studs Inc ABN: 14 184 396 442) is a welcoming soccer club formed by the Malayali community. Since its establishment in 2018 and official registration in 2020, the club has brought together soccer enthusiasts of all ages in Brisbane. Our club's mantra, "Aspire, Aim, Achieve," reflects our commitment to excellence, resilience, dedication, and passion for the sport.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <p className="text-[14px] text-[#3c3e40] leading-relaxed">
                            Our journey has been supported and driven by key founders including <span className='font-semibold'>Prince Anand, Joji, Jibi, Sibin, Saljo and Jibu.</span> We are also grateful to <span className='font-semibold'>Bhowmic, Ajay, Varghese Vadakkan, Noby, Robin, and Jo Paul,</span>  who have been our proud supporters from the beginning.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <p className="text-[14px] text-[#3c3e40] leading-relaxed">
                            Atlético Brisbane actively participates in major soccer 7's tournaments across Australia, consistently striving for excellence. In 2024, our dedication was rewarded when our team secured the runner-up trophy in the above 40 category. In the same year, our open age boys proudly claimed third place in the prestigious Kairali tournament.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <p className="text-[14px] text-[#3c3e40] leading-relaxed">
                            We invite you to join us in this exciting journey, as we continue to grow, compete, and celebrate the beautiful game of soccer. <span className='font-semibold'>Related info :</span> We bank with <span className='font-semibold'>Commonwealth Bank</span>, Acacia Ridge Branch BSB: 064 159 Acc no: 1047 1551
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <p className="text-[14px] text-[#3c3e40] leading-relaxed">
                            Our heartfelt gratitude is also extended to our wider Malayali community and all internal and external stakeholders for their continuous support.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <p className="text-[14px] text-[#3c3e40] italic leading-relaxed">
                        <span className='font-semibold'>Please note: </span> The legal name change is in process and expected to be approved soon.
                        </p>
                    </div>
                </div>
            </div>
            <div className="container mx-auto my-10 px-5">
                <h1 className="text-3xl font-bold text-center mb-8">Committee 2024</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    <div className="bg-white p-5 rounded-lg shadow-lg text-center">
                        <img src="images/profilePhoto-1721355636391.png" alt="Person 1" className="w-[130px] h-[130px] mx-auto rounded-full border-2 border-[#2f73fa] mb-4" />
                        <h2 className="text-xl font-semibold">Arun Kalluparambil</h2>
                        <h3 className="text-[12px] font-semibold text-gray-600">President</h3>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-lg text-center">
                        <img src="images/profilePhoto-1720012131829.png" alt="Person 2" className="w-[130px] h-[130px] mx-auto rounded-full border-2 border-[#2f73fa] mb-4" />
                        <h2 className="text-xl font-semibold">Joji James</h2>
                        <p className="text-[12px] font-semibold text-gray-600">Vice President</p>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-lg text-center">
                        <img src="images/profilePhoto-1719710686554.jpeg" alt="Person 3" className="w-28 mx-auto rounded-full border-2 border-[#2f73fa] mb-4" />
                        <h2 className="text-xl font-semibold">Saju Varghese</h2>
                        <p className="text-[12px] font-semibold text-gray-600">Secretary</p>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-lg text-center">
                        <img src="images/profilePhoto-1719717154481.jpeg" alt="Person 4" className="w-28 mx-auto rounded-full border-2 border-[#2f73fa] mb-4" />
                        <h2 className="text-xl font-semibold">Vinod Mathew</h2>
                        <p className="text-[12px] font-semibold text-gray-600">Jt. Secretary</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-4 md:mt-4">
                    <div className="bg-white p-5 rounded-lg shadow-lg text-center">
                        <img src="https://via.placeholder.com/150" alt="Person 1" className="mx-auto rounded-full mb-4" />
                        <h2 className="text-xl font-semibold">Clitus</h2>
                        <p className="text-[12px] font-semibold text-gray-600">Treasurer</p>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-lg text-center">
                        <img src="images/rajesh.png" alt="Person 2" className="w-32 h-32 mx-auto rounded-full border-2 border-[#2f73fa] mb-4" />
                        <h2 className="text-xl font-semibold">Rajesh</h2>
                        <p className="text-[12px] font-semibold text-gray-600">Jt. Treasurer</p>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-lg text-center">
                        <img src="https://via.placeholder.com/150" alt="Person 3" className="mx-auto rounded-full mb-4" />
                        <h2 className="text-xl font-semibold">Paul</h2>
                        <p className="text-[12px] font-semibold text-gray-600">Committee Member</p>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-lg text-center">
                        <img src="https://via.placeholder.com/150" alt="Person 4" className="mx-auto rounded-full mb-4" />
                        <h2 className="text-xl font-semibold">Jimmy</h2>
                        <p className="text-[12px] font-semibold text-gray-600">PRO</p>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default About;