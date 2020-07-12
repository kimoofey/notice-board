import React from 'react';
import PropTypes from 'prop-types';

const items = [
    {
        src: 'https://via.placeholder.com/350?text=Carousel1',
        altText: 'Slide 1',
        caption: 'Slide 1',
    },
    {
        src: 'https://via.placeholder.com/350?text=Carousel2',
        altText: 'Slide 2',
        caption: 'Slide 2',
    },
    {
        src: 'https://via.placeholder.com/350?text=Carousel3',
        altText: 'Slide 3',
        caption: 'Slide 3',
    },
];

function CustomCarousel() {
    return (
        <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-ride="carousel"
        >
            <div className="carousel-inner">
                {items.map((item) => {
                    return (
                        <div className="carousel-item active">
                            <img
                                src={item.src}
                                className="d-block w-100"
                                alt={item.altText}
                            />
                        </div>
                    );
                })}
            </div>
            <a
                className="carousel-control-prev"
                href="#"
                role="button"
                data-slide="prev"
            >
                <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                />
                <span className="sr-only">Previous</span>
            </a>
            <a
                className="carousel-control-next"
                href="#"
                role="button"
                data-slide="next"
            >
                <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                />
                <span className="sr-only">Next</span>
            </a>
        </div>
    );
}

CustomCarousel.propTypes = {
    items: PropTypes.array,
};

export default CustomCarousel;
