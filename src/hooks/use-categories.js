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
            ameublement_interieur {
              slug
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
      slug : `/projets/${data.markdownRemark.frontmatter.ameublement_interieur.slug}`,
      image : data.markdownRemark.frontmatter.ameublement_interieur.image.childImageSharp.fluid
    },
    {
      slug : `/projets/${data.markdownRemark.frontmatter.bibliotheques.slug}`,
      image : data.markdownRemark.frontmatter.bibliotheques.image.childImageSharp.fluid
    },
    {
      slug : `/projets/${data.markdownRemark.frontmatter.porte_revues.slug}`,
      image : data.markdownRemark.frontmatter.porte_revues.image.childImageSharp.fluid
    },
    {
      slug : `/projets/${data.markdownRemark.frontmatter.tables.slug}`,
      image : data.markdownRemark.frontmatter.tables.image.childImageSharp.fluid
    },
    {
      slug : `/projets/${data.markdownRemark.frontmatter.tables_basses.slug}`,
      image : data.markdownRemark.frontmatter.tables_basses.image.childImageSharp.fluid
    }
  ]

  console.log(categories);

  return categories;

};

export default useCategories;
