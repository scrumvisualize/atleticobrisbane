import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const InactivityLogout = ({ setAuthenticated }) => {
  const [inactiveTime, setInactiveTime] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const navigate = useNavigate();
  const timerRef = useRef(null);
  const countdownRef = useRef(null);

  const resetTimer = () => {
    clearTimeout(timerRef.current);
    clearInterval(countdownRef.current);
    setInactiveTime(0);
    setShowDialog(false);
    setCountdown(10);
  };

  useEffect(() => {
    const handleActivity = () => {
      resetTimer();
      timerRef.current = setTimeout(() => {
        setShowDialog(true);
        countdownRef.current = setInterval(() => {
          setCountdown(prev => {
            if (prev <= 1) {
              clearInterval(countdownRef.current);
              handleLogout();
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }, 180000); // 3 minute
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);

    handleActivity(); // Initialize the timer on mount

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      clearTimeout(timerRef.current);
      clearInterval(countdownRef.current);
    };
  }, []);

  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem('loginEmail');
    localStorage.removeItem('displayName');
    window.location.reload(true);
    navigate('/login');
  };

  return (
    <>
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <p>You have been inactive for a while. You will be logged out in <p className='text-2xl text-[#4079f5] font-semibold'> {countdown} </p>seconds.</p>
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
              onClick={resetTimer}
            >
              Stay Logged In
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default InactivityLogout;
