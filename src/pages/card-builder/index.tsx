import React from 'react';
import { Navigate } from 'react-router-dom';

const CardBuilderPage: React.FC = () => {
  return <Navigate to="/tech-card-builder" replace />;
};

export default CardBuilderPage; 