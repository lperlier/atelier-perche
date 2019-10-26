import React from 'react';

export const Col = React.forwardRef((props, ref) => {

  let containerClasses = 'col';
  if (props.className) containerClasses = ['col', props.className].join(' ');

  return (

    <div ref={ref} className={containerClasses}>
      {props.children}
    </div>

  )

});
