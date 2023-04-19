import Container from '@mui/material/Container'
import Footer from './footer'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowDown} from '@fortawesome/free-solid-svg-icons'
import {useRef} from 'react'

export async function getServerSideProps() {

    const userRequest = await fetch('http://localhost:8080/api/fooditems');
    const userData = await userRequest.json();
    return {
        props: {
            items: userData
        }
    };

}

export default function About(props) {
    return <div className='about-cont'>
        <div className='section-holder'>
            <div className='section1'>
                <span className='menu-bg-text'> In <span className='mgt1'>burgers </span>we trust, our hearts doth crave Juicy, savory, and oh so brave With <span className='mgt1'>buns </span> that cradle their meaty </span>
                <div className='menu'>
                    <span className='menu-title'><span className='m'>M</span><span className='e'>E</span><span className='n'>N</span><span className='u'>U</span><span className='s'>S</span>  </span>
                    <span className='menu-para'> A culinary tour of <span>BBQ</span> traditions from around this great nation and this beautiful planet. 1.8 million years ago, humans first began cooking meat with fire. For some reason, this hasn’t led to world peace, but we’re pretty sure if we fire up enough <span>BBQ</span>, it will.</span>
                </div>
                <div class="arrow bounce">
                    <a class="fa-solid fa-arrow-down" href="section2">
                        <FontAwesomeIcon icon={faArrowDown} size = "2x" />
                    </a>
                </div>
            </div>
            <div className='section2'>
                <div className="main-header">
                    <span className="first papu">Your Crave</span>
                    <span className="second papu">.#$!#</span>
                </div>

                <div className='food-section'>
                    <a className='fs1' href=''> 
                        <img src='/sec2.png' alt='image-1' />
                        <span className='fs1-text'> Featured </span>
                    </a>
                    <a className='fs1' href=''> 
                        <img src='/sec6.png' alt='image-2' />
                        <span className='fs1-text'> Breakfast</span>
                    </a>
                    <a className='fs1' href=''> 
                        <img src='/sec9.png' alt='image-3' />
                        <span className='fs1-text'> Bundles </span>
                    </a>
                    <a className='fs1' href='#'> 
                        <img src='/sec10.png' alt='image-4' />
                        <span className='fs1-text'> Drinks</span>
                    </a>
                    <a className='fs1' href='#'> 
                        <img src='/sec8.png' alt='image-4' />
                        <span className='fs1-text'>Sides</span>
                    </a>
                    <a className='fs1' href='#'> 
                        <img src='/sec1.png' alt='image-4' />
                        <span className='fs1-text'>M's Cafe</span>
                    </a>
                    <a className='fs1' href='#'> 
                        <img src='/sec3.png' alt='image-4' />
                        <span className='fs1-text'>Dessert</span>
                    </a>
                </div>

                <div className='menu-container'> 
                    <div className='food-cont'>
        {
            props.items.map((item, index)=>(
                <div className='item-cont' key={index}>
                    <div className='item-cont-text'>
                        <span className='item-name'> {item.Name}</span>
                        <span className='item-price'> Price: <span>${item.Price}</span> </span>
                    </div>

                    <img src={`http://localhost:8080${item.Image}`} alt= "burger"/>
                </div>


            ))
        }

    </div>
</div>
            </div>
        </div>

        <Footer />
    </div>
}
