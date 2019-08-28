import React from 'react'

import s from './Container.module.scss';

export const Container = ({ children, ...rest }) => {
  
  const passProps = { ...rest };
  let containerClasses = s.Container;
  if (passProps.className) containerClasses = [s.Container, passProps.className].join(' ');
  
  return (
    
    <div className={containerClasses}>
      {children}
    </div>
    
  )
}