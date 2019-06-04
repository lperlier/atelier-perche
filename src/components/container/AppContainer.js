import React from 'react'

import { Header } from 'components/header/Header';
import { Intro } from 'components/intro/Intro';

import s from './AppContainer.module.scss';

export class AppContainer extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { marginBottom : 0 };
  }
  
  getFooterSize = (dimensions) => {
    this.setState({
      marginBottom: dimensions.height
    });
  }
  
  componentDidMount() {
    console.log('New App Layout');
    document.body.classList.add('is-first');
    document.body.classList.add('is-loading');
    document.body.classList.add('is-animating');
  }
  
  render() {
    
    const { marginBottom } = this.state;
    
    return (
      <>
        <div className={s.App} style={{ marginBottom : marginBottom }}>
          <Header />
          {this.props.children}
          <Intro />
        </div>
      </>
    )
  }
  
}