import React from 'react'
import { TweenLite, Power3 } from "gsap";

import { Header } from 'components/header/Header';
//import { Intro } from 'components/intro/Intro';

import s from './AppContainer.module.scss';

export class AppContainer extends React.Component {

  constructor(props) {

    super(props);
    //this.myIntro = React.createRef();
    this.myHeader = React.createRef();

  }

  componentDidMount() {

    if (process.env.NODE_ENV === "development") console.log('New App Layout');
    document.body.classList.remove('is--first');
    document.body.classList.remove('is--loading');
    document.body.classList.remove('is--animating');
    //this.myIntro.current.playIntro();

    TweenLite.from(this.myHeader.current.myHeader.current, 1.2, {opacity:0, ease:Power3.easeNone, delay:0.5});

  }

  render() {

    return (
      <>
        <div className={s.App}>
          <Header ref={this.myHeader}/>
          {this.props.children}
        </div>
      </>
    )
  }

}
