import React from 'react'
import { TweenMax, Expo } from "gsap";

import s from './ProjectCatTitle.module.scss';

export class ProjectCatTitle extends React.Component {

  constructor(props) {
    super(props);
    this.myProjectCatTitle = React.createRef();
  }

  componentDidMount() {
    TweenMax.from(this.myProjectCatTitle.current, 3.2, { x:"-100vw", ease: Expo.easeOut, clearProps:"transform"}, 0);
  }

  render() {

    return (

      <span className={`${s.ProjectCatTitle}`} ref={this.myProjectCatTitle}>
        {this.props.children}
      </span>

    )
  }

};
