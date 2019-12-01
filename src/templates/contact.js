import React from 'react'
import Helmet from 'react-helmet';

import { TimelineMax, Expo } from "gsap";

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
      contacts : props.data.pageData.frontmatter.contact_emails,
    }

    this.myPageContent = React.createRef();
    this.myPageVisual = React.createRef();
    this.AboutTween = null;

  }

  componentDidMount() {

    if (process.env.NODE_ENV === "development") console.log('Page Contact');

    this.AboutTween = new TimelineMax({
      paused : true
    });

    this.AboutTween.staggerFromTo(this.myPageContent.current.querySelectorAll(':scope > *'), 2.4, { y: "40", opacity:"0"}, { y:"0", opacity:"1", ease: Expo.easeOut, clearProps:"all", delay:0.5}, 0.2, 0);
    this.AboutTween.fromTo(this.myPageVisual.current, 1.4, { y: "50vw", rotation:"5deg"}, { y:"0vw", rotation:"0deg", ease: Expo.easeOut, clearProps:"all"}, 0);
    this.AboutTween.fromTo(this.myPageVisual.current.querySelector('.gatsby-image-wrapper'), 2.2, { scale: 1.6}, { scale:1, ease: Expo.easeOut, clearProps:"all"}, 0);
    this.AboutTween.play();

  }

  componentWillUnmount() {
    this.AboutTween.stop();
    this.AboutTween = null;
  }

  render() {

    return (

      <main className={s.Contact__page}>

        <Helmet title={this.data.title} />

        <PageContent>
          <Row>
            <Col className={s.Contact__visual} ref={this.myPageVisual}>
              <div className="mask">
                <Img fluid={this.data.portrait.childImageSharp.fluid} />
              </div>
            </Col>
            <Col className={s.Contact__content} ref={this.myPageContent}>
              <YSWYWContent html={this.data.html}/>
              <div className={s.Contact__address}>
                <address dangerouslySetInnerHTML={{ __html: this.data.adresse }} />
                <ul className={s.Contact__emails}>
                  {this.data.contacts.map(contact => (
                    <li className={s.Contact__email} key={contact.contact_name}>
                      <strong>{contact.contact_name} :</strong> <a href={`mailto:${contact.contact_email}`} className="Link" rel="noopener noreferrer">{contact.contact_email}</a>
                    </li>
                  ))}
                </ul>
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
        contact_emails {
          contact_name
          contact_email
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
