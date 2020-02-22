import React from 'react'
import Helmet from 'react-helmet'
import Navbar from './Navbar'
import { withPrefix, Link } from "gatsby"

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet title="Home | Gatsby + WordPress">
      <script src={withPrefix('zoom-images.js')} type="text/javascript" />
    </Helmet> />
    <Navbar />
    <main>
      {children}
    </main>
    <div id="zoomGallery" className="zoom-popup">
      <div className="zoom-popup-container">
      </div>
    </div>
    <footer className="footer">
      <div className="container">
        <div className="column">
          <div>
            <p>Projekt fotograficzno-dziennikarski autorstwa Eweliny Włoch i Mateusza Dziopy</p>
          </div>
          <div>
            <p>Projekt i wykonanie <a href="https://lukaszwronski.com" title="Łukasz Wroński | Programista WordPress Wrocław">Łukasz Wroński</a></p>
          </div>
        </div>
      </div>
    </footer>
  </div>
)

export default TemplateWrapper
