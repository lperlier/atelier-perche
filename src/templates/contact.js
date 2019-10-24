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
    contact : props.data.pageData.frontmatter.contact_email,
    contact2 : props.data.pageData.frontmatter.contact_email_2,
  }

  const mailcontact = `mailto:${page.contact}`
  const mailcontact2 = `mailto:${page.contact2}`

  return (

    <main className="Single">
      <PageHeader>
        <h1>{page.title}</h1>
      </PageHeader>
      <PageContent >
        <YSWYWContent html={page.html}/>

        <address dangerouslySetInnerHTML={{ __html: page.adresse }} />

        <a href={mailcontact} className="Link" rel="noopener noreferrer">{page.contact}</a>
        <a href={mailcontact2} className="Link" rel="noopener noreferrer">{page.contact2}</a>
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
        contact_email
        contact_email_2
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
