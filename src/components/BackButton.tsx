// BackButton.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Icono de flecha hacia atrás
import styled from 'styled-components';

const StyledButton = styled.button`
  display: flex;
  height: 3em;
  width: 100px;
  align-items: center;
  justify-content: center;
  background-color: #eeeeee4b;
  border-radius: 3px;
  letter-spacing: 1px;
  transition: all 0.2s linear;
  cursor: pointer;
  border: none;
  background: #fff;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 9px 9px 33px #d1d1d1, -9px -9px 33px #ffffff;
    transform: translateY(-2px);
  }

  svg {
    margin-right: 5px;
    margin-left: 5px;
    font-size: 20px;
    transition: all 0.4s ease-in;
  }

  &:hover > svg {
    font-size: 1.2em;
    transform: translateX(-5px);
  }
`;

const BackButton: React.FC = () => {
  const navigate = useNavigate();
  return (
    <StyledButton onClick={() => navigate('/')}>
      <ArrowBackIcon />
      Inicio
    </StyledButton>
  );
};

export default BackButton;