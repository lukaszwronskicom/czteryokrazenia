import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import logo from '../images/favicon.png'
import { window, document } from 'browser-monads';

class Navbar extends React.Component  {
  
  constructor(props) {
    super(props);

    this.icon = React.createRef();
    this.menu = React.createRef();

  }

  toggleMenu() {

    if( "nav-icon" == this.icon.current.classList ) {
      //this.icon.current.classList.value = "nav-icon nav-icon--active";
      //this.menu.current.classList.value = "nav-menu nav-menu--active";

    } else {
      //this.icon.current.classList.value = "nav-icon";
      //this.menu.current.classList.value = "nav-menu";

    }

  }

  useEffect(self) {
    document.addEventListener('scroll', function() {
        if(window.scrollY > 100){
          self.menu.current.classList.value = "nav-menu nav-menu-scroll";
        } else {
          self.menu.current.classList.value = "nav-menu";
        }
      }
    )
  }

  render() {
    this.useEffect(this);
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
                      <div className="nav-logo">
                        <a href="https://czteryokrazenia.pl">
                          <img src={logo} alt="Cztery Okrążenia z życia" />
                        </a>
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
