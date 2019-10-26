import React from 'react'
import { TweenLite, Expo } from "gsap/all";

// eslint-disable-next-line
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import { PageContent } from 'components/page/PageContent'

import s from './catalogue.module.scss'

export class Catalog extends React.Component {

  constructor(props) {

    super(props);
    this.data = {
      catalogImage : props.data.pageData.frontmatter.preview_catalogue.childImageSharp.fluid,
      catalogLink : props.data.pageData.frontmatter.catalogue_pdf.publicURL
    }

    this.myCatalogLink = React.createRef();

  }

  componentDidMount() {

    if (process.env.NODE_ENV === "development") console.log('Page Catalogue');

    TweenLite.fromTo(this.myCatalogLink.current, 1.4, { y: "100vh", x:"20vw", rotation:"20deg"}, { y:"0", x:"0", rotation:"0deg", ease: Expo.easeOut, clearProps:"all"});

  }

  render() {

    return (

      <main className={s.Catalogue__page}>
        <PageContent >
          <a className={s.Catalogue__link} href={this.data.catalogLink} ref={this.myCatalogLink} rel="noopener noreferrer" target="_blank">
            <Img fluid={this.data.catalogImage} />
          </a>
        </PageContent>
      </main>

    );
  }
}

export default Catalog;

export const pageQuery = graphql`
  query CatalogPageBySlug($slug: String!) {
    pageData:markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      frontmatter {
        preview_catalogue {
          childImageSharp {
            fluid {
              aspectRatio
              src
              srcSet
              sizes
            }
          }
        }
        catalogue_pdf {
          publicURL
        }
      }
    }
  }
`
