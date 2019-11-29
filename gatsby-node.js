const path = require('path')
const _ = require("lodash")
const { createFilePath } = require('gatsby-source-filesystem')

function isIndexPage(post) {
  return path.basename(post.node.fileAbsolutePath) === 'index.md'
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const templates = {
      home: path.resolve('./src/templates/home.js'),
      projets: path.resolve('./src/templates/projets.js'),
      category: path.resolve('./src/templates/category.js'),
      projet: path.resolve('./src/templates/projet.js'),
      contact: path.resolve('./src/templates/contact.js'),
      catalogue: path.resolve('./src/templates/catalogue.js')
    }

    resolve(
      // query for markdown files
      graphql(
        `
          {
            allPages:allMarkdownRemark(
              sort: { fields: [frontmatter___title], order: DESC }
              limit: 1000
            ) {
              edges {
                node {
                  excerpt(format: PLAIN)
                  fileAbsolutePath
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    template
                  }
                }
              }
            }
            catsGroup: allMarkdownRemark(limit: 2000) {
              group(field: frontmatter___project_cat) {
                fieldValue
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // create the posts
        const posts = result.data.allPages.edges
        for (post of posts) {
          let postContext = {
            slug: post.node.fields.slug,
          }

          // if it's a post index, add corresponding posts to context
          if (isIndexPage(post)) {
            const parentRelPath = path.dirname(
              path.relative(__dirname, post.node.fileAbsolutePath)
            )
            postContext.children = posts.filter(({ node }) => {
              if (path.basename(node.fileAbsolutePath) === 'index.md') {
                return false
              }
              const childRelPath = path.relative(
                __dirname,
                node.fileAbsolutePath
              )
              return childRelPath.startsWith(parentRelPath)
            })
          }

          // determine which layout to use for post
          let templateComponent
          if (post.node.frontmatter.template) {
            templateComponent = templates[post.node.frontmatter.template]
          } else if (isIndexPage(post)) {
            templateComponent = templates.list
          } else {
            templateComponent = templates.page
          }

          createPage({
            path: post.node.fields.slug,
            component: templateComponent,
            context: postContext,
          })
        }

        // create categories data from query
        const cats = result.data.catsGroup.group;
        // Make tag pages
        cats.forEach(cat => {
          createPage({
            path: `/projets/${_.kebabCase(cat.fieldValue)}/`,
            component: templates.category,
            context: {
              category: cat.fieldValue,
            },
          })
        })
      })
    )
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'MarkdownRemark') {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
