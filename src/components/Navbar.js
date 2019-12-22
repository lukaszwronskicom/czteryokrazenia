import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'

const Navbar = () => (
  <StaticQuery
    query={graphql`
      query {
        wpgraphql {
          menus {
            nodes {
              menuItems {
                edges {
                  node {
                    label
                    url
                  }
                }
              }
            }
          }
        }

      }
    `}
    render={data => (
      <header className="header">
        <div className="container">
          {data.wpgraphql.menus.nodes.map(node => (
            <nav className="nav">
              <ul className="nav-menu">
                {node.menuItems.edges.map(edge => ( 
                  <li className="nav-menu-item">
                    <Link
                      className="nav-menu-link"
                      to={edge.node.url}
                    >
                      {edge.node.title}
                    </Link>
                  </li>                       
                ))}
              </ul> 
            </nav>
          ))}
        </div>
      </header>
    )}
  />
)

export default Navbar
