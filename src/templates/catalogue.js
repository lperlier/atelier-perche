import React from 'react'

// eslint-disable-next-line
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import { PageContent } from 'components/page/PageContent'

function Catalog(props) {

  const page = {
    title : props.data.pageData.frontmatter.title,
    catalogImage : props.data.pageData.frontmatter.preview_catalogue.childImageSharp.fluid,
    catalogLink : props.data.pageData.frontmatter.catalogue_pdf.publicURL
  }

  return (

    <main className="Catalogue__page">
      <PageContent >
        <a href={page.catalogLink} rel="noopener noreferrer" target="_blank">
          <Img fluid={page.catalogImage} />
        </a>
      </PageContent>
    </main>

  );
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
