import React from 'react'
import { TweenMax, Expo } from "gsap/all";

// eslint-disable-next-line
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import { PageContent } from 'components/page/PageContent'
import { YSWYWContent } from 'components/page/YSWYWContent'
import { Row } from 'components/row/Row'
import { Col } from 'components/row/Col'
import { Socials } from 'components/socials/Socials'

import s from './contact.module.scss'

export class About extends React.Component {

  constructor(props) {

    super(props);
    this.data = {
      title : props.data.pageData.frontmatter.title,
      html : props.data.pageData.html,
      adresse : props.data.pageData.frontmatter.adresse,
      portrait : props.data.pageData.frontmatter.image,
      contact : props.data.pageData.frontmatter.contact_email,
      contact2 : props.data.pageData.frontmatter.contact_email_2
    }

    this.myPageContent = React.createRef();
    this.myPageVisual = React.createRef();

  }

  componentDidMount() {

    if (process.env.NODE_ENV === "development") console.log('Page Contact');

    console.log(this.myPageVisual.current.querySelector('.gatsby-image-wrapper'));

    TweenMax.staggerFromTo(this.myPageContent.current.querySelectorAll(':scope > *'), 2.4, { y: "40", opacity:"0"}, { y:"0", opacity:"1", ease: Expo.easeOut, clearProps:"all", delay:0.5}, 0.2);
    TweenMax.fromTo(this.myPageVisual.current.querySelector('.gatsby-image-wrapper'), 1.4, { y: "50vw", rotation:"5deg"}, { y:"0vw", rotation:"0deg", ease: Expo.easeOut, clearProps:"all"});
    TweenMax.fromTo(this.myPageVisual.current.querySelector('picture'), 2.2, { scale: 1.6}, { scale:1, ease: Expo.easeOut, clearProps:"all"});

  }

  render() {

    return (

      <main className={s.Contact__page}>
        <PageContent>

          <Row>
            <Col className={s.Contact__visual} ref={this.myPageVisual}>
              <Img fluid={this.data.portrait.childImageSharp.fluid} />
            </Col>
            <Col className={s.Contact__content} ref={this.myPageContent}>
              <YSWYWContent html={this.data.html}/>
              <div className={s.Contact__address}>
                <address dangerouslySetInnerHTML={{ __html: this.data.adresse }} />
                <a href={`mailto:${this.data.contact}`} className="Link" rel="noopener noreferrer">{this.data.contact}</a><br/>
                <a href={`mailto:${this.data.contact}`} className="Link" rel="noopener noreferrer">{this.data.contact2}</a>
              </div>
              <Socials/>
            </Col>
          </Row>

        </PageContent>
      </main>

    )
  }
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
