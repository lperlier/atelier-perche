import React from 'react'
import Helmet from 'react-helmet';
import { normalize } from "utils/utils.js";

import { TimelineMax, TweenMax, Expo, Power0 } from "gsap";
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
      this.myScrollContainer = React.createRef();
      this.myCatTitle = React.createRef();

    }

    componentDidMount() {

      if (process.env.NODE_ENV === "development") console.log('Page Projets');

      TweenMax.fromTo(this.myBackLink.current, 1.4, { x: -40, opacity:0}, { x:0, opacity:1, ease: Expo.easeOut, clearProps:"all"}, 0.5);

      this.CatTitleTimeline = new TimelineMax({paused:true});
      this.CatTitleTimeline.fromTo(this.myCatTitle.current, 1, {x: 0 }, {x: -1 * (this.myCatTitle.current.offsetWidth - window.innerWidth), ease:Power0.easeNone }, 0);

    }

    getScroll(scroll) {

        if (this.myScrollContainer.current.myScrollContainer.current.querySelector(":scope > *").offsetWidth < this.myScrollContainer.current.myScrollContainer.current.offsetWidth) return;
      const scrollX = normalize(scroll, 0, this.myScrollContainer.current.myScrollContainer.current.querySelector(":scope > *").offsetWidth - this.myScrollContainer.current.myScrollContainer.current.offsetWidth);
      this.CatTitleTimeline.progress(scrollX);

    }

    render(){

      return(

        <main className="Category__Page">
          <Helmet title={this.category} />

          <Link to="/projets" className="BackLink" ref={this.myBackLink}>Retour</Link>

          <ScrollContainer ref={this.myScrollContainer} returnScroll={this.getScroll.bind(this)}>

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


          <ProjectCatTitle>
            <span ref={this.myCatTitle}>{this.category}</span>
          </ProjectCatTitle>
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
