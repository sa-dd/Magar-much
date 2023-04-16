import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';

const ReviewContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1rem',
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
});

const ReviewHeading = styled(Typography)({
    marginBottom: '2rem',
    fontWeight: 'bold',
});

const ReviewAuthor = styled(Typography)({
    marginBottom: '0.5rem',
    fontWeight: 'bold',
});

const ReviewDate = styled(Typography)({
    marginBottom: '1rem',
    color: 'gray',
});

const ReviewComment = styled(Typography)({
    marginTop: '1rem',
});

export async function getServerSideProps() {
    const reviewsRequest = await fetch('http://localhost:8080/api/getreviews');
    const reviewsData = await reviewsRequest.json();
    return {
        props: {
            reviews: reviewsData,
        },
    };
}

export default function Review({ reviews }) {
    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
        const ratings = reviews.map((review) => review.Rating);
        const total = ratings.reduce((acc, cur) => acc + cur, 0);
        const average = total / ratings.length;
        setAverageRating(average);
    }, [reviews]);

    return (
        <Container maxWidth="lg">
            <ReviewContainer>
                <ReviewHeading variant="h4" align="center">
                    Reviews
                </ReviewHeading>
                <Typography variant="subtitle1" align="center">
                    Average Rating: {averageRating.toFixed(1)}
                </Typography>
            </ReviewContainer>
            {reviews.map((review) => (
                <ReviewContainer key={review.ID}>
                    <ReviewAuthor variant="subtitle1">
                        {review.Name}
                    </ReviewAuthor>
                    <Rating value={review.Rating} readOnly />
                    <ReviewDate variant="body1">
                        {new Date(review.ReviewDate).toLocaleDateString()}
                    </ReviewDate>
                    <ReviewComment variant="body1">
                        {review.Comment}
                    </ReviewComment>
                </ReviewContainer>
            ))}
        </Container>
    );
}