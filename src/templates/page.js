import React from 'react'
import Helmet from 'react-helmet';

import { graphql } from 'gatsby'

import { PageHeader } from 'components/page/PageHeader'
import { PageContent } from 'components/page/PageContent'
import { YSWYWContent } from 'components/page/YSWYWContent'

function Page(props) {

  const page = {
    title : props.data.pageData.frontmatter.title,
    html : props.data.pageData.html
  }

  return (

    <main className="Single">

      <Helmet title={page.title} />

      <PageHeader>
        <h1>{page.title}</h1>
      </PageHeader>
      <PageContent >
        <YSWYWContent html={page.html}/>
      </PageContent>

    </main>

  );
}

export default Page;

export const pageQuery = graphql`
  query SinglePageBySlug($slug: String!) {
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
