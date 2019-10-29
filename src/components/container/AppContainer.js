import React from 'react'

import { Header } from 'components/header/Header';
import { Intro } from 'components/intro/Intro';

import s from './AppContainer.module.scss';

export class AppContainer extends React.Component {

  constructor(props) {

    super(props);
    this.myIntro = React.createRef();

  }

  componentDidMount() {

    if (process.env.NODE_ENV === "development") console.log('New App Layout');

    this.myIntro.current.playIntro();

  }

  render() {

    return (
      <>
        <div className={s.App}>
          <Header />
          {this.props.children}
          <Intro ref={this.myIntro}/>
        </div>
      </>
    )
  }

}
