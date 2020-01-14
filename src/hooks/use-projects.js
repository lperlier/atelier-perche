import { useStaticQuery, graphql } from "gatsby"

const useProjects = (cat) => {

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
              project_cat
              thumbnail {
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

  let dataResults;
  if(cat) {
    dataResults = data.allMarkdownRemark.edges.filter(project => {
      return project.node.frontmatter.type === cat;
    });
  } else {
    dataResults = data.allMarkdownRemark.edges;
  }

  return dataResults.map(project => ({
      title : project.node.frontmatter.title,
      category : project.node.frontmatter.project_cat,
      description : project.node.frontmatter.description,
      thumbnail : project.node.frontmatter.thumbnail.childImageSharp.fluid,
      slug : project.node.fields.slug
  }));

};

export default useProjects;
