import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFacebook, faInstagram, faTwitter, faYoutube} from '@fortawesome/free-brands-svg-icons'

export default function Contact(){
    return <div className='footer-mam'>
        <div className="footer-contact">
            <div className='footer-contact-box'>
                <span className='logo-footer' ><img src='/logo.svg' alt='logo-haha' /> </span>
                <div className='list'>
                <span> FAQ</span>
                <span> Contact US</span> 
                <span>Delivery </span>
                <span> Feedback</span>
                <span> Download App</span>
                <span> Terms & Condition</span>
                </div>
            </div>
        </div>
        <div className="footer-contact2">
            <div className="contact2-box1">

                <div className="box1"> 
                    <span className="box1-heading"> Munchhhh!! </span>
                    <span className="box1-para"> 
        Very maza ayega buht maza aya humny khaana khaya hahaha!!
        Very maza ayega buht maza aya humny khaana khaya hahaha!! 
        Very maza ayega buht maza aya humny khaana khaya hahaha!! 
    </span>
    <span className="box1-sign"> Sign Up Now</span>
</div>

            </div>
            <div className="contact2-box2">

                <div className="box2"> 
                    <span className="box2-heading"> Connect With <span> Us </span> </span>
                    <span className="box2-icons">
                        <span> <FontAwesomeIcon icon={faFacebook} /> </span>
                        <span><FontAwesomeIcon icon={faInstagram} /> </span>
                    <span><FontAwesomeIcon icon={faTwitter} /> </span>
                <span><FontAwesomeIcon icon={faYoutube} /> </span>
                    </span>
                    <span className="box2-copyright"> 
                        <span> Delivery powered by  <span>  CD 70 </span> </span>
                        <span> Copyright © 2023 Magar Munchh Pakistan </span>
                    </span>
                </div>


            </div>
        </div>


    </div>

}
