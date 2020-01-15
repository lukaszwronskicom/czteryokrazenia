import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'

export const BlogPostTemplate = ({
  content,
  categories,
  tags,
  title,
  date,
  author,
}) => {
  return (

    <div class="container page-container">
      <h1 class="page-title">{title}</h1>
      <div class="page-content" dangerouslySetInnerHTML={{ __html: content }} /> 
    </div>

  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  title: PropTypes.string,
}

const BlogPost = ({ data }) => {
  const { wordpressPost: post } = data

  let featuredImageSourceUrl
  let opengraphImageSourceUrl
  let twitterImageSourceUrl
  
  if( data.wpgraphql.postBy.featuredImage == null ) {
    featuredImageSourceUrl = "";
  } else {
    featuredImageSourceUrl = data.wpgraphql.postBy.featuredImage.sourceUrl;
  } 

  if( data.wpgraphql.postBy.seo.opengraphImage == null ) {
    opengraphImageSourceUrl = "";
  } else {
    opengraphImageSourceUrl = data.wpgraphql.postBy.seo.opengraphImage.sourceUrl;
  } 

  if( data.wpgraphql.postBy.seo.twitterImage == null ) {
    twitterImageSourceUrl = "";
  } else {
    twitterImageSourceUrl = data.wpgraphql.postBy.seo.twitterImage.sourceUrl;
  } 

  return (
    <Layout>
      <Helmet title={`${post.title} | Blog`} />
      <SEO 
        title={data.wpgraphql.postBy.seo.title} 
        description={data.wpgraphql.postBy.seo.metaDesc} 
        featuredImage={featuredImageSourceUrl}
        opengraphTitle={data.wpgraphql.postBy.seo.opengraphTitle}
        opengraphDescription={data.wpgraphql.postBy.seo.opengraphDescription}
        opengraphImage={opengraphImageSourceUrl}
        twitterTitle={data.wpgraphql.postBy.seo.twitterTitle}
        twitterDescription={data.wpgraphql.postBy.seo.twitterDescription}
        twitterImage={twitterImageSourceUrl}
      />
      <BlogPostTemplate
        content={post.content}
        categories={post.categories}
        tags={post.tags}
        title={post.title}
        date={post.date}
        author={post.author}
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  fragment PostFields on wordpress__POST {
    id
    slug
    content
    date(formatString: "MMMM DD, YYYY")
    title
  }
  query BlogPostByID($id: String!, $wordpressid: Int!) {
    wordpressPost(id: { eq: $id }) {
      id
      title
      slug
      content
      date(formatString: "MMMM DD, YYYY")
      categories {
        name
        slug
      }
      tags {
        name
        slug
      }
      author {
        name
        slug
      }
    }
    
    wpgraphql {
      postBy( postId: $wordpressid ) {
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
