import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from "../components/seo"

export const PageTemplate = ({ title, content, gutenbergPage }) => {
  if( true === gutenbergPage ) {
    return (
        <div dangerouslySetInnerHTML={{ __html: content }} /> 
    )
  }
  return (
      <div className="container page-container" dangerouslySetInnerHTML={{ __html: content }} /> 
  )
}

PageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
}

const Page = ({ data }) => {
  const { wordpressPage: page } = data

  let featuredImageSourceUrl
  let opengraphImageSourceUrl
  let twitterImageSourceUrl
  
  if( data.wpgraphql.pageBy.featuredImage == null ) {
    featuredImageSourceUrl = "";
  } else {
    featuredImageSourceUrl = data.wpgraphql.pageBy.featuredImage.sourceUrl;
  } 

  if( data.wpgraphql.pageBy.seo.opengraphImage == null ) {
    opengraphImageSourceUrl = "";
  } else {
    opengraphImageSourceUrl = data.wpgraphql.pageBy.seo.opengraphImage.sourceUrl;
  } 

  if( data.wpgraphql.pageBy.seo.twitterImage == null ) {
    twitterImageSourceUrl = "";
  } else {
    twitterImageSourceUrl = data.wpgraphql.pageBy.seo.twitterImage.sourceUrl;
  } 
  
  return (
    <Layout>
      <SEO 
        title={data.wpgraphql.pageBy.seo.title} 
        description={data.wpgraphql.pageBy.seo.metaDesc} 
        featuredImage={featuredImageSourceUrl}
        opengraphTitle={data.wpgraphql.pageBy.seo.opengraphTitle}
        opengraphDescription={data.wpgraphql.pageBy.seo.opengraphDescription}
        opengraphImage={opengraphImageSourceUrl}
        twitterTitle={data.wpgraphql.pageBy.seo.twitterTitle}
        twitterDescription={data.wpgraphql.pageBy.seo.twitterDescription}
        twitterImage={twitterImageSourceUrl}
      />
      <PageTemplate 
        title={data.wordpressPage.title} 
        content={page.content} 
        gutenbergPage={data.wordpressPage.acf.is_gutenberg_page} 
      />
    </Layout>
  )
}

Page.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Page

export const pageQuery = graphql`
  query FrontPage {
    wordpressPage(acf: {front_page: {eq: true}}) {
      title
      content
      yoast_meta {
        yoast_wpseo_title
        yoast_wpseo_metadesc
        yoast_wpseo_canonical
      }
      acf {
        is_gutenberg_page
      }
    }
    wpgraphql {
      pageBy(pageId: 23) {
        seo {
          title
          metaDesc
          opengraphTitle
          opengraphDescription
          twitterTitle
          twitterDescription
          opengraphImage {
            sourceUrl(size: LARGE)
          }
          twitterImage {
            sourceUrl(size: LARGE)
          }
        }
        featuredImage {
          sourceUrl(size: LARGE)
        }
      }
    }
  }
`
