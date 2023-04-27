import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'

export default function Container_ad2(){

    const [trigger, setTrigger] = useState(false);
    
    useEffect ( () => {
        let oldDir = 0;
        const stickyNav = () => {

            if(window != undefined){
                if (window.scrollY > 2000) {
                    setTrigger(!trigger);
                }

                oldDir = window.scrollY;

            }

        }

        window.addEventListener("scroll", stickyNav);
        return () =>{
            window.removeEventListener("scroll", stickyNav);
        }
    }, []);


    return <div className="cont_ad-2">

        <div className="ad1-block">
            <span className="punchline">Why Are Our Burgers Better?.</span>
            <div className="header">
                <span className="header1">In Burgers We</span>
                <span className="header2">Trust.</span>
            </div>
            <span className="para">Satisfy your cravings and try our new <span> Magar Muchh!</span> Fried Chicken range, which is 40% bigger than other fried chicken burgers, with a Big, Thick, Crunchy, Juicy whole muscle chicken breast that delivers an epic eating experience with every bite. </span>
            <a className="button" href="/menu"> VIEW MENU </a>
        </div>

        <div className="ad2-burger">
            <div className='ad2-burger-bg'>
                <motion.img src='/f5.png' alt='flying-burger' animate={{ x: (trigger && -800) }} transition={{ delay: 0 }}/>
            </div>
        </div>
    </div>

}
