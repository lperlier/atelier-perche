import React from 'react'
import { TimelineMax, Power3 } from "gsap/all";

import WknLogo from 'assets/svg/wkn.svg'

import s from './Intro.module.scss';

export class Intro extends React.Component {
  
  constructor(props) {
    
    super(props);
    this.myIntro = React.createRef();
    this.myIntroInner = React.createRef();
    this.myIntroBrand = React.createRef();
    this.introTween = null
    
  }
  
  componentDidMount() {
    
    this.introTween = new TimelineMax({
      paused: true,
      onStart: () => {
        document.body.classList.remove('is-first');
        document.body.classList.remove('is-loading');
      },
      onComplete: () => {
        document.body.classList.remove('is-animating');
      },
      delay: 0.6
    });


    this.introTween.fromTo(this.myIntroBrand.current, 1, { opacity: 0, scale: 1.2 }, { opacity: 1, scale: 1, ease: Power3.easeOut, clearProps: 'all' }, 0);
    this.introTween.fromTo(this.myIntroInner.current, 1, { y: 0 }, { y: '75%', ease: Power3.easeInOut, clearProps: 'all' }, 0.8);
    this.introTween.fromTo(this.myIntro.current, 1, { y: 0 }, { y: '-100%', ease: Power3.easeInOut, clearProps: 'all' }, 0.8);
    this.introTween.play();
    
  }
  
  render() {
    
    return (
      
      <>
      
        <div className={s.Intro} ref={this.myIntro}>
          <div className={s.Intro__inner} ref={this.myIntroInner}>
            <div className={s.brand} ref={this.myIntroBrand}>
              <WknLogo/>
            </div>
          </div>
        </div>
        
      </>
      
    )
  }
}
