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

function SEO({ description, lang, meta, title, opengraphTitle, opengraphDescription, twitterTitle, twitterDescription, opengraphImage, twitterImage }) {
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

  if( "" === opengraphTitle ) {
    opengraphTitle = title
  }
  if( "" === opengraphDescription ) {
    opengraphDescription = description
  }
  if( "" === opengraphDescription ) {
    opengraphDescription = description
  }
  if( "" === twitterTitle ) {
    twitterTitle = description
  }
  if( "" === twitterDescription ) {
    twitterDescription = description
  }
  if( "" === twitterImage &&  "" !== opengraphImage ) {
    twitterImage = opengraphImage
  }
  if( "" !== twitterImage &&  "" === opengraphImage ) {
    opengraphImage = twitterImage
  }



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
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: opengraphTitle,
        },
        {
          property: `og:description`,
          content: opengraphDescription,
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
          content: opengraphImage,
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
          content: twitterTitle,
        },
        {
          name: `twitter:image`,
          content: twitterImage,
        },
        {
          name: `twitter:description`,
          content: twitterDescription,
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
