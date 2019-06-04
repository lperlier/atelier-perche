import React from 'react'
// eslint-disable-next-line
import { Link } from "gatsby"
import { graphql } from 'gatsby'

import { PageHeader } from 'components/page/PageHeader'
import { PageContent } from 'components/page/PageContent'
import { YSWYWContent } from 'components/page/YSWYWContent'

function List(props) {
    
  const page = {
    title : props.data.markdownRemark.frontmatter.title,
    html : props.data.markdownRemark.html
  }
  
  const childPosts = props.pageContext.children

  return (
    
      <main className="Archive">
        <PageHeader>
          <h1>{page.title}</h1>
          <YSWYWContent html={page.html}/>
        </PageHeader>
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
