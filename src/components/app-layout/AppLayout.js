import React from 'react';
import Helmet from 'react-helmet';
import { helmet } from 'utils/helmet';

import { AppContainer } from 'components/container/AppContainer';

export default ({ children }) => (

      <AppContainer>
        <Helmet {...helmet} />
        {children}
      </AppContainer>

  )
