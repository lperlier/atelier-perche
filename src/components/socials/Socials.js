import React from 'react'

import Facebook from 'assets/svg/facebook.svg'
import Instagram from 'assets/svg/instagram.svg'

import s from './Socials.module.scss';
import useSocials from 'hooks/use-socials';

export const Socials = (props) => {

  const socials = useSocials();

  return (

    <div className={s.Socials}>
      <a href={socials.facebook} rel="noopener" target="_blank"><Facebook /></a>
      <a href={socials.instagram} rel="noopener" target="_blank"><Instagram /></a>
    </div>

  )

};
