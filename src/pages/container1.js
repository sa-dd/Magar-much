export default function Container_ad1(){
    return <div className="cont_ad-1">
        <div className="ad1-gif"> 
            <video className="ad1-vid" muted={true} autoPlay={true} loop = {true}> 
                <source src="./ad1.mp4" type="video/mp4"/> 
            </video>
        </div>
        <div className="ad1-block">
            <span className="punchline">Taste Something Different.</span>
            <div className="header">
                <span className="header1">Just Bite Into</span>
                <span className="header2">Chicken.</span>
            </div>
            <span className="para">Satisfy your cravings and try our new <span> Magar Muchh!</span> Fried Chicken range, which is 40% bigger than other fried chicken burgers, with a Big, Thick, Crunchy, Juicy whole muscle chicken breast that delivers an epic eating experience with every bite. </span>
            <a className="button" href="/menu"> VIEW MENU </a>

        </div>
    </div>

}
