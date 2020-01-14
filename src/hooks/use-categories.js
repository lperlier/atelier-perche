import { useStaticQuery, graphql } from "gatsby"
import kebabCase from "lodash/kebabCase"

const useCategories = (cat) => {

  const data = useStaticQuery( graphql`
    query {
      allCats:allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___project_cat) {
          fieldValue
          totalCount
          nodes {
            frontmatter {
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


  const resultCategories = data.allCats.group.map(category => {
      const randomProject = category.nodes[Math.floor(Math.random() * category.nodes.length)];
      const randomImage = randomProject.frontmatter.thumbnail ? randomProject.frontmatter.thumbnail.childImageSharp.fluid : randomProject.frontmatter.gallery[Math.floor(Math.random() * randomProject.frontmatter.gallery.length)].childImageSharp.fluid;

      return category = {
        slug : `/projets/${kebabCase(category.fieldValue)}/`,
        title : category.fieldValue,
        randomImage : randomImage
      }
    }
  )

  return resultCategories;

};

export default useCategories;
