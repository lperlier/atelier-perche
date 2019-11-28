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
              type
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

  let dataResults;
  if(cat) {
    dataResults = data.allMarkdownRemark.edges.filter(project => {
      return project.node.frontmatter.type === cat;
    });
  } else {
    dataResults = data.allMarkdownRemark.edges;
  }

  console.log(dataResults);

  return dataResults.map(project => ({
      title : project.node.frontmatter.title,
      type : project.node.frontmatter.type,
      description : project.node.frontmatter.description,
      randomImage : project.node.frontmatter.gallery[Math.floor(Math.random()*project.node.frontmatter.gallery.length)].childImageSharp.fluid,
      slug : project.node.fields.slug
  }));

};

export default useProjects;
