import { useStaticQuery, graphql } from "gatsby"

const useSocials = () => {

  const data = useStaticQuery( graphql`
    query {
      allMarkdownRemark(filter: {frontmatter: {template : {eq : "contact" }}}) {
        edges {
          node {
            id
            frontmatter {
              socials {
                facebook
                instagram
              }
            }
          }
        }
      }
    }
  `);

  const dataSocials = {
    facebook : data.allMarkdownRemark.edges[0].node.frontmatter.socials.facebook,
    instagram : data.allMarkdownRemark.edges[0].node.frontmatter.socials.instagram
  }

  return dataSocials;

};

export default useSocials;
