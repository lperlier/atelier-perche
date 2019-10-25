import React from 'react'

import s from './ToggleMenu.module.scss';


export const ToggleMenu = (props) => {

    return (

      <>
        <button className={s.ToggleMenu} onClick={props.toggleMenu}>
          <span className={s.line}></span>
          <span className={s.line}></span>
          <span className={s.line}></span>
        </button>
      </>

    )

}
