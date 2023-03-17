import {Container} from "@mui/material" ;

export default function vid(){
    return <div className="vid-outer"> 
    <video className="vid-holder" muted={true} autoPlay={true}> 
        <source src="./haha.mp4" type="video/mp4"/> 
    </video>
</div>
}
