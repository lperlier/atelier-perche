import React from 'react'

// eslint-disable-next-line
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import Facebook from 'assets/svg/facebook.svg'
import Instagram from 'assets/svg/instagram.svg'

import { PageContent } from 'components/page/PageContent'
import { YSWYWContent } from 'components/page/YSWYWContent'
import { Row } from 'components/row/Row'

function About(props) {

  const page = {
    title : props.data.pageData.frontmatter.title,
    html : props.data.pageData.html,
    adresse : props.data.pageData.frontmatter.adresse,
    portrait : props.data.pageData.frontmatter.image,
    socials : props.data.pageData.frontmatter.socials,
    contact : props.data.pageData.frontmatter.contact_email,
    contact2 : props.data.pageData.frontmatter.contact_email_2
  }

  return (

    <main className="Contact__page">
      <PageContent>
        <Row>
          <div className="content">
            <YSWYWContent html={page.html}/>
            <address dangerouslySetInnerHTML={{ __html: page.adresse }} />
            <a href={`mailto:${page.contact}`} className="Link" rel="noopener noreferrer">{page.contact}</a><br/>
            <a href={`mailto:${page.contact}`} className="Link" rel="noopener noreferrer">{page.contact2}</a>

            <div className="Socials">
              <a href={page.socials.facebook} rel="noopener noreferrer" target="_blank"><Facebook /></a>
              <a href={page.socials.instagram} rel="noopener noreferrer" target="_blank"><Instagram /></a>
            </div>
          </div>
          <div className="visual">
            <Img fluid={page.portrait.childImageSharp.fluid} />
          </div>
        </Row>

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
