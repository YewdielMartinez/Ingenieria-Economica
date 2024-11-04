// CalculateButton.tsx
import React from 'react';
import CalculateIcon from '@mui/icons-material/Calculate'; // Icono de calcular
import styled from 'styled-components';

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3em;
  width: 130px;
  background-color: #a93226; /* Color específico */
  border-radius: 3px;
  color: white;
  font-size: 1rem;
  letter-spacing: 1px;
  transition: all 0.2s linear;
  cursor: pointer;
  border: none;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 9px 9px 33px rgba(209, 209, 209, 0.5), -9px -9px 33px rgba(255, 255, 255, 0.5);
    transform: translateY(-2px);
  }

  svg {
    margin-right: 5px;
    font-size: 20px;
    transition: all 0.4s ease-in;
  }

  &:hover > svg {
    font-size: 1.2em;
    transform: translateX(-3px);
  }
`;

const CalculateButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <StyledButton onClick={onClick}>
      <CalculateIcon />
      Calcular
    </StyledButton>
  );
};

export default CalculateButton;
