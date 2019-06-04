import React from 'react';
import Helmet from 'react-helmet';
import { helmet } from 'utils/helmet';

import { AppContainer } from 'components/container/AppContainer';

export default ({ children }) => {
    
    return (
      <>
          <AppContainer>
            <Helmet {...helmet} />
            {children}
          </AppContainer>
      </>
    )
  
}