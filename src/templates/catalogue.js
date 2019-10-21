import React from 'react'

// eslint-disable-next-line
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import { PageHeader } from 'components/page/PageHeader'

function Catalog(props) {

  const page = {
    title : props.data.pageData.frontmatter.title,
  }

  return (

    <main className="Single">
      <PageHeader>
        <h1>{page.title}</h1>
      </PageHeader>

    </main>

  );
}

export default About;

export const pageQuery = graphql`
  query CatalogPageBySlug($slug: String!) {
    pageData:markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      frontmatter {
        title
      }
    }
  }
`
