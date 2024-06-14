import React, { useState } from 'react';
import RegisterDialog from './RegisterDialog';

const Banner = () => {
  const [showDialog, setShowDialog] = useState(false);


  const registerDialog = () => {
    setShowDialog(true);
  }

  const closeDialog = () => {
    setShowDialog(false);
  };

  return (
    <div className="bg-cover bg-center bg-no-repeat h-[130px] md:h-[450px] lg:h-128" style={{ backgroundImage: "url('images/abbanner.png')" }}>
      <button onClick={registerDialog} className="hidden md:block relative top-[290px] left-64 md:bottom-12 md:right-12 lg:bottom-16 lg:right-16 px-4 py-2 bg-[#d41743] text-white font-semibold border border-white rounded-full shadow">Register</button>
      <button className="md:hidden relative h-6 w-12 text-[9px] top-[72px] left-10 md:bottom-14 md:right-12 lg:bottom-16 lg:right-16 px-2 py-0 bg-[#d41743] text-white font-semibold border border-white rounded-full shadow">Register</button>
      {showDialog && <RegisterDialog openDialog={showDialog} onClose={closeDialog} />}
    </div>
  );
};

export default Banner;