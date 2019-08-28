import React from 'react'
// eslint-disable-next-line
import { Link } from "gatsby"
import { graphql } from 'gatsby'

import { PageHeader } from 'components/page/PageHeader'
import { PageContent } from 'components/page/PageContent'

function List(props) {
  
  const childPosts = props.pageContext.children

  return (
    
      <main className="Archive">
        <PageHeader></PageHeader>
        <PageContent>
          {childPosts.map((child, index) => (
            <article key={index}>
              <Link to={child.node.fields.slug}>
                <h3>{child.node.frontmatter.title}</h3>
                <p>{child.node.excerpt}</p>
              </Link>
            </article>
          ))}
        </PageContent>
      </main>
      
  );
}

export default List;

export const pageQuery = graphql`
  query ListPageBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      frontmatter {
        title
      }
    }
  }
`
