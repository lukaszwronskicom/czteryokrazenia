/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby" 

function SEO({ description, lang, meta, title, opengraphTitle, opengraphDescription, twitterTitle, twitterDescription, opengraphImage, twitterImage, featuredImage }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s`}
      meta={[
        {
          name: `description`,
          content: description,
        },
        {
          property: `og:title`,
          content: ("" == opengraphTitle) ? title : opengraphTitle,
        },
        {
          property: `og:description`,
          content: ("" == opengraphDescription) ? metaDescription : opengraphDescription,
        },
        {
          property: `og:locale`,
          content: lang
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:image`,
          content: ("" === opengraphImage) ? featuredImage : opengraphImage,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: ("" == twitterTitle) ? title : twitterTitle,
        },
        {
          name: `twitter:image`,
          content: ("" === twitterImage) ? featuredImage : twitterImage,
        },
        {
          name: `twitter:description`,
          content: ("" == twitterDescription) ? metaDescription : twitterDescription,

        },
      ].concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `pl`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
