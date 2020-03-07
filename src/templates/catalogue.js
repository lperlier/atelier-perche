import React from 'react'
import Helmet from 'react-helmet';

import { TimelineMax, Expo } from "gsap";

import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import { PageContent } from 'components/page/PageContent'

import s from './catalogue.module.scss'

export class Catalog extends React.Component {

  constructor(props) {

    super(props);
    this.data = {
      title : props.data.pageData.frontmatter.title,
      catalogImage : props.data.pageData.frontmatter.preview_catalogue.childImageSharp.fluid,
      catalogLink : props.data.pageData.frontmatter.catalogue_pdf.publicURL
    }

    this.myCataloguePage = React.createRef();
    this.myCatalogLink = React.createRef();
    this.myCatalogTween = null;

  }

  componentDidMount() {

    if (process.env.NODE_ENV === "development") console.log('Page Catalogue');

    this.myCatalogTween = new TimelineMax({
      paused : true,
      onComplete: () => {
        this.myCatalogLink.current.classList.add('is--active');
      }
    });

    this.myCatalogTween.fromTo(this.myCatalogLink.current, 1.8, { opacity:0, scale:"1.4"}, { opacity:1, scale:"1", ease: Expo.easeInOut, clearProps:"all"}, 0);
    this.myCatalogTween.play();

  }

  componentWillUnmount() {
    this.myCatalogTween.stop();
    this.myCatalogTween = null;
  }

  render() {

    return (

      <main className={s.Catalogue__page} ref={this.myCataloguePage}>

        <Helmet title={this.data.title} />

        <PageContent>
          <h1 className="sr-only">{this.data.title}</h1>
          <a className={s.Catalogue__link} href={this.data.catalogLink} ref={this.myCatalogLink} rel="noopener noreferrer" target="_blank">
            <Img fluid={this.data.catalogImage} />
            <span className={s.Link__icon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="30" viewBox="0 0 46.03 52.39">
                <path d="M46,52.39H0V41.27a2.48,2.48,0,1,1,5,0v6.16H41.07V41.27a2.48,2.48,0,1,1,5,0Z"/>
                <path d="M11.7,21.76a3.11,3.11,0,0,1,4.41,0l3.79,3.8V3.11a3.12,3.12,0,0,1,6.23,0V25.56l3.79-3.8a3.11,3.11,0,1,1,4.4,4.4l-9.11,9.11a3.07,3.07,0,0,1-2.2.91,3.1,3.1,0,0,1-2.2-.91h0L11.7,26.16A3.12,3.12,0,0,1,11.7,21.76Z"/>
              </svg>
            </span>
            <span className="sr-only">Télécharger notre catalogue</span>
          </a>
        </PageContent>
      </main>

    );
  }
}

export default Catalog;

export const pageQuery = graphql`
  query CatalogPageBySlug($slug: String!) {
    pageData:markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      frontmatter {
        title
        preview_catalogue {
          childImageSharp {
            fluid(maxWidth: 1600, quality: 100) {
              aspectRatio
              src
              srcSet
              sizes
            }
          }
        }
        catalogue_pdf {
          publicURL
        }
      }
    }
  }
`
