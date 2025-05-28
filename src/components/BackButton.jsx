import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)} // navigate back
      className="fixed top-4 left-4 bg-black text-white px-4 py-2 rounded shadow hover:bg-black transition z-50"
      style={{ backgroundColor: 'black' }} // ensure full black bg
    >
      ← Back
    </button>
  );
};

export default BackButton;
