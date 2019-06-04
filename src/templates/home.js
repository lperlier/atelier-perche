import React from 'react'
// eslint-disable-next-line
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { PageHeader } from 'components/page/PageHeader'

import useProjects from 'hooks/use-projects';

function Homepage(props) {
    
    const page = props.data.pageData.frontmatter;
    const projects = useProjects();
    
    console.log(projects);

    return (
    
      <main className="HomePage">
        <PageHeader>
          <h1>{page.title}</h1>
          <h2>{page.subtitle}</h2>
          
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

export const pageQuery = graphql`
  query HomePageBySlug($slug: String!) {
    pageData:markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      frontmatter {
        title
        template
        subtitle
      }
    }
  }
`
