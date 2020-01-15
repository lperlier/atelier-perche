import React from 'react'

import { Link } from 'gatsby'
import Img from 'gatsby-image'

import s from './ProjectCategory.module.scss'

export const ProjectCategory = ({category}) => {

  let imageClass = "is--portrait";
  if (category.randomImage.aspectRatio > 1) imageClass = "is--paysage";

  return (

    <Link to={category.slug} className={`${s.CategoryPreview} ${imageClass}`}>
      <div className="visual__container">
        <Img fluid={category.randomImage} />
      </div>
      <span className={s.CategoryPreview__title}>{category.title}</span>
    </Link>

  )

};
