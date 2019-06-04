import React from 'react'
// eslint-disable-next-line
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import { PageHeader } from 'components/page/PageHeader'
import { PageContent } from 'components/page/PageContent'

function Project(props) {
    
  const project = {
    title : props.data.pageData.frontmatter.title,
    html : props.data.pageData.html,
    description : props.data.pageData.frontmatter.description,
    gallery : props.data.pageData.frontmatter.gallery
  }
  
  console.log(project);

  return (
    
      <article className="Projet">
        <PageHeader>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
        </PageHeader>
        <PageContent >
          {project.gallery.map((image, index) => (
            <Img key={index} fluid={image.childImageSharp.fluid} />
          ))}
        </PageContent>
      </article>
    
  );
  
}

export default Project;

export const pageQuery = graphql`
  query ProjetBySlug($slug: String!) {
    pageData:markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      frontmatter {
        title
        description
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
`