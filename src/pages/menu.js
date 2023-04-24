import Container from '@mui/material/Container'
import Footer from './footer'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowDown} from '@fortawesome/free-solid-svg-icons'
import {useRef, useState, useEffect} from 'react'
import { selectClasses } from '@mui/material'
import { motion } from "framer-motion"
import { width } from '@mui/system'

export async function getServerSideProps() {

    const userRequest = await fetch('http://localhost:8080/api/fooditems');
    const userData = await userRequest.json();
    return {
        props: {
            items: userData,
        }
    };

}

export default function About(props) {

    const [selectedOption, setSelectedOption] = useState('Featured');
    const [showCart, setShowCart] = useState(false);
    const [moveItems, setMoveItems] = useState(0); 
    const [changeWidthx, setChangeWidthx] = useState(90);
    const [cartItems, setCartItems] = useState([]);
    const [cartItemQuantity, setCartItemQuantity] = useState({});

    const [changeWidth, setChangeWidth] = useState(30);
    const handleOption= (event) => {
        setSelectedOption(event.target.value);
    }

    const handleClick = (index) => {
        setMoveItems(-100);
        setChangeWidth(40);    
        setChangeWidthx(80);


        if(cartItemQuantity[index] === undefined)
        setCartItems([...cartItems, props.items[index]])

        setCartItemQuantity((prevState) => ({
            ...prevState,
            [index]: (prevState[index] || 1) + 1, // increment quantity by 1 or set to 1 if undefined
        }));


        console.log(cartItemQuantity);

        setShowCart(true);
    }


    const itemContStyle = {
        width: `${changeWidth}%` 
    };

    const foodContStyle = {
        width: `${changeWidthx}%` 
    };
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
                    <label className='fs1'htmlFor='featured'>
                        <img src='/sec2.png' alt='image-1' />
                        <span className='fs1-text'> Featured </span>
                    </label>

                    <input type='radio' id='breakfast' name='breakfast' value='Breakfast' checked={selectedOption === 'Breakfast'}onChange={handleOption}/>

                    <label className='fs1' htmlFor='breakfast'>
                        <img src='/sec6.png' alt='image-2' />
                        <span className='fs1-text'> Breakfast</span>
                    </label>

                    <input type='radio' name='bundles' id='bundles'value='Bundles'checked={selectedOption === 'Bundles'} onChange={handleOption}/>

                    <label className='fs1' htmlFor='bundles'> 
                        <img src='/sec9.png' alt='image-3' />
                        <span className='fs1-text'> Bundles </span>
                    </label>

                    <input type='radio' id='drinks' name='drinks' value='Drinks' checked={selectedOption === 'Drinks'}onChange={handleOption}/>

                    <label className='fs1' htmlFor='drinks'> 
                        <img src='/sec10.png' alt='image-4' />
                        <span className='fs1-text'> Drinks</span>
                    </label>

                    <input type='radio' id='sides' name='sides' value='Sides' checked={selectedOption === 'Sides'}onChange={handleOption}/>

                    <label className='fs1' htmlFor='sides'> 
                        <img src='/sec8.png' alt='image-4' />
                        <span className='fs1-text'>Sides</span>
                    </label>

                    <input type='radio' name='cafe' id='cafe' value='Cafe' checked={selectedOption === 'Cafe'}onChange={handleOption}/>

                    <label className='fs1' htmlFor='cafe'> 
                        <img src='/sec1.png' alt='image-4' />
                        <span className='fs1-text'>M's Cafe</span>
                    </label>

                    <input type='radio' name='dessert' id='dessert' value='Dessert' checked={selectedOption === 'Dessert'}onChange={handleOption}/>

                    <label className='fs1' htmlFor='dessert'> 
                        <img src='/sec3.png' alt='image-4' />
                        <span className='fs1-text'>Dessert</span>
                    </label>
                </div>

                <div className='menu-container'> 
                    <motion.div animate={{ x: moveItems }} transition={{ delay: 2 }} className='food-cont' style={foodContStyle}>
        {
            props.items.map((item, index)=>(
                (item.Category === selectedOption)? (
                    <motion.div animate={{ y: 50 }}  className='item-cont' key={index}   transition={{ delay: 0.5 }} style = {itemContStyle}>
                        <div className='item-cont-text'>
                            <span className='item-name'> {item.Name}</span>
                            <span className='item-desc'> {item.Description} </span>
                            <button onClick={()=>handleClick(index)}>Add To Cart</button>
                            <span className='item-price'> Price: <span className='ips'>${item.Price}</span> </span>
                        </div>
                        <img src={`http://localhost:8080${item.Image}`} alt= "burger"/>
                    </motion.div>
                ) : null
            )
            )
        }

    </motion.div>
        { showCart ? <motion.div  initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1, x:-100 }} transition={{ duration: 0.8, delay: 2, ease: [0, 0.71, 0.2, 1.01]}} className='cart'>

            <div className='cart-title'> Cart </div>
            {

            <div className='cart-item-cont' >
                {
                    cartItems.map((item, index)=>(
                        <div className='cart-item' key={index}>
                            <span className='cart-item-q'> {cartItemQuantity[index] || 1} </span>
                            <img src={`http://localhost:8080${item.Image}`} />
                        {`${item.Name} ~ $${item.Price}`}

                    </div> )) 

                }
            </div>
            }
        </motion.div> : null }
    </div>
</div>
</div>

<Footer />
    </div>
}
