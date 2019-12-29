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

  console
  return (
    <Layout>
      <SEO title={data.wordpressPage.yoast_title} />
      <PageTemplate title={data.wordpressPage.title} content={page.content} gutenbergPage={data.wordpressPage.acf.is_gutenberg_page} />
    </Layout>
  )
}

Page.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Page

export const pageQuery = graphql`
  query PageById($id: String!) {
    wordpressPage(id: { eq: $id }) {
      title
      content
      yoast_title
      acf {
        is_gutenberg_page
      }
    }
  }
`
