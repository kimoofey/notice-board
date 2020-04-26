import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from 'reactstrap';

const items = [
    {
        src: 'https://via.placeholder.com/350?text=Carousel1',
        altText: 'Slide 1',
        caption: 'Slide 1'
    },
    {
        src: 'https://via.placeholder.com/350?text=Carousel2',
        altText: 'Slide 2',
        caption: 'Slide 2'
    },
    {
        src: 'https://via.placeholder.com/350?text=Carousel3',
        altText: 'Slide 3',
        caption: 'Slide 3'
    }
];

class CustomCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = {activeIndex: 0, animating: false};
    }

    next = () => {
        if (this.state.animating)
            return;
        const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({activeIndex: nextIndex});
    };

    previous = () => {
        if (this.state.animating)
            return;
        const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
        this.setState({activeIndex: nextIndex});
    };

    goToIndex = (newIndex) => {
        if (this.state.animating)
            return;
        this.setState({activeIndex: newIndex});
    };


    render() {
        return (
            <Carousel
                activeIndex={this.state.activeIndex}
                next={this.next}
                previous={this.previous}
            >
                <CarouselIndicators items={items} activeIndex={this.state.activeIndex} onClickHandler={this.goToIndex}/>
                {items.map((item) => {
                    return (
                        <CarouselItem
                            onExiting={() => this.setState({animating: true})}
                            onExited={() => this.setState({animating: false})}
                            key={item.src}
                        >
                            <img src={item.src} alt={item.altText}/>
                            <CarouselCaption captionText={item.caption} captionHeader={item.caption}/>
                        </CarouselItem>
                    );
                })}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous}/>
                <CarouselControl direction="next" directionText="Next" onClickHandler={this.next}/>
            </Carousel>
        );
    }
}

Carousel.propTypes = {
    items: PropTypes.array,
};

export default CustomCarousel;