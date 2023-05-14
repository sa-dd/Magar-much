import Container from '@mui/material/Container'
import Footer from './footer'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowDown} from '@fortawesome/free-solid-svg-icons'
import {useRef, useState, useEffect} from 'react'
import { TextField} from '@mui/material'
import { motion } from "framer-motion"
import { width } from '@mui/system'
import Draggable from 'react-draggable';
import Image from 'next/image'


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
    const quantity = useRef(null);
    const [disabled, setDisabled] = useState(true);
    const [selectedOption, setSelectedOption] = useState('Featured');
    const [showCart, setShowCart] = useState(false);
    const [moveItems, setMoveItems] = useState(0); 
    const [changeWidthx, setChangeWidthx] = useState(90);
    const [cartItems, setCartItems] = useState([]);
    const [cartItemQuantity, setCartItemQuantity] = useState({});
    const [total, setTotal] = useState(0);
    const [orderid, setOrderid] = useState(0);
    const [trans, setTrans] = useState(0.5);

    const [changeWidth, setChangeWidth] = useState(30);
    const [scale, setScale] = useState(1);
    const [y, setY] = useState(0);
    const handleOption= (event) => {
        setTrans(0.5);
        setSelectedOption(event.target.value);
    }

    useEffect(() => {
        // Calculate the total
        const newTotal = cartItems.reduce(
            (total, item) => total + item.Price * cartItemQuantity[item.ID],
            0
        );
        // Update the state of `total`
        setTotal(newTotal);

        console.log(cartItemQuantity)

        localStorage.setItem("cartList", JSON.stringify(cartItems));
        localStorage.setItem("itemQuantity", JSON.stringify(cartItemQuantity));
        localStorage.setItem("totalAmount", total);
    }, [cartItems, cartItemQuantity]);

    useEffect(() => {
        if(orderid){
            localStorage.removeItem("cartList");
            localStorage.removeItem("itemQuantity");
            localStorage.removeItem("totalAmount");


            cartItems.map((item) => {

                const food = {
                    OrderID: orderid,
                    FoodItemID: item.ID,
                    Quantity: cartItemQuantity[item.ID]
                }

                fetch('http://localhost:8080/api/takeorderdetail', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(food)
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Success:', data);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            }) 

        }
    }, [orderid])

    const handleClick = (key) => {
        setChangeWidth(40)
        setMoveItems(-40);
        setScale(1);
        setY(-80);
        setTrans(0);

        if(cartItemQuantity[key] === undefined)
            setCartItems([...cartItems, props.items[key-1]])  // adding items to the cart

        setCartItemQuantity((prevState) => ({
            ...prevState,
            [key]: (prevState[key] || 0) + 1, // increment quantity by 1 or set to 1 if undefined
        }));
        setShowCart(true);
    }

    const handleOrder = () => {
        let orderID = 0;
        const data = {
            CustomerID: JSON.parse(localStorage.user).ID,
            TotalAmount: total.toFixed(2),
            Status: "pending",
            PaymentMethod: "Credit Card", 
        }
        fetch('http://localhost:8080/api/takeorder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                setOrderid(data[0][""])
                console.log('Success:', orderid);
            })
            .catch((error) => {
                console.error('Error:', error);
            });



    }

    const itemContStyle = {
        width: `${changeWidth}%`, 
        transition: `${trans}s`
    };

    const foodContStyle = {
        width: `${changeWidthx}%` 
    };
    return <div className='about-cont'>
        <div className='section-holder'>
            <div className='section1'>
                <span className='menu-bg-text'> In <span className='mgt1'>burgers </span>we trust, our hearts doth crave Juicy, savory, and oh so brave With <span className='mgt1'>buns </span> that cradle their meaty The sizzle and pop, the smell divine We long for that patty, so fine A </span>
                <div className='menu'>
                    <motion.span className='menu-title' whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}> <span className='m'>M</span><span className='e'>E</span><span className='n'>N</span><span className='u'>U</span><span className='s'>S</span>  </motion.span>
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
                    <motion.div animate={{ x: moveItems, scale: scale, y:y}} transition={{ delay: 0, ease: "easeInOut" }} className='food-cont'>
        {
            props.items.map((item)=>(
                (item.Category === selectedOption)? (
                    <motion.div animate={{ y: 50 }} style = {itemContStyle} className='item-cont' key={item.ID} transition={{ delay: -1}}>
                        <div className='item-cont-text'>
                            <span className='item-name'> {item.Name}</span>
                            <span className='item-desc'> {item.Description} </span>
                            <button className='add-to-cart' onClick={()=>handleClick(item.ID)}>Add To Cart</button>
                            <span className='item-price'> Price: <span className='ips'>${item.Price}</span> </span>
                        </div>
                        <Image src={`${item.Image}`} alt= "burger" width={500} height={300}/>
                    </motion.div>
                ) : null
            )
            )
        }

    </motion.div>
        { showCart ? <motion.div  initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1, x:-50 }} transition={{ duration: 0.8, delay: 0.5, ease: [0, 0.71, 0.2, 1.01]}}  drag
            dragConstraints={{
                top: -300,
                    left: -120,
                    right: -80,
                    bottom: 5000,}} className='cart'>

                    <div className='cart-title'> Cart </div>
            {

            <div className='cart-item-cont' >
                {
                    cartItems.map((item)=>(
                        <div className='cart-item' key={item.ID}>
                            <div className='quantity-cont'>
                                <span className='cart-item-q'> {`${cartItemQuantity[item.ID]}x`} </span>
                            </div>
                            <img src={`http://localhost:8080${item.Image}`} />
                            <div className='cart-item-details'>
                                <span className='cart-item-name'>{item.Name} </span>
                                <span className='cart-item-price' ref={quantity}> {` Price:  $${(item.Price * cartItemQuantity[item.ID]).toFixed(2)}`} </span>
                            </div>

                        </div> )) 

                }
            </div>
            }
            <div className='cart-other'> 
                <div className='cart-bill'> <span>Your Total : </span> {<div> ${total.toFixed(2)} </div>}</div>
                <div className='cart-promo'>{<TextField id="outlined-basic" label="Enter Promo Code" variant="outlined" color='secondary'/>} </div>
                <a href='/checkout'className='cart-checkout'> Proceed To Checkout </a>
            </div>
    </motion.div> : null }
</div>
</div>
</div>

<Footer />
    </div>
}
