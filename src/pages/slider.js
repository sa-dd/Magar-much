import React from "react"

class Lider extends React.Component {
    constructor(){
        super()
        this.scroll = this.scroll.bind(this)
    }


    scroll(direction){
        let far = $( '.image-container' ).width()/2*direction;
        let pos = $('.image-container').scrollLeft() + far;
        $('.image-container').animate( { scrollLeft: pos }, 1000)
    }

    render() {
        return <div className="main">
            <div className="wrapper">
                <div className="image-container">
                    <div className="image"><img src="/carousel/image1.jpg" alt="image-1"/></div>
                    <div className="image"><img src="/carousel/image2.gif" alt="image-2"/> </div>
                    <div className="image"><img src="/carousel/image3.jpg" alt="image-3"/></div>
                    <div className="image"><img src="/carousel/image4.jpg" alt="image-4"/></div>
                    <div className="image"><img src="/carousel/image5.jpg" alt="image-5"/></div>
                    <div className="image"><img src="/carousel/image6.jpg" alt="image-6"/></div>
                    <div className="image"><img src="/carousel/image1.jpg" alt="image-1"/></div>
                    <div className="image"><img src="/carousel/image2.gif" alt="image-2"/> </div>
                    <div className="image"><img src="/carousel/image3.jpg" alt="image-3"/></div>
                    <div className="image"><img src="/carousel/image4.jpg" alt="image-4"/></div>
                    <div className="image"><img src="/carousel/image5.jpg" alt="image-5"/></div>
                    <div className="image"><img src="/carousel/image6.jpg" alt="image-6"/></div>
                    <div className="image"><img src="/carousel/image7.jpg" alt="image-7"/></div>
                    <div className="image"><img src="/carousel/image1.jpg" alt="image-1"/></div>
                    <div className="image"><img src="/carousel/image2.gif" alt="image-2"/> </div>
                    <div className="image"><img src="/carousel/image3.jpg" alt="image-3"/></div>
                    <div className="image"><img src="/carousel/image4.jpg" alt="image-4"/></div>
                    <div className="image"><img src="/carousel/image5.jpg" alt="image-5"/></div>
                    <div className="image"><img src="/carousel/image6.jpg" alt="image-6"/></div>
                    <div className="image"><img src="/carousel/image7.jpg" alt="image-7"/></div>
                    <div className="image"><img src="/carousel/image1.jpg" alt="image-1"/></div>
                    <div className="image"><img src="/carousel/image2.gif" alt="image-2"/> </div>
                    <div className="image"><img src="/carousel/image3.jpg" alt="image-3"/></div>
                    <div className="image"><img src="/carousel/image4.jpg" alt="image-4"/></div>
                    <div className="image"><img src="/carousel/image5.jpg" alt="image-5"/></div>
                    <div className="image"><img src="/carousel/image6.jpg" alt="image-6"/></div>
                    <div className="image"><img src="/carousel/image7.jpg" alt="image-7"/></div>
                    <div className="image"><img src="/carousel/image7.jpg" alt="image-7"/></div>
                </div>
            </div>
        </div>;
    }
}


export default function Slider(){
    return  <Lider />;
}
