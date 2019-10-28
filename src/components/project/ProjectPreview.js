import React from 'react'

import { Link } from 'gatsby'
import Img from 'gatsby-image'

import s from './ProjectPreview.module.scss'

export const ProjectPreview = ({project}) => {

  let imageClass = "is--portrait";
  if (project.randomImage.aspectRatio > 1) imageClass = "is--paysage";

  return (

    <Link to={project.slug} className={`${s.ProjectPreview} ${imageClass}`}>
      <div className="visual__container">
        <div className={s.ProjectPreview__header}>
          <h3>{project.title}</h3>
        </div>
        <Img fluid={project.randomImage} />
      </div>
    </Link>

  )

};
