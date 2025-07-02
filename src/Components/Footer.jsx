import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import './footer.css'

export default function Copyright() {
  return (
    <Typography className='footer'
      variant="body2"
      align="center"
      sx={{
        color: 'text.secondary',
      }}
    >
      <p> Copyright © </p>
      <Link color="inherit" href="https://atlanticoavanti.ensinio.com/g/capacita-logica-de-programacao-c2/about">
        SaborTech
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}