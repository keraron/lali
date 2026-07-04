/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  pathPrefix: `/lali`,
  siteMetadata: {
    title: `Koop`,
    titleTemplate: `%s | A simple MDX blog`,
    description: `Built using GatsbyJS and serving content using markdown`,
    siteUrl: `https://keraron.github.io/lali`, // Cannot include a trailing slash
    image: `/images/macbook.jpg`,
    siteAuthor: `Morgan Baker`,
    siteAuthorUrl: `https://www.morganbaker.dev`,
    twitterUsername: `@twitter`,
    facebookName: `https://www.facebook.com`,
    instagramName: `https://www.instagram.com`,
    linkedinName: `https://www.linkedin.com/in/morgan-baker-development`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `src/posts`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-styled-components`,
    },
  ],
}
