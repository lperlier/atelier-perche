import React from 'react'
import Helmet from 'react-helmet';

import { ScrollContainer } from 'components/container/ScrollContainer'
import { ProjectCategory } from 'components/project/ProjectCategory'

import useCategories from 'hooks/use-categories';

function Homepage(props) {

    const categories = useCategories();

    return (

      <main className="Home__page">
        <Helmet title="Accueil" />
        <ScrollContainer>

          {categories.map(category => (
              <ProjectCategory key={category.slug} category={category} />
          ))}

        </ScrollContainer>
      </main>

    )
}

export default Homepage;
