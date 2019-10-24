import React from 'react'
import { Link } from "gatsby"
import { Container } from 'components/container/Container'
import { Navbar } from 'components/header/Navbar'
import { ToggleMenu } from 'components/header/ToggleMenu'

import s from './Header.module.scss';

import LogoAtelier from 'assets/svg/logo_atelier.svg'

export const Header = () => (

  <header className={s.Header}>
    <Container className={s.Header__container}>

      <Link className={s.Brand} to="/">
        <LogoAtelier />
      </Link>

      <Navbar/>
      <ToggleMenu/>

    </Container>
  </header>

)
