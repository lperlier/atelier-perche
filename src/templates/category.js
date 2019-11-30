import React from 'react'
import Helmet from 'react-helmet';

import { TweenMax, Expo } from "gsap";
import { Link, graphql } from 'gatsby'

import { ScrollContainer } from 'components/container/ScrollContainer'
import { ProjectPreview } from 'components/project/ProjectPreview'
import { ProjectCatTitle } from 'components/project/ProjectCatTitle'

class Category extends React.Component {

    constructor(props) {
      super(props);
      this.category = this.props.pageContext.category
      this.edges = this.props.data.allMarkdownRemark.edges;

      this.myBackLink = React.createRef();

    }

    componentDidMount() {

      if (process.env.NODE_ENV === "development") console.log('Page Projets');

      TweenMax.fromTo(this.myBackLink.current, 1.4, { y: "40px", opacity:0}, { y:"0", opacity:1, ease: Expo.easeOut, clearProps:"all"}, 0.5);

    }

    getScroll(scroll) {
      console.log(scroll);
    }

    render(){

      return(

        <main className="Category__Page">
          <Helmet title={this.category} />

          <Link to="/projets" className="BackLink" ref={this.myBackLink}>Retour</Link>

          <ScrollContainer returnScroll={this.getScroll}>

              {this.edges.map(({ node }) => {

                const project = {
                  slug : node.fields.slug,
                  title : node.frontmatter.title,
                  randomImage : node.frontmatter.gallery[Math.floor(Math.random()*node.frontmatter.gallery.length)].childImageSharp.fluid
                }

                return (
                  <ProjectPreview key={project.slug} project={project} />
                )

              })}

          </ScrollContainer>


          <ProjectCatTitle>{this.category}</ProjectCatTitle>
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
                fluid {
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
