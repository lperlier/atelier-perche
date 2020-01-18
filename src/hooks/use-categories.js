import { useStaticQuery, graphql } from "gatsby"
//import kebabCase from "lodash/kebabCase"

const useCategories = (cat) => {

  /*const data = useStaticQuery( graphql`
    query {
      allCats:allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___project_cat) {
          fieldValue
          totalCount
          nodes {
            frontmatter {
              gallery {
                childImageSharp {
                  fluid(maxWidth: 1600, quality: 80) {
                    aspectRatio
                    src
                    srcSet
                    sizes
                  }
                }
              }
              thumbnail {
                childImageSharp {
                  fluid(maxWidth: 400, quality: 80) {
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
  `);*/

  const data = useStaticQuery( graphql`
    query{
      markdownRemark(frontmatter: {template: {eq: "projets"}}) {
        frontmatter {
            title
            template
            amenagements_interieurs {
              slug
              title
              image {
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
            bibliotheques {
              slug
              title
              image {
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
            porte_revues {
              slug
              title
              image {
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
            tables {
              slug
              title
              image {
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
            tables_basses {
              slug
              title
              image {
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
  `);

  const categories = [
    {
      slug : `/projets/${data.markdownRemark.frontmatter.amenagements_interieurs.slug}`,
      title : data.markdownRemark.frontmatter.amenagements_interieurs.title,
      image : data.markdownRemark.frontmatter.amenagements_interieurs.image.childImageSharp.fluid
    },
    {
      slug : `/projets/${data.markdownRemark.frontmatter.bibliotheques.slug}`,
      title : data.markdownRemark.frontmatter.bibliotheques.title,
      image : data.markdownRemark.frontmatter.bibliotheques.image.childImageSharp.fluid
    },
    {
      slug : `/projets/${data.markdownRemark.frontmatter.porte_revues.slug}`,
      title : data.markdownRemark.frontmatter.porte_revues.title,
      image : data.markdownRemark.frontmatter.porte_revues.image.childImageSharp.fluid
    },
    {
      slug : `/projets/${data.markdownRemark.frontmatter.tables.slug}`,
      title : data.markdownRemark.frontmatter.tables.title,
      image : data.markdownRemark.frontmatter.tables.image.childImageSharp.fluid
    },
    {
      slug : `/projets/${data.markdownRemark.frontmatter.tables_basses.slug}`,
      title : data.markdownRemark.frontmatter.tables_basses.title,
      image : data.markdownRemark.frontmatter.tables_basses.image.childImageSharp.fluid
    }
  ]

  console.log(categories);

  return categories;

};

export default useCategories;
