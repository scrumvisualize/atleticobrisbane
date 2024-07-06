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
    <div className="bg-cover bg-center bg-no-repeat h-[130px] md:h-[450px] lg:h-128 relative" style={{ backgroundImage: "url('images/abbanner.png')" }}>
      <button
        onClick={registerDialog}
        className="hidden md:block absolute left-64 top-[290px] px-4 py-2 bg-[#d41743] text-white font-semibold border border-2 border-white rounded-full shadow"
      >
        Register
      </button>
      <button
        onClick={registerDialog}
        className="md:hidden absolute top-20 w-20 left-12 px-2 py-0 bg-[#d41743] text-[14px] text-white font-semibold border border-2 border-white rounded-full shadow"
      >
        Register
      </button>
      {showDialog && <RegisterDialog openDialog={showDialog} onClose={closeDialog} />}
    </div>
  );
};

export default Banner;