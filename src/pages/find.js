import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Nav from './navC';
import { red } from '@mui/material/colors';

const AreaCodeContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '1rem',
  boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
  borderRadius: '10px',
  backgroundColor: 'red',
  color: 'white',
});

const AreaCodeHeading = styled(Typography)({
  marginBottom: '2rem',
  fontWeight: 'bold',
});

const AreaCode = styled(Typography)({
  marginBottom: '1rem',
  fontWeight: 'bold',
});

export async function getServerSideProps() {
  const areaCodesRequest = await fetch('http://localhost:8080/api/areacodes');
  const areaCodesData = await areaCodesRequest.json();
  const genericText = 'Welcome to our website! We offer a wide range of products and services to meet all your needs. Our team of experts is always here to assist you with any questions or concerns you may have. Please feel free to browse our website and contact us with any inquiries.';

  return {
    props: {
      areaCodes: areaCodesData,
      genericText: genericText,
      additionalData: [
        {id: 1, name: 'Product 1', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel eleifend nisi.'},
        {id: 2, name: 'Product 2', description: 'Pellentesque mattis malesuada tincidunt. Integer nec turpis at lectus commodo facilisis.'},
        {id: 3, name: 'Product 3', description: 'Sed id volutpat ex, at efficitur mauris. Vivamus tristique, mauris eget malesuada lobortis.'},
      ]
    },
  };
}

export default function FindUs({ areaCodes, genericText, additionalData }) {
  return (
    <Container maxWidth="lg">
        <Nav />
      <Box mt={5}>
        <Typography variant="h2" align="center" bgcolor="Red">
          We are Delighted to Serve You!
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          {genericText}
        </Typography>
        <AreaCodeContainer>
          <AreaCodeHeading variant="h4" align="center">
            Delivery Areas
          </AreaCodeHeading>
        </AreaCodeContainer>
        {areaCodes.map((areaCode) => (
          <AreaCodeContainer key={areaCode.ID}>
            <AreaCode variant="subtitle1">
              {areaCode.Code}
            </AreaCode>
          </AreaCodeContainer>
        ))}
        <AreaCodeContainer>
          <AreaCodeHeading variant="h4" align="center">
            Our values
          </AreaCodeHeading>
        </AreaCodeContainer>
        {additionalData.map((product) => (
          <AreaCodeContainer key={product.id}>
            <AreaCode variant="subtitle1">
              {product.name}
            </AreaCode>
            <Typography variant="body1" align="center">
              {product.description}
            </Typography>
          </AreaCodeContainer>
        ))}
      </Box>
    </Container>
  );
}
