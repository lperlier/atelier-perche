import React from 'react'

import s from './YSWYWContent.module.scss';

export const YSWYWContent = ({ html }) => (
  
  <>
    <div className={s.YSWYWContent} dangerouslySetInnerHTML={{ __html: html }} />
  </>
  
)