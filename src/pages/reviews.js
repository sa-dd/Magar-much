import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import { Carousel } from 'react-responsive-carousel';


export async function getServerSideProps() {

    const userRequest = await fetch('http://localhost:8080/api/getreviews');
    const userData = await userRequest.json();
    return {
        props: {
            items: userData,
        }
    };

}




export default function Review(props) {

    const [reviews, setReviews] = useState(props.items);

    useEffect(()=> {
        console.log(reviews);
    }, [reviews]);

    return (
            <Carousel axis='horizontal' interval= {1000} showIndicators={false} showArrows={false} showThumbs={false} > 
                <div className='review' key='slide1'> text 1 </div> 
                <div className='review' key='slide2'> text 2 </div> 
                <div className='review' key='slide3'> text 3 </div> 
    </Carousel>
    )
}
