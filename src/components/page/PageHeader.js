import React from 'react'

import { Container } from 'components/container/Container'

import s from './PageHeader.module.scss';

export const PageHeader = ({ children }) => (
  
  <>
    <div className={s.PageHeader}>
      <Container>
        {children}
      </Container>
    </div>
  </>
  
)