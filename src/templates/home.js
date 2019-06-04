import React from 'react'
// eslint-disable-next-line
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { PageHeader } from 'components/page/PageHeader'

import useProjects from 'hooks/use-projects';

function Homepage(props) {
    
    const projects = useProjects();

    return (
    
      <main className="HomePage">
        <PageHeader>
          
          <div className="ScrollContainer">
            <div className="container">
            
              {projects.map(projet => (
                <Link key={projet.slug} to={projet.slug}>
                  {projet.title}
                  <Img fluid={projet.randomImage} />
                </Link>
              ))}
              
            </div>
          </div>
          
        </PageHeader>
      </main>
        
    )
}

export default Homepage;
