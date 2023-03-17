import Container from '@mui/material/Container'

export async function getServerSideProps(){
    const userRequest = await fetch('http://localhost:8080/api/customers');
    const userData = await userRequest.json();
    return {
        props: {
            user: userData
        }
    };

}

export default function About(props){
    return <Container  maxWidth="xl"> 
    <div className="about"> 
        Hey, {props.user[0].Name}, {props.user[0].Email} </div>
    </Container>
}
