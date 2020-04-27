import React from 'react'
import Helmet from 'react-helmet';
import kebabCase from "lodash/kebabCase"

import { TimelineMax, Expo } from "gsap";
import Modal from 'react-modal';

import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'

import { ScrollContainer } from 'components/container/ScrollContainer'
import { ProjectVisual } from 'components/project/ProjectVisual'

import s from './projet.module.scss';

export class Project extends React.Component {

  constructor(props) {

    super(props);

    this.data = {
      title : props.data.pageData.frontmatter.title,
      category : props.data.pageData.frontmatter.project_cat,
      html : props.data.pageData.html,
      gallery : props.data.pageData.frontmatter.gallery,
      thumbnail : props.data.pageData.frontmatter.thumbnail
    };

    this.state = {
      modalIsOpen: false,
      selectedImage: null
    };

    this.myProjectHeader = React.createRef();
    this.myProjectModal = React.createRef();
    this.myBackLink = React.createRef();
    this.ProjectTween = null;
    this.ModalOpenTween = null;
    this.ModalCloseTween = null;

  }

  componentDidMount() {

    if (process.env.NODE_ENV === "development") console.log('Page Projet');

    Modal.setAppElement('body');

    this.ProjectTween = new TimelineMax({
      paused : true
    });
    this.ProjectTween.staggerFromTo(this.myProjectHeader.current.querySelectorAll(":scope > *"), 1.4, { y: "40px", opacity:0}, { y:"0", opacity:1, ease: Expo.easeOut, clearProps:"all"}, 0.15, 0);
    this.ProjectTween.fromTo(this.myBackLink.current, 1.4, { x: -40, opacity:0}, { x:0, opacity:1, ease: Expo.easeOut, clearProps:"all"}, 0.5);
    this.ProjectTween.play();

  }

  componentWillUnmount() {
    this.ProjectTween.stop();
    this.ProjectTween = null;
  }

  openModal(image) {
    this.setState({modalIsOpen: true});
    this.setState({selectedImage: image});
  }

  afterOpenModal() {

    this.ModalOpenTween = new TimelineMax({
      paused : true
    });

    this.ModalOpenTween.fromTo(this.myProjectModal.current.node.querySelector(".ReactModal__Overlay"), 0.5, { opacity: 0}, { opacity:1, ease: Expo.easeOut, clearProps:"opcaity"}, 0);
    this.ModalOpenTween.fromTo(this.myProjectModal.current.node.querySelector(".ReactModal__Content"), 1.4, { y: "100vw"}, { y:"0", ease: Expo.easeOut, clearProps:"transform"}, 0);
    this.ModalOpenTween.fromTo(this.myProjectModal.current.node.querySelector(".gatsby-image-wrapper"), 1.4, { y: "-80vw", scale:1.15}, { y:"0", scale:1, ease: Expo.easeOut, clearProps:"transform"}, 0);
    this.ModalOpenTween.play();

  }

  closeModal() {

    this.ModalCloseTween = new TimelineMax({
      paused : true,
      onComplete : () => {
        this.setState({modalIsOpen: false});
      }
    });

    this.ModalCloseTween.fromTo(this.myProjectModal.current.node.querySelector(".ReactModal__Overlay"), 0.2, { opacity: 1}, { opacity:0, clearProps:"opcaity"}, 0);
    this.ModalCloseTween.play();
  }

  render() {

    const { modalIsOpen, selectedImage } = this.state;

    return (

      <article className={s.Project}>

        <Helmet>
          <title>{this.data.title}</title>
          <meta name="description" content={`${this.data.title}, ${this.data.html.replace(/(<p>|<\/p>)/g, '')}`} />
        </Helmet>

        <Link to={`/projets/${kebabCase(this.data.category)}/`} className="BackLink" ref={this.myBackLink}>Retour</Link>

        <div className={s.Project__header} ref={this.myProjectHeader}>
          <h1>{this.data.title}</h1>
          <div className={s.Project__description} dangerouslySetInnerHTML={{ __html: this.data.html }} />
          <p class="sr-only">Nous privilégions les circuits courts et utilisons des bois abattus en France (Forêts du Perche, pays de Loire, Bourgogne). Nous travaillons avec les acteurs de la filière qui exploitent durablement les forêts françaises. Le principal bois utilisé est le chêne, mais nous pouvons sur demande travailler toutes autres essences (frêne, hêtre, châtaigner, noyer…)</p>
        </div>

        <ScrollContainer className={s.Project__scrollcontainer}>
          {this.data.gallery.map((image, index) => (
            <button className={s.Project__item} key={index} onClick={() => this.openModal(image)} aria-label="Agrandir">
              <ProjectVisual img={image.childImageSharp.thumbnail} />
            </button>
          ))}
        </ScrollContainer>

        <Modal isOpen={modalIsOpen} ref={this.myProjectModal} className={s.Project__fullView} onAfterOpen={() => this.afterOpenModal()} >
          {modalIsOpen && (<Img fluid={selectedImage.childImageSharp.full} onClick={() => this.closeModal()}/>)}
        </Modal>

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
        project_cat
        gallery {
          childImageSharp {
            thumbnail: fluid(maxWidth: 400, quality: 80) {
              aspectRatio
              src
              srcSet
              sizes
            }
            full: fluid(maxWidth: 1600, quality: 80) {
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
