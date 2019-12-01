import React from 'react'
import Helmet from 'react-helmet';

import { ScrollContainer } from 'components/container/ScrollContainer'
import { ProjectCategory } from 'components/project/ProjectCategory'

import useCategories from 'hooks/use-categories';

function Projets(props) {

    const categories = useCategories();

    return (

      <main className="HomePage">
        <Helmet title="Accueil" />
        <ScrollContainer>

          {categories.map(category => (
              <ProjectCategory key={category.slug} category={category} />
          ))}

        </ScrollContainer>
      </main>

    )
}

export default Projets;