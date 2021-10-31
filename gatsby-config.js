module.exports = {
  siteMetadata: {
    title: `Mushroom Records`,
    author: {
      name: `Sotono`,
      summary: `aho`,
    },
    description: `Works by Sotono.`,
    siteUrl: `https://sotono.tk`,
    twitterUsername: `@_sotono`,
    social: {
      twitter: `https://twitter.com/_Sotono`,
      tiktok: `https://www.tiktok.com/@_sotono?lang=ja-JP`,
      youtube: `https://www.youtube.com/channel/UCyoznA69iCeorZRLBSH3oOg`,
    },
  },

  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-64709415-1",
        head: true,
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/components/typography`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/post`,
        name: `post`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images`,
        name: `images`,
      },
    },

    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-prismjs-title`,
          `gatsby-remark-prismjs`,

          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-image`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-twitter`,
  ],
}
