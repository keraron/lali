const path = require("path")

const postTemplate = path.resolve("./src/templates/post-template.js")

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const {
    data: {
      allMdx: { nodes: posts },
    },
  } = await graphql(`
    {
      allMdx {
        nodes {
          id
          frontmatter {
            slug
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `)

  posts.forEach((node) => {
    const { slug } = node.frontmatter

    createPage({
      path: slug,
      component: `${postTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: {
        id: node.id,
      },
    })
  })
}
