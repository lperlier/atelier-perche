import React from 'react'
import Helmet from 'react-helmet';

import { TimelineMax, Expo } from "gsap";

import { graphql } from 'gatsby'

import { ScrollContainer } from 'components/container/ScrollContainer'
import { ProjectVisual } from 'components/project/ProjectVisual'

import s from './projet.module.scss';

export class Project extends React.Component {

  constructor(props) {

    super(props);
    this.data = {
      title : props.data.pageData.frontmatter.title,
      html : props.data.pageData.html,
      gallery : props.data.pageData.frontmatter.gallery
    }
    this.myProjectHeader = React.createRef();
    this.ProjectTween = null;

  }

  componentDidMount() {

    if (process.env.NODE_ENV === "development") console.log('Page Projet');

    console.log(this.myProjectHeader.current.querySelectorAll(":scope > *"));

    this.ProjectTween = new TimelineMax({
      paused : true
    });
    this.ProjectTween.fromTo(this.myProjectHeader.current.querySelectorAll(":scope > *"), 1.4, { y: "40px", opacity:0}, { y:"0", opacity:1, ease: Expo.easeOut, clearProps:"all"}, 0.15, 0);
    this.ProjectTween.play();

  }

  componentWillUnmount() {
    this.ProjectTween.stop();
    this.ProjectTween = null;
  }

  render() {

    return (

      <article className={s.Project}>
        <Helmet title={this.data.title} />

        <div className={s.Project__header} ref={this.myProjectHeader}>
          <h1>{this.data.title}</h1>
          <div className={s.Project__description} dangerouslySetInnerHTML={{ __html: this.data.html }} />
        </div>

        <ScrollContainer className={s.Project__scrollcontainer}>
          {this.data.gallery.map((image, index) => (
            <ProjectVisual key={index} img={image.childImageSharp.fluid} />
          ))}
        </ScrollContainer>
      </article>

    );
  }
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
