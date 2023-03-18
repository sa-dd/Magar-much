import Title from './title'
import "@splidejs/splide/dist/css/splide.min.css";

export default function vid(){
    return <div className="vid-outer"> 
        
        <Title/>
    <video className="vid-holder" muted={true} autoPlay={true}> 
        <source src="./haha.mp4" type="video/mp4"/> 
    </video>
</div>
}
