import React from 'react'
import Helmet from 'react-helmet';

import { ScrollContainer } from 'components/container/ScrollContainer'
import { ProjectCategory } from 'components/project/ProjectCategory'

import useCategories from 'hooks/use-categories';

function Homepage(props) {

    const category = useCategories();

    return (

      <main className="HomePage">
        <Helmet title="Accueil" />
        <ScrollContainer>

            {category.map((category, index) => (
                <ProjectCategory key={index} category={category}/>
            ))}

        </ScrollContainer>
      </main>

    )
}

export default Homepage;
