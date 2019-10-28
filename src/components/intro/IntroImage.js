import React from 'react'
import Img from 'gatsby-image'

import useProjects from 'hooks/use-projects';

export const IntroImage = React.forwardRef((props, ref) => {

  const projects = useProjects();
  const randomProjectImage = projects[Math.floor(Math.random()*projects.length)].randomImage;

  let imageClass = "is--portrait";
  if (randomProjectImage.aspectRatio > 1) imageClass = "is--paysage";

  return (

    <div ref={ref} className={`${props.className} ${imageClass}`}>
      <Img fluid={randomProjectImage} />
    </div>

  )

});
