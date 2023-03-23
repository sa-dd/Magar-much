import Container from '@mui/material/Container'

export async function getServerSideProps(){
    const userRequest = await fetch('http://localhost:8080/api/fooditems');
    const userData = await userRequest.json();
    return {
        props: {
            user: userData
        }
    };

}

export default function About(props){
    return  <div className='about-cont'>
        <Container  maxWidth="xl"> 
            <div className="about"> 
                <span> Hey {props.user[0].Name}, This is your Price: ${props.user[0].Price} </span> 
                <img src={`http://localhost:8080${props.user[0].Image}`} alt= "burger"/>
                <span> Hey {props.user[1].Name}, This is your Price: ${props.user[1].Price} </span> 
                <img src={`http://localhost:8080${props.user[1].Image}`} alt= "fries" style = {{height:'650px', width: '745px'}} / >  
                    <span> Hey {props.user[2].Name}, This is your Price: ${props.user[2].Price} </span> 
                    <img src={`http://localhost:8080${props.user[2].Image}`} alt= "soda"/>

                </div>

            </Container>
        </div>
}
