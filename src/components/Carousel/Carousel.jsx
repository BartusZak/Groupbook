import React, {Component} from 'react';
import {Carousel, CarouselItem, CarouselCaption} from 'reactstrap';



class advert extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 2 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? 2 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }
  render() {
  return (
        <Carousel next={this.next} previous={this.previous} activeIndex={this.state.activeIndex}>
          <CarouselItem>
            <img width={500} height={500} alt="900x500" src="https://github.com/TheSharpieOne.png?size=500" />
            <CarouselCaption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </CarouselCaption>
          </CarouselItem>
          <CarouselItem>
            <img width={500} height={500} alt="900x500" src="https://github.com/TheSharpieOne.png?size=500" />
            <CarouselCaption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </CarouselCaption>
          </CarouselItem>
          <CarouselItem>
            <img width={500} height={500} alt="900x500" src="https://github.com/TheSharpieOne.png?size=500" />
            <CarouselCaption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </CarouselCaption>
          </CarouselItem>
        </Carousel>
  );
}
}

export default advert;