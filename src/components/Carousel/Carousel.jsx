import React, {Component} from 'react';
import {Carousel, CarouselItem, CarouselCaption} from 'reactstrap';

class advert extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0};
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.images = props.images;
    this.width = props.width;
    this.height = props.height;
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === (this.images.length-1) ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? (this.images.length-1) : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }
  render() {
  return (  
    <Carousel className="text-center" next={this.next} previous={this.previous} activeIndex={this.state.activeIndex}>
      {this.images.map((image) => {
        return <CarouselItem key={image.id}>
                  <img  width={this.width} height={this.height} src={image.src} alt={image.alt}/>
                    <CarouselCaption captionText="" captionHeader="" />
                </CarouselItem>;
      })}
    </Carousel>
  );
}
}

export default advert;