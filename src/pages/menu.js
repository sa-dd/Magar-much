import Container from '@mui/material/Container'
import Footer from './footer'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowDown} from '@fortawesome/free-solid-svg-icons'

export async function getServerSideProps() {

    const userRequest = await fetch('http://localhost:8080/api/fooditems');
    const userData = await userRequest.json();
    return {
        props: {
            user: userData
        }
    };

}

export default function About(props) {
    return <div className='about-cont'>
        <div className='main-container'>
            <span className='menu-bg-text'> In <span className='mgt1'>burgers </span>we trust, our hearts doth crave Juicy, savory, and oh so brave With <span className='mgt1'>buns </span> that cradle their meaty </span>
            <div className='menu'>
                <span className='menu-title'><span className='m'>M</span><span className='e'>E</span><span className='n'>N</span><span className='u'>U</span><span className='s'>S</span>  </span>
                <span className='menu-para'> A culinary tour of <span>BBQ</span> traditions from around this great nation and this beautiful planet. 1.8 million years ago, humans first began cooking meat with fire. For some reason, this hasn’t led to world peace, but we’re pretty sure if we fire up enough <span>BBQ</span>, it will.</span>
            </div>
            <div class="arrow bounce">
                <a class="fa-solid fa-arrow-down" href="#">
                    <FontAwesomeIcon icon={faArrowDown} size = "2xl" />
                </a>
            </div>
        </div>
        <Footer />
    </div>
}
