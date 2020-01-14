import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import logo from '../images/favicon.png'

class Navbar extends React.Component  {
  
  constructor(props) {
    super(props);

    this.icon = React.createRef();
    this.menu = React.createRef();

  }

  toggleMenu() {

    if( "nav-icon" == this.icon.current.classList ) {
      this.icon.current.classList.value = "nav-icon nav-icon--active";
      this.menu.current.classList.value = "nav-menu nav-menu--active";

    } else {
      this.icon.current.classList.value = "nav-icon";
      this.menu.current.classList.value = "nav-menu";

    }

  }

  render() {
    return (
      <StaticQuery
        query={graphql`
          query {
            wpgraphql {
              menus {
                nodes {
                  id
                  menuItems {
                    edges {
                      node {
                        id
                        label
                        url
                      }
                    }
                  }
                }
              }
            }
            allWordpressSiteMetadata {
              nodes {
                url
              }
            }
          }
        `}
        render={
          data => (
            <>
              <header className="header">
                <div className="container">
                  {data.wpgraphql.menus.nodes.map(nodeMenu => (
                    <nav key={nodeMenu.id} className="nav">
                      <div class="nav-logo">
                        <img src={logo} alt="Cztery Okrążenia z życia" />
                      </div>
                      <div ref={this.icon} className="nav-icon" onClick={() => this.toggleMenu() }>
                        <div className="nav-icon-bars">
                        </div>
                      </div>
                      <ul ref={this.menu} className="nav-menu">
                        {nodeMenu.menuItems.edges.map(edgeItem => ( 
                          <li key={edgeItem.node.id} className="nav-menu-item">
                            <a href={edgeItem.node.url.replace( data.allWordpressSiteMetadata.nodes.map(nodeSite => (nodeSite.url)) , ``)} className="nav-menu-link">
                              {edgeItem.node.label}
                            </a>
                          </li>                       
                        ))}
                      </ul> 
                    </nav>
                  ))}
                </div>
              </header>
              <div className="topSeperate"></div>
            </>
          )
          
        }
      />
    )
  }
}

export default Navbar
