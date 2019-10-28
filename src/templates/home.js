import React from 'react'
import Helmet from 'react-helmet';

import { ScrollContainer } from 'components/container/ScrollContainer'
import { ProjectPreview } from 'components/project/ProjectPreview'

import useProjects from 'hooks/use-projects';

function Homepage(props) {

    const projects = useProjects();
    const projectFake = []

    for (const project of projects) {
      projectFake.push(project);
      projectFake.push(project);
      projectFake.push(project);
      projectFake.push(project);
      projectFake.push(project);
      projectFake.push(project);
      projectFake.push(project);
      projectFake.push(project);
      projectFake.push(project);
      projectFake.push(project);
    };

    return (


      <main className="HomePage">
        <Helmet title="Accueil" />
        <ScrollContainer>

            {projectFake.map((project, index) => (
                <ProjectPreview key={index} project={project}/>
            ))}

        </ScrollContainer>
      </main>

    )
}

export default Homepage;
