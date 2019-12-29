import React from 'react'
import Helmet from 'react-helmet'
import Navbar from './Navbar'

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet title="Home | Gatsby + WordPress" />
    <Navbar />
    <main>
      {children}
    </main>
    <footer className="footer">
      <div className="container">
        
      </div>
    </footer>
  </div>
)

export default TemplateWrapper
