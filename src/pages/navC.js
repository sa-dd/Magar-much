import { flattenOptionGroups } from '@mui/base';
import Container from '@mui/material/Container'
import {useEffect, useState} from 'react'

export default function Nav(){
    const [stickyClass, setSticky] = useState("");

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

            console.log(window.scrollY);
        }
        window.addEventListener("scroll", stickyNav);
        return () =>{
            window.removeEventListener("scroll", stickyNav);
        }
    }, []);

    return <nav className={`${stickyClass}`}>
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
