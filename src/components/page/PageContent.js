import React from 'react'

import { Container } from 'components/container/Container'

import s from './PageContent.module.scss';

export const PageContent = ({ children }) => (
  
  <>
    <div className={s.PageContent}>
      <Container>
        {children}
      </Container>
    </div>
  </>
  
)