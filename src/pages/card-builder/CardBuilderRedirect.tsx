import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CardBuilderRedirect: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/tech-card-builder', { replace: true });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <p className="text-white text-xl">Redirecting to the new Tech Card Builder...</p>
    </div>
  );
};

export default CardBuilderRedirect; 