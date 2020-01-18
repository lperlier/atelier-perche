import React from 'react'

import { Link } from 'gatsby'
import Img from 'gatsby-image'

import s from './ProjectCategory.module.scss'

export const ProjectCategory = ({category}) => {

  let imageClass = "is--portrait";
  if (category.image.aspectRatio > 1) imageClass = "is--paysage";

  return (

    <Link to={category.slug} className={`${s.CategoryPreview} ${imageClass}`}>
      <div className="visual__container">
        <Img fluid={category.image} />
      </div>
      <span className={s.CategoryPreview__title}>{category.title}</span>
    </Link>

  )

};
