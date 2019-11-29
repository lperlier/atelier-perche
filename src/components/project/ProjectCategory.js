import React from 'react'

import { Link } from 'gatsby'
import Img from 'gatsby-image'

import s from './ProjectCategory.module.scss'

export const ProjectCategory = ({category}) => {

  return (

    <Link to={category.slug} className={`${s.CategoryPreview}`}>
      <span className={s.CategoryPreview__title}>{category.title}</span>
      <div className="visual__container">
        <Img fluid={category.randomImage} />
      </div>
    </Link>

  )

};
