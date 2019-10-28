import React from 'react'

import Img from 'gatsby-image'

import s from './ProjectVisual.module.scss';

export const ProjectVisual = ({img}) => {

  let imageClass = "is--portrait";
  if (img.aspectRatio > 1) imageClass = "is--paysage";

  return (

    <div className={`${s.ProjectVisual} ${imageClass}`}>
      <Img fluid={img} />
    </div>

  )

};
