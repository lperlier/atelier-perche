import React from 'react'

// eslint-disable-next-line
import { graphql } from 'gatsby'

import { PageHeader } from 'components/page/PageHeader'
import { PageContent } from 'components/page/PageContent'

function Catalog(props) {

  const page = {
    title : props.data.pageData.frontmatter.title,
    catalog : props.data.pageData.frontmatter.catalogue_pdf.publicURL
  }

  return (

    <main className="Single">
      <PageHeader>
        <h1>{page.title}</h1>
      </PageHeader>
      <PageContent >
        <a href={page.catalog} rel="noopener noreferrer" target="_blank">catalogue pdf</a>
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
        title
        catalogue_pdf {
          publicURL
        }
      }
    }
  }
`
