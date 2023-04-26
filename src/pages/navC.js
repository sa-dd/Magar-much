import { TextField} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import Container from '@mui/material/Container'
import {useEffect, useState} from 'react'
import Modal from './modal'

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: 'yellow',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'white',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: 'white'
        },
        '&:hover fieldset': {
            borderColor: 'yellow',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'yellow',
        },
    },      
});

export default function Nav(){
    const [stickyClass, setSticky] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    useEffect ( () => {

        let oldDir = 0;
        let flag = false;
        const stickyNav = () => {

            if(window != undefined){
                if (window.scrollY == 0){
                    setSticky("");
                }
                else if (window.scrollY > 220) {
                    setSticky("no-nav");
                    flag = true;
                }
                else if (window.scrollY > 40) {
                    setSticky("no-login");
                }

                if(window.scrollY < oldDir && flag){
                    setSticky("no-login");
                    flag = false;
                }
                console.log(`old dir ${oldDir}`);
                oldDir = window.scrollY;

            }

        }

        window.addEventListener("scroll", stickyNav);
        return () =>{
            window.removeEventListener("scroll", stickyNav);
        }
    }, []);

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    return <nav className={`${stickyClass}`}>
        <Container maxWidth="xl"> 
            <div className="login-sub"> 
                <div className="login-sub-icons">
                    <div className="login-sub-icons-button">
                        <div className="login-sub-icons-button-img"> </div>
                        <button onClick={()=> setShowModal(!showModal)}> Sign In</button>
                    </div>
                </div>
            </div>
        </Container>

        <div className={`modal-backdrop ${showModal ? 'visible' : ''}`}>
            <div className='modal-content'>
                <img src='./login.png' alt='photo' />
                <div className='modal-form'> 
                    <div className='modal-text'>
                        <span className='modal-title'> Magar<span>MUNCHH</span> </span>
                        <span className='modal-offer'>
                            <span className='modal-offer-1'>ENTER TO WIN</span>
                            <span className='modal-offer-2'> $250 </span>
                            <span className='modal-offer-3'>IN DINING CREDITS </span>
                        </span>
                        <span className='modal-join-text'> Join us now to get 50% off promo on your first order and get our premium membership for the first month free.</span>
                    </div>
                    <div className='modal-actual-form'>
                        <CssTextField id="outlined-basic" value={email} onChange={handleEmail} label="Email" variant="outlined" color='secondary' InputLabelProps={{ style: { color: 'white' } }}  sx={{'& .MuiOutlinedInput-input' : { color: 'white'}}}/>
                        <CssTextField id="outlined-basic"  value={pass} onChange = {(event) => setPass(event.target.value)} label="Password" variant="outlined" color='secondary' InputLabelProps={{ style: { color: 'white' } }} sx={{'& .MuiOutlinedInput-input' : { color: 'white'}}} />
                    </div>
                    <button className='modal-signin' onClick={() =>{
                        console.log('Email', email)
                        console.log('Password', pass)
                    }
                    }> Sign In </button>
                <button className='modal-close' onClick={()=> setShowModal(!showModal)}>X</button>
            </div>
        </div>
    </div>

    <Container maxWidth="xl"> 

        <div className="container-inner">
            <a className="nav-logo" href="/papu"> <img src="/logo.svg" alt="app-logo" /> </a>
            <div className="nav-inner">
                <a className="nav-item" href="/menu">Menu</a>
                <a className="nav-item"href="/better">Better Food</a>
                <a className="nav-item"href="/reviews">Find Us</a>
                <a className="nav-item-spacer"href="/nana"></a>
                <a className="nav-item"href="https://discord.com/invite/samurai">Work With US</a>
                <a className="nav-item" href="/reviews">Reviews</a>
                <a className="nav-item-order"href="/menu">
                    <span className="order-now-img"> </span>
                    <span> Order Now </span>
                </a>
            </div>

        </div>
    </Container>
</nav>
}
