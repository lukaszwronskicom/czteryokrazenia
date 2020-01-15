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


  return (
    <Layout>
      <SEO 
        title={data.wpgraphql.pageBy.seo.title} 
        description={data.wpgraphql.pageBy.seo.metaDesc} 
        opengraphTitle={data.wpgraphql.pageBy.seo.opengraphTitle}
        opengraphDescription={data.wpgraphql.pageBy.seo.opengraphDescription}
        twitterTitle={data.wpgraphql.pageBy.seo.twitterTitle}
        twitterDescription={data.wpgraphql.pageBy.seo.twitterDescription}

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
  query PageById($id: String!, $wordpressid: Int!) {
    wordpressPage(id: { eq: $id }) {
      title
      content
      wordpress_id
      acf {
        is_gutenberg_page
      }
    }
    wpgraphql {
      pageBy(pageId: $wordpressid) {
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
