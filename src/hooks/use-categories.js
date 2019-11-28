import { useStaticQuery, graphql } from "gatsby"

const useCategories = (cat) => {

  const data = useStaticQuery( graphql`
    query {
      categoriesData:allMarkdownRemark(filter: {fields: {slug: {regex: "/projet/"}}, fileAbsolutePath: {regex: "/index.md/"}}) {
        edges {
          node {
            id
            fields {slug}
            frontmatter {
              title
            }
          }
        }
      }
      projectsData:allMarkdownRemark(filter: {frontmatter: {template : {eq : "projet" }}}) {
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



  const resultCategories = data.categoriesData.edges.filter(category => {

    const dataProjects = data.projectsData.edges.filter(project => {
      return project.node.frontmatter.type === category.node.frontmatter.title;
    });

    const randomProject = dataProjects[Math.floor(Math.random()*dataProjects.length)];
    if (randomProject) {
      const randomImage = randomProject.node.frontmatter.gallery[Math.floor(Math.random() * randomProject.node.frontmatter.gallery.length)].childImageSharp.fluid;
      category.randomImage = randomImage;
    }

    return dataProjects.length > 0;

  });

  return resultCategories.map(category => ({
      title : category.node.frontmatter.title,
      slug : category.node.fields.slug,
      randomImage : category.randomImage,
  }));

};

export default useCategories;
