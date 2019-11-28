import React from 'react'
import Helmet from 'react-helmet';

import { ScrollContainer } from 'components/container/ScrollContainer'
import { ProjectPreview } from 'components/project/ProjectPreview'

import useProjects from 'hooks/use-projects';

function List(props) {

    let category;
    props.data.pageData.frontmatter.title === "Projets" ? category = null : category = props.data.pageData.frontmatter.title;
    const projects = useProjects(category);

    return (

      <main className="ProjetsPage">
        <Helmet title="Projets" />
        <ScrollContainer>

            {projects.map((project, index) => (
                <ProjectPreview key={index} project={project}/>
            ))}

        </ScrollContainer>

        {(category != null &&
          <span className="ProjetsCat">{category}</span>
        )}
      </main>

    )
}

export default List;

export const pageQuery = graphql`
  query ProjetByType($slug: String!) {
    pageData:markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      frontmatter {
        title
      }
    }
  }
`
