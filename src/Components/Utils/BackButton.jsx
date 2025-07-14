import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation } from 'react-router-dom';

import './style.css';

export default function BackButton() {
  const location = useLocation();

  const showBackButton = ['/cardapio', '/add', '/editar'].includes(location.pathname);

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    showBackButton && (
      <button className="back-button" onClick={handleGoBack}>
        <FaArrowLeft />
      </button>
    )
  );
}