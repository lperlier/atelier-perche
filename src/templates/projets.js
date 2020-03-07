import React from 'react'
import Helmet from 'react-helmet';

import { ScrollContainer } from 'components/container/ScrollContainer'
import { ProjectCategory } from 'components/project/ProjectCategory'

import useCategories from 'hooks/use-categories';

function Projets(props) {

    const categories = useCategories();

    return (

      <main className="Projets__page">
        <Helmet title="Projets" />
        <h1 className="sr-only">Projets</h1>
        <ScrollContainer>

          {categories.map(category => (
              <ProjectCategory key={category.slug} category={category} />
          ))}

        </ScrollContainer>
      </main>

    )
}

export default Projets;
