import Container from '@mui/material/Container'
import Footer from './footer'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowDown} from '@fortawesome/free-solid-svg-icons'
import {useRef, useState} from 'react'
import { selectClasses } from '@mui/material'
import { motion } from "framer-motion"

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
    console.log(props.items);
    const [selectedOption, setSelectedOption] = useState('Featured');

    const handleOption= (event) => {
        setSelectedOption(event.target.value);
    }
    return <div className='about-cont'>
        <div className='section-holder'>
            <div className='section1'>
                <span className='menu-bg-text'> In <span className='mgt1'>burgers </span>we trust, our hearts doth crave Juicy, savory, and oh so brave With <span className='mgt1'>buns </span> that cradle their meaty The sizzle and pop, the smell divine We long for that patty, so fine A </span>
                <div className='menu'>
                    <span className='menu-title'><span className='m'>M</span><span className='e'>E</span><span className='n'>N</span><span className='u'>U</span><span className='s'>S</span>  </span>
                    <span className='menu-para'> A culinary tour of <span>BBQ</span> traditions from around this great nation and this beautiful planet. 1.8 million years ago, humans first began cooking meat with fire. For some reason, this hasn’t led to world peace, but we’re pretty sure if we fire up enough <span>BBQ</span>, it will.</span>
                </div>
                <div className="arrow bounce">
                    <a className="fa-solid fa-arrow-down" href="section2">
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
                    <input type='radio' id='featured' name='featured' value='Featured' checked={selectedOption === 'Featured'} onChange={handleOption}/>
                    <label className='fs1'for='featured'>
                        <img src='/sec2.png' alt='image-1' />
                        <span className='fs1-text'> Featured </span>
                    </label>

                    <input type='radio' id='breakfast' name='breakfast' value='Breakfast' checked={selectedOption === 'Breakfast'}onChange={handleOption}/>

                    <label className='fs1' for='breakfast'>
                        <img src='/sec6.png' alt='image-2' />
                        <span className='fs1-text'> Breakfast</span>
                    </label>

                    <input type='radio' name='bundles' id='bundles'value='Bundles'checked={selectedOption === 'Bundles'} onChange={handleOption}/>

                    <label className='fs1' for='bundles'> 
                        <img src='/sec9.png' alt='image-3' />
                        <span className='fs1-text'> Bundles </span>
                    </label>

                    <input type='radio' id='drinks' name='drinks' value='Drinks' checked={selectedOption === 'Drinks'}onChange={handleOption}/>

                    <label className='fs1' for='drinks'> 
                        <img src='/sec10.png' alt='image-4' />
                        <span className='fs1-text'> Drinks</span>
                    </label>

                    <input type='radio' id='sides' name='sides' value='Sides' checked={selectedOption === 'Sides'}onChange={handleOption}/>

                    <label className='fs1' for='sides'> 
                        <img src='/sec8.png' alt='image-4' />
                        <span className='fs1-text'>Sides</span>
                    </label>

                    <input type='radio' name='cafe' id='cafe' value='Cafe' checked={selectedOption === 'Cafe'}onChange={handleOption}/>

                    <label className='fs1' for='cafe'> 
                        <img src='/sec1.png' alt='image-4' />
                        <span className='fs1-text'>M's Cafe</span>
                    </label>

                    <input type='radio' name='dessert' id='dessert' value='Dessert' checked={selectedOption === 'Dessert'}onChange={handleOption}/>

                    <label className='fs1' for='dessert'> 
                        <img src='/sec3.png' alt='image-4' />
                        <span className='fs1-text'>Dessert</span>
                    </label>
                </div>

                <div className='menu-container'> 
                    <motion.div animate={{ x: -230 }} transition={{ delay: 2 }} className='food-cont'>
        {
            props.items.map((item, index)=>(
                (item.Category === selectedOption)? (
                    <motion.div animate={{ y: 50 }}  className='item-cont' key={index}>
                        <div className='item-cont-text'>
                            <span className='item-name'> {item.Name}</span>
                            <span className='item-desc'> {item.Description} </span>
                            <span className='item-price'> Price: <span className='ips'>${item.Price}</span> </span>
                        </div>
                        <img src={`http://localhost:8080${item.Image}`} alt= "burger"/>
                    </motion.div>
                ) : null
            )
            )
        }

    </motion.div>
        {/* <div className='cart'> hi </div> */}
    </div>
</div>
        </div>

        <Footer />
    </div>
}
