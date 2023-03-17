import {Container} from "@mui/material" ;
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/splide/dist/css/splide.min.css";

export default function vid(){
    return <div className="vid-outer"> 
    <video className="vid-holder" muted={true} autoPlay={true}> 
        <source src="./haha.mp4" type="video/mp4"/> 
    </video>
</div>
}
