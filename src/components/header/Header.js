import React from 'react'
import { Link } from "gatsby"
import { Container } from 'components/container/Container'
import Navbar from 'components/header/Navbar'
import { ToggleMenu } from 'components/header/ToggleMenu'

import s from './Header.module.scss';

import WknLogo from 'assets/svg/wkn.svg'

export const Header = () => (
  
  <>
    <header className={s.Header}>
      <Container className={s.Header__container}>
      
        <Link className={s.Brand} to="/">
          <WknLogo />
        </Link>
        
        <Navbar/>
        <ToggleMenu/>
        
      </Container>
    </header>
  </>
  
)