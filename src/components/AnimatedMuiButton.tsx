import React from 'react';
import { Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

interface AnimatedMuiButtonProps {
  onClick: () => void;
}

// Botón personalizado usando styled de Material UI
const AnimatedButton = styled(Button)(() => ({
  position: 'relative',
  width: '200px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  border: '1px solid #34974d',
  backgroundColor: '#3aa856',
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'all 0.3s',
  color: '#fff',
  fontWeight: 600,
  '&:hover': {
    backgroundColor: '#34974d',
  },
  '&:active': {
    backgroundColor: '#2e8644',
    border: '1px solid #2e8644',
  },
}));

const ButtonText = styled(Box)({
  transition: 'all 0.3s',
  transform: 'translateX(0px)',
  justifyContent:'center',
  fontSize: '14px'

});

const ButtonIconContainer = styled(Box)({
  position: 'absolute',
  right: '0',
  height: '100%',
  width: '39px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#34974d',
  transition: 'all 0.3s',
});

const AnimatedMuiButton: React.FC<AnimatedMuiButtonProps> = ({ onClick }) => {
  return (
    <AnimatedButton
      onClick={onClick}
      onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.querySelectorAll('.MuiBox-root')[0]?.setAttribute('style', 'color: transparent');
        e.currentTarget.querySelectorAll('.MuiBox-root')[1]?.setAttribute('style', 'transform: translateX(0); width: 100%;');
      }}
      onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.querySelectorAll('.MuiBox-root')[0]?.setAttribute('style', 'color: #fff');
        e.currentTarget.querySelectorAll('.MuiBox-root')[1]?.setAttribute('style', 'transform: translateX(109px); width: 39px;');
      }}
      startIcon={<AddCircleOutlineIcon />}
    >
      <ButtonText>Agregar Flujo de Efectivo</ButtonText>
      <ButtonIconContainer className="button__icon">
        <AddCircleOutlineIcon style={{ color: '#fff', fontSize: '16px' }} />
      </ButtonIconContainer>
    </AnimatedButton>
  );
};

export default AnimatedMuiButton;
