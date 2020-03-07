import React from 'react'

import { Link } from 'gatsby'
import Img from 'gatsby-image'

import s from './ProjectPreview.module.scss'

export const ProjectPreview = ({project}) => {

  let imageClass = "is--portrait";
  if (project.thumbnail.aspectRatio > 1) imageClass = "is--paysage";

  return (

    <Link to={project.slug} className={`${s.ProjectPreview} ${imageClass}`}>
      <div className="visual__container">
        <Img fluid={project.thumbnail} />
      </div>
      <div className={s.ProjectPreview__header}>
        <h2>{project.title}</h2>
      </div>
    </Link>

  )

};
