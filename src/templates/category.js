import React from 'react'
import Helmet from 'react-helmet';

import { graphql } from 'gatsby'

import { ScrollContainer } from 'components/container/ScrollContainer'
import { ProjectPreview } from 'components/project/ProjectPreview'
import { ProjectCatTitle } from 'components/project/ProjectCatTitle'

function List({ pageContext, data }) {

    const { category } = pageContext
    const { edges } = data.allMarkdownRemark;

    return (

      <main className="Category__Page">
        <Helmet title={category} />
        <ScrollContainer>

            {edges.map(({ node }) => {

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


        <ProjectCatTitle>{category}</ProjectCatTitle>
      </main>

    )
}

export default List;

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
