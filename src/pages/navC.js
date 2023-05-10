import { TextField, Typography} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import Container from '@mui/material/Container'
import {useEffect, useState} from 'react'
import Modal from './modal'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/router'
import { BeatLoader } from 'react-spinners';


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

export default function Nav(props){
    const [stickyClass, setSticky] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState(false);
    const [user, setUser] = useState({});
    const [logged, setLogged] = useState(false);
    const [isLoading, setIsLoading] = useState(true);


    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const goToPage = ()=> {
        const router = useRouter()
        router.push('/dashboard')
    }

    const buttonStyle = {
        color: 'white',
        width: '150px',
        'margin-top': '5px'
       // Add more styles as needed
    };


    useEffect(() => {
        const storedLogin = localStorage.getItem('isLoggedIn');
        if (storedLogin === 'true') {
            setLogged(true);
        }
    }, []);

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
        {logged ? (<div> <Button id="basic-button" aria-controls={open ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} style={buttonStyle} onClick={handleClick}>{localStorage.username} </Button>
            <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{'aria-labelledby': 'basic-button',}}>
                <MenuItem onClick={goToPage}>Dashboard</MenuItem>
                <MenuItem onClick={()=>{
                    localStorage.removeItem('user_data'); 
                    localStorage.removeItem('username');
                    localStorage.setItem('isLoggedIn', false);
                    setLogged(false)}}> Logout</MenuItem>
            </Menu>

        </div>) : (<button onClick={()=> setShowModal(!showModal)}>Sign In</button>)}
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
                        <CssTextField id="outlined-basic1"  helperText= {error ? 'Wrong password or email' : ''} value={email} onChange={handleEmail} label="Email" variant="outlined" color='secondary' InputLabelProps={{ style: { color: 'white' } }}  sx={{'& .MuiOutlinedInput-input' : { color: 'white'}}}/>
                        <CssTextField id="outlined-basic2"   helperText={
                            error ? (
                                <Typography variant="caption" color="error">
                                Wrong password or email 
                            </Typography>
                            ) : (
                                ''
                            )
                        } type='password' value={pass} onChange = {(event) => setPass(event.target.value)} label="Password" variant="outlined" color='secondary' InputLabelProps={{ style: { color: 'white' } }} sx={{'& .MuiOutlinedInput-input' : { color: 'white'}}} />
                </div>
                <button className='modal-signin' onClick={(event) =>{
                    console.log('Email', email)
                    console.log('Password', pass)
                    props.customers.items.map((cust) =>{
                        if(cust.Email == email){
                            if(cust.Password == pass) {
                                console.log("Sucess");
                                setUser(cust);
                                setShowModal(!showModal); 
                                setLogged(true); 
                                event.preventDefault();

                                // Perform authentication logic here
                                // ...

                                // Store user information in local storage
                                localStorage.setItem('username', cust.Name);
                                localStorage.setItem('isLoggedIn', true);
                                const user = JSON.stringify(cust);

                                localStorage.setItem('user', user);
                            }
                            else{
                                console.log("Login failed")

                                setError(true);
                            }
                        }

                    })
                }
                }> Sign In </button>
            <button className='modal-close' onClick={()=> setShowModal(!showModal)}>X</button>
        </div>
    </div>
</div>

<Container maxWidth="xl"> 

    <div className="container-inner">
        <a className="nav-logo" href="/papu"> <img src="/logo1.svg" alt="app-logo" /> </a>
        <div className="nav-inner">
            <a className="nav-item" href="/menu">Menu</a>
            <a className="nav-item"href="/better">Better Food</a>
            <a className="nav-item"href="/reviews">Find Us</a>
            <a className="nav-item-spacer"href="/nana"></a>
            <a className="nav-item"href="https://discord.com/invite/samurai">Community</a>
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
