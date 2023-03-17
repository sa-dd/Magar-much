import Container from '@mui/material/Container'
import Image from 'next/image'

export default function Nav(){
    return <nav className="">
        <Container maxWidth="xl"> 
            <div className="login-sub"> 
                <div className="login-sub-icons">
                    <div className="login-sub-icons-button">
                        <div className="login-sub-icons-button-img"> </div>
                        <a href=""> Login </a>
                    </div>
                </div>
            </div>
        </Container>

        <Container maxWidth="xl"> 

            <div className="container-inner">
                <a className="nav-logo" href="/papu"> <img src="/logo.svg" alt="app-logo" /> </a>
                <div className="nav-inner">
                    <a className="nav-item" href="/menu">Menu</a>
                    <a className="nav-item"href="/better">Better Food</a>
                    <a className="nav-item"href="/find">Find Us</a>
                    <a className="nav-item-spacer"href="/nana"></a>
                    <a className="nav-item"href="/community">Community</a>
                    <a className="nav-item"href="/work">Work With US</a>
                    <a className="nav-item-order"href="/order">
                        <span className="order-now-img"> </span>
                        <span> Order Now </span>
                    </a>
                </div>

            </div>
        </Container>
    </nav>
}
