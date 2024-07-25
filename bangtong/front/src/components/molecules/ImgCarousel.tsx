import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Room1 from "../../assets/Room1.jpg";
import Room2 from "../../assets/Room2.jpg";
import Room3 from "../../assets/Room3.jpg";

const ImgCarousel = () => {
    return (
        <Carousel
            showArrows={true}
            showThumbs={false}
            infiniteLoop={true}
            autoPlay={true}
            interval={5000}
            showStatus={false}
            showIndicators={false}
            stopOnHover={true}
            swipeable={true}
            dynamicHeight={true}
        >
            <div>
                <img 
                    src={Room1} 
                    alt="1" 
                    style={{ width: '100%', height: '30vh' }}
                    className='rounded-2xl'
                />
            </div>
            <div>
                <img 
                    src={Room2} 
                    alt="2"
                    style={{ width: '100%', height: '30vh' }}
                    className='rounded-2xl'
                />
            </div>
            <div>
                <img 
                    src={Room3} 
                    alt="3"
                    style={{ width: '100%', height: '30vh' }}
                    className='rounded-2xl'
                />
            </div>
        </Carousel>
    );
}

export default ImgCarousel;
