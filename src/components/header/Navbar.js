import React from 'react'
import { Link } from "gatsby"

import useMenu from 'hooks/use-menu';
import useCategories from 'hooks/use-categories';

import s from './Navbar.module.scss';

export const Navbar = (props) => {

  const menu = useMenu();
  const categories = useCategories();

  return (
    <nav className={s.Nav}>
      <ul className={s.Nav__Main}>
        {menu.map((link, index) => {

          if (index === 0 ) {
            console.log(categories);
          }

          return (

            <li key={link.id} className={ index === 0 ? `${s.Nav__item} has--childs` : s.Nav__item }>
              <Link to={link.url} className={s.Nav__link} activeClassName={ s.Nav__link__Active } partiallyActive={true} onClick={props.onClick}>{link.title}</Link>

              {index === 0 &&
                <ul className={ s.Nav__childs }>
                  {categories.map((category, index) => {

                      return (
                        <li key={index}>
                          <Link to={category.slug} className={s.Nav__link} activeClassName={ s.Nav__link__Active } partiallyActive={true} onClick={props.onClick}>{category.title}</Link>
                        </li>
                      )
                      
                  })}
                </ul>
              }

            </li>
          )

        })}
      </ul>
    </nav>
  )

}
