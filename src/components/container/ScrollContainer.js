import React from 'react'
import { TimelineMax, TweenMax, Expo } from "gsap";
import { clamp, lerp } from "utils/utils.js";
import s from './ScrollContainer.module.scss';

export class ScrollContainer extends React.Component {

  constructor(props) {

    super(props);
    this.myScrollContainer = React.createRef();
    this.myScrollContainerTween = null;
    this.scrolling = false;
    this.scrollX = 0;
    this.lastScrollX = 0;

    const passProps = props;
    this.containerClasses = s.ScrollContainer;
    this.onMouseEvent = this.onMouseEvent.bind(this);
    this.onScrollEvent = this.onScrollEvent.bind(this);
    this.onRender = this.onRender.bind(this);

    if (passProps.className) this.containerClasses = [s.ScrollContainer, passProps.className].join(' ');

  }

  componentDidMount() {

    this.myScrollContainerTween = new TimelineMax({
      paused : true,
      onStart : () => {
        this.myScrollContainer.current.style.overflow = "hidden";
      },
      onComplete: () => {
        this.myScrollContainer.current.style.overflow = "auto";
      }
    });

    this.myScrollContainerTween.staggerFrom(this.myScrollContainer.current.querySelectorAll(':scope > * > *'), 2.4, { x:"100vw", ease: Expo.easeOut, clearProps:"transform"}, 0.05, 0);
    this.myScrollContainerTween.play();

    this.myScrollContainer.current.addEventListener("wheel", this.onMouseEvent, false);
    this.myScrollContainer.current.addEventListener("scroll", this.onScrollEvent, false);

    TweenMax.ticker.addEventListener("tick", this.onRender);

  }

  onMouseEvent(e) {

    if (window.innerWidth < 768) return;

    this.scrolling = true;

    let delta;

    if ('wheelDelta' in e) {
      delta = e.wheelDelta / 5;
    } else {
      delta = -0.5 * e.deltaY;
    }

    this.scrollX = clamp(this.scrollX - delta, 0, this.myScrollContainer.current.querySelector(':scope > *').offsetWidth - window.innerWidth);

    e.preventDefault();

  }

  onScrollEvent(e) {

    if (!this.scrolling) {
      this.scrollX = e.currentTarget.scrollLeft;
      this.lastScrollX = e.currentTarget.scrollLeft;
    }

  }

  onRender() {

    if (!this.scrolling) return;

    if (Math.round((this.scrollX - this.lastScrollX) * 100) === 0) {
      if (this.scrolling) {
        this.scrolling = false;
      }
    }

    this.lastScrollX = lerp(this.lastScrollX, this.scrollX, 0.8);
    this.myScrollContainer.current.scrollLeft = this.lastScrollX;

    if (this.props.returnScroll) this.props.returnScroll(this.lastScrollX);

  }

  componentWillUnmount() {
    this.myScrollContainerTween.stop();
    this.myScrollContainerTween = null;
    this.myScrollContainer.current.removeEventListener("wheel", this.onMouseEvent, false);
    this.myScrollContainer.current.removeEventListener("scroll", this.onScrollEvent, false);
    TweenMax.ticker.removeEventListener("tick", this.onRender);
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
