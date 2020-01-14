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
        <div class="column">
          <div>
            <p>Projekt fotograficzno-dziennikarski autorstwa Eweliny Włoch i Mateusza Dziopy</p>
          </div>
          <div>
            <p>Projekt i wykonanie <a href="https://lukaszwronski.com" title="Łukasz Wroński | Programista WordPress Wrocław">Szablony Wordpress budowane od podstaw</a></p>
          </div>
        </div>
      </div>
    </footer>
  </div>
)

export default TemplateWrapper
