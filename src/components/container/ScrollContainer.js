import React from 'react'
import { TimelineMax, Expo } from "gsap";
import s from './ScrollContainer.module.scss';
import HorizontalScroll from 'horizontal-scroll';

export class ScrollContainer extends React.Component {

  constructor(props) {

    super(props);
    this.myScrollContainer = React.createRef();
    this.myScrollContainerTween = null;

    const passProps = props;
    this.containerClasses = s.ScrollContainer;
    if (passProps.className) this.containerClasses = [s.ScrollContainer, passProps.className].join(' ');

    console.log(HorizontalScroll);

  }

  componentDidMount() {

    this.myScrollContainerTween = new TimelineMax({
      paused : true
    });

    this.myScrollContainerTween.staggerFrom(this.myScrollContainer.current.querySelectorAll(':scope > * > *'), 2.4, { x:"100vw", ease: Expo.easeOut, clearProps:"transform"}, 0.05, 0);
    this.myScrollContainerTween.play();

    const myBlocks = this.myScrollContainer.current.querySelectorAll(':scope > * > *');
    const myContainer = this.myScrollContainer.current.querySelectorAll(':scope > *');

    console.log(myBlocks, myContainer);

    this.hs = new HorizontalScroll({
    	blocks: myBlocks,
    	container: myContainer
    });

  }

  componentWillUnmount() {
    this.myScrollContainerTween.stop();
    this.myScrollContainerTween = null;
  }

  render() {

    return (

      <div className={this.containerClasses} ref={this.myScrollContainer}>
        <div className={s.ScrollContainer__inner}>
          {this.props.children}
        </div>
      </div>

    )
  }
}
