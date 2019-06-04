import React from 'react'

import s from './ToggleMenu.module.scss';

export class ToggleMenu extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {openMenu: false};
    this.toggleMenu = this.toggleMenu.bind(this);
  }
  
  toggleMenu = () => {
    
    this.setState({
      openMenu: !this.state.openMenu
    });
    
    //Toggle Class
    document.querySelector('body').classList.toggle('is--MenuOpen');
    
  }
  
  render() {
    return (
  
      <>
        <button className={s.ToggleMenu} onClick={this.toggleMenu}>
          <span className={s.line}></span>
          <span className={s.line}></span>
          <span className={s.line}></span>
        </button>
      </>
      
    )
  }
  
}