import { useStaticQuery, graphql } from "gatsby"

const useProjects = () => {
  
  const data = useStaticQuery( graphql`
    query {
      allMarkdownRemark(filter: {frontmatter: {template : {eq : "projet" }}}) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              title
              description
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
      }
  }
  `);
  
  return data.allMarkdownRemark.edges.map(project => ({
      title : project.node.frontmatter.title,
      description : project.node.frontmatter.description,
      randomImage : project.node.frontmatter.gallery[Math.floor(Math.random()*project.node.frontmatter.gallery.length)].childImageSharp.fluid,
      slug : project.node.fields.slug
  }));
    
};

export default useProjects;