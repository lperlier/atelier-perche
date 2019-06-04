import React from 'react'

// eslint-disable-next-line
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import { PageHeader } from 'components/page/PageHeader'
import { PageContent } from 'components/page/PageContent'
import { YSWYWContent } from 'components/page/YSWYWContent'

function About(props) {
    
  const page = {
    title : props.data.pageData.frontmatter.title,
    html : props.data.pageData.html,
    adresse : props.data.pageData.frontmatter.adresse,
    portrait : props.data.pageData.frontmatter.image,
    socials : props.data.pageData.frontmatter.socials,
    contact : props.data.pageData.frontmatter.email,
  }
  
  console.log(page);

  return (
    
    <main className="Single">
      <PageHeader>
        <h1>{page.title}</h1>
      </PageHeader>
      <PageContent >
        <YSWYWContent html={page.html}/>
        
        <address>{page.adresse}</address>
        
        <a href="mailto{page.contact}" target="_blank">{page.contact}</a>
        <a href={page.socials.facebook} rel="noopener noreferrer" target="_blank">facebook</a>
        <a href={page.socials.twitter} rel="noopener noreferrer" target="_blank">twitter</a>
        <a href={page.socials.instagram} rel="noopener noreferrer" target="_blank">instagram</a>
        
        <Img fluid={page.portrait.childImageSharp.fluid} />
      </PageContent>
      
    </main>
      
  );
}

export default About;

export const pageQuery = graphql`
  query AboutPageBySlug($slug: String!) {
    pageData:markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      frontmatter {
        title
        adresse
        email
        socials {
          facebook
          twitter
          instagram
        }
        image {
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
