import React from "react"
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/splide/dist/css/splide.min.css";


export default function Slider(){
    return  <div className="slider-papi" >
       <Splide
      options={{
        type: "loop",
        gap: "90px",
        drag: "free",
        arrows: false,
        pagination: false,
        perPage: 3,
        fixedWidth: '400px',
        fixedHeight: '400px',
        autoScroll: {
          pauseOnHover: false,
          pauseOnFocus: false,
          rewind: false,
          speed: 1
        }
      }}
      extensions={{ AutoScroll }}>
      <SplideSlide>
          <img src="/carousel/image1.jpg" alt="Image 1" />
      </SplideSlide>
      <SplideSlide>
          <img src="/carousel/image2.gif" alt="Image 2" />
      </SplideSlide>
      <SplideSlide>
          <img src="/carousel/image5.jpg" alt="Image 3" />
      </SplideSlide>
      <SplideSlide>
          <img src="/carousel/image4.jpg" alt="Image 4" />
      </SplideSlide>
      <SplideSlide>
          <img src="/carousel/image3.jpg" alt="Image 5" />
      </SplideSlide>
      <SplideSlide>
          <img src="/carousel/image6.jpg" alt="Image 6" />
      </SplideSlide>
      <SplideSlide>
          <img src="/carousel/image7.jpg" alt="Image 6" />
      </SplideSlide>
    </Splide>
</div>
}
