import React from 'react'
import Helmet from 'react-helmet';

import { TweenMax, Expo } from "gsap";
import { Link, graphql } from 'gatsby'

import { ScrollContainer } from 'components/container/ScrollContainer'
import { ProjectPreview } from 'components/project/ProjectPreview'

import s from './category.module.scss'

class Category extends React.Component {

    constructor(props) {
      super(props);
      this.category = this.props.pageContext.category
      this.edges = this.props.data.allMarkdownRemark.edges;

      this.myBackLink = React.createRef();
      this.myCatTitle = React.createRef();
      this.myScrollContainer = React.createRef();

    }

    componentDidMount() {

      if (process.env.NODE_ENV === "development") console.log('Page Projets');

      TweenMax.fromTo(this.myBackLink.current, 1.4, { x: -40, opacity:0}, { x:0, opacity:1, ease: Expo.easeOut, clearProps:"all"}, 0.5);
      TweenMax.fromTo(this.myCatTitle.current, 1.4, { x: -40, opacity:0}, { x:0, opacity:1, ease: Expo.easeOut, clearProps:"all"}, 1);

    }

    render(){

      return(

        <main className={s.Category__page} >
          <Helmet title={this.category} />

          <Link to="/projets" className="BackLink" ref={this.myBackLink}>Retour</Link>
          <h1 ref={this.myCatTitle}>{this.category}</h1>

          <ScrollContainer ref={this.myScrollContainer}>

              {this.edges.map(({ node }) => {

                const project = {
                  slug : node.fields.slug,
                  title : node.frontmatter.title,
                  thumbnail : node.frontmatter.thumbnail ? node.frontmatter.thumbnail.childImageSharp.fluid : node.frontmatter.gallery[Math.floor(Math.random()*node.frontmatter.gallery.length)].childImageSharp.fluid
                }

                return (
                  <ProjectPreview key={project.slug} project={project} />
                )

              })}

          </ScrollContainer>
        </main>

      )
    }
}

export default Category;

export const pageQuery = graphql`
  query PageByCat($category: String) {
    allMarkdownRemark(
      limit: 2000
      filter: { frontmatter: { project_cat: { in: [$category] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            gallery {
              childImageSharp {
                fluid(maxWidth: 400, quality: 80) {
                  aspectRatio
                  src
                  srcSet
                  sizes
                }
              }
            }
            thumbnail {
              childImageSharp {
                fluid(maxWidth: 400, quality: 80) {
                  aspectRatio
                  src
                  srcSet
                  sizes
                }
              }
            }
          }
        }
      }
    }
  }
`
