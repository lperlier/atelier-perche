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

    this.myCatalogTween.fromTo(this.myCataloguePage.current, 1.8, { y: "100%"}, { y:"0%", ease: Expo.easeOut, clearProps:"all"}, 0);
    this.myCatalogTween.fromTo(this.myCatalogLink.current, 1.8, { y: "-100%"}, { y:"0%", ease: Expo.easeOut }, 0);
    this.myCatalogTween.fromTo(this.myCatalogLink.current, 2.4, { x:"11%", scale:"2.6"}, { x:"0%", scale:"1", ease: Expo.easeInOut, clearProps:"all", delay:0.8}, 0);
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

        <PageContent >
          <a className={s.Catalogue__link} href={this.data.catalogLink} ref={this.myCatalogLink} rel="noopener noreferrer" target="_blank">
            <Img fluid={this.data.catalogImage} />
            <span className={s.Link__icon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11.362 2c4.156 0 2.638 6 2.638 6s6-1.65 6 2.457v11.543h-16v-20h7.362zm.827-2h-10.189v24h20v-14.386c0-2.391-6.648-9.614-9.811-9.614zm-5.189 12.5c0-.828.672-1.5 1.501-1.5.827 0 1.499.672 1.499 1.5s-.672 1.5-1.499 1.5c-.829 0-1.501-.672-1.501-1.5zm6.5.5l-2.093 2.968-1.31-.968-3.097 4h10l-3.5-6z"/></svg>
            </span>
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
