import Container from '@mui/material/Container'
import Footer from './footer'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowDown} from '@fortawesome/free-solid-svg-icons'
import {useRef, useState} from 'react'
import { selectClasses } from '@mui/material'

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
     const [selectedOption, setSelectedOption] = useState('featured');

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
                    <label className='fs1'>
                    <input type='radio' name='featured' value='featured' checked={selectedOption === 'featured'} onChange={handleOption}/>
                        <img src='/sec2.png' alt='image-1' />
                        <span className='fs1-text'> Featured </span>
                </label>
                    <label className='fs1' href=''> 

                    <input type='radio' name='breakfast' value='breakfast' checked={selectedOption === 'breakfast'}onChange={handleOption}/>
                        <img src='/sec6.png' alt='image-2' />
                        <span className='fs1-text'> Breakfast</span>
                    </label>
                    <label className='fs1' href=''> 

                    <input type='radio' name='bundles' value='bundles'checked={selectedOption === 'bundles'} onChange={handleOption}/>
                        <img src='/sec9.png' alt='image-3' />
                        <span className='fs1-text'> Bundles </span>
                    </label>
                    <label className='fs1' href='#'> 

                    <input type='radio' name='drinks' value='drinks' checked={selectedOption === 'drinks'}onChange={handleOption}/>
                        <img src='/sec10.png' alt='image-4' />
                        <span className='fs1-text'> Drinks</span>
                    </label>
                    <label className='fs1' href='#'> 

                    <input type='radio' name='sides' value='sides' checked={selectedOption === 'sides'}onChange={handleOption}/>
                        <img src='/sec8.png' alt='image-4' />
                        <span className='fs1-text'>Sides</span>
                    </label>
                    <label className='fs1' href='#'> 

                    <input type='radio' name='cafe' value='cafe' checked={selectedOption === 'cafe'}onChange={handleOption}/>
                        <img src='/sec1.png' alt='image-4' />
                        <span className='fs1-text'>M's Cafe</span>
                    </label>
                    <label className='fs1' href='#'> 

                    <input type='radio' name='dessert' value='dessert' checked={selectedOption === 'dessert'}onChange={handleOption}/>
                        <img src='/sec3.png' alt='image-4' />
                        <span className='fs1-text'>Dessert</span>
                    </label>
                </div>

                <div className='menu-container'> 
                    <div className='food-cont'>
        {
            props.items.map((item, index)=>(
                <div className='item-cont' key={index}>
                    <div className='item-cont-text'>
                        <span className='item-name'> {item.Name}</span>
                        <span className='item-desc'> {item.Description} </span>
                        <span className='item-price'> Price: <span className='ips'>${item.Price}</span> </span>
                    </div>
                    <img src={`http://localhost:8080${item.Image}`} alt= "burger"/>
                </div>


            ))
        }

    </div>
        {/* <div className='cart'> hi </div> */}
</div>
            </div>
        </div>

        <Footer />
    </div>
}
