import React from 'react'

import { ScrollContainer } from 'components/container/ScrollContainer'
import { ProjectCategory } from 'components/project/ProjectCategory'

import useCategories from 'hooks/use-categories';

function Homepage(props) {

    const categories = useCategories();

    return (

      <main className="Home__page">
        <h1 className="sr-only">L'Atelier Perché, conception et réalisation sur-mesure.</h1>
        <p className="sr-only">Situé à 2 heures de Paris, en plein cœur du Perche, c’est dans un écrin de verdure que sont soigneusement confectionnées chacune de nos réalisations.</p>
        <p className="sr-only">Nous privilégions les circuits courts et utilisons des bois abattus en France (Forêts du Perche, pays de Loire, Bourgogne). Nous travaillons avec les acteurs de la filière qui exploitent durablement les forêts françaises. Le principal bois utilisé est le chêne, mais nous pouvons sur demande travailler
toutes autres essences (frêne, hêtre, châtaigner, noyer…) </p>
        <ScrollContainer>

          {categories.map(category => (
              <ProjectCategory key={category.slug} category={category} />
          ))}

        </ScrollContainer>
      </main>

    )
}

export default Homepage;
