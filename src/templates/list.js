import React from 'react'
import Helmet from 'react-helmet';

import { ScrollContainer } from 'components/container/ScrollContainer'
import { ProjectPreview } from 'components/project/ProjectPreview'

import useProjects from 'hooks/use-projects';

function List(props) {

    const projects = useProjects();

    return (

      <main className="ProjetsPage">
        <Helmet title="Projets" />
        <ScrollContainer>

            {projects.map((project, index) => (
                <ProjectPreview key={index} project={project}/>
            ))}

        </ScrollContainer>
      </main>

    )
}

export default List;
