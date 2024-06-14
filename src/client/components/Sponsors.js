
import React, { useState, useEffect } from 'react';
const sdata = [
    {   id: 1,
        url: "https://indusmortgages.co.nz/",
        logo: "images/indus.jpeg",
        headerText: "indus MORTGAGES",
        bodyText: "Taking your first step onto the property ladder in New ​Zealand? The First Home Loan could be a game-changer for ​you! With as little as 5% deposit, you can now own your dream ​house. It's time to transform your homeownership dreams ​into reality. email us at hello@indusmortgages.co.nz for more info.",
        category: "Mortgage Services"
    },
    {   id: 2,
        url: "https://www.pepperbite.com.au/",
        logo: "images/logo192.png",
        headerText: "Pepperbite",
        bodyText: "PepperBite is a spiced up journey from India to the great Brisbane, we are proudly boarding all the spices and food varieties from north to south and delivering a fine dining experience to all foodies.Pepper Bite have authentic and modern Indian, Bar, Function and Fine dining and it is the perfect place for you to enjoy both South and North Indian food at a feasible rate. ",
        category: "Food Industry"
    },
    {   id: 3,
        url: "https://www.loanhouselendingsolutions.com.au/",
        logo: "images/logo192.png",
        headerText: "LOAN HOUSE Lending Solutions",
        bodyText: "Loan House Lending Solution provides tailored business finance solutions to individuals and companies. Your trusted home load provider.",
        category: "Mortgage Services"
    }
]

const Sponsors = () => {

    const [sponsorData, setSponsorData ] = useState([]);

    useEffect(() => {
        setSponsorData(sdata);
    }, []);

    return (
        <div className="container mx-auto px-4">

            <div className="mb-2 bg-cover bg-center bg-no-repeat h-[230px] md:h-[360px] lg:h-128" style={{ backgroundImage: "url('images/sponsor.png')" }}>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {
                    sponsorData.map((item, index) => (
                        <a key={item.id} href={item.url}>
                            <div className="bg-[#f7f9fa] p-4 rounded-lg">
                            <img src={item.logo} alt="Sponsor 2 Logo" className="w-40 h-30 mx-auto mb-4 rounded-full" />
                            <hr className="my-4 border-t-2 border-[#e1ecf7]" />
                            <h3 className="text-base text-[#b778d6] font-semibold justify-center pb-2">{item.headerText}</h3>
                            <p className="mb-4 text-sm text-[#3c3e40]">{item.bodyText}</p>
                            <hr className="my-4 border-t-2 border-[#e1ecf7]" />
                            <div>
                                <h3 className="text-sm font-semibold text-center">{item.category}</h3>
                            </div>
                        </div>
                        </a>
                        
                    ))
                }
            </div>
        </div>

    );
};

export default Sponsors;