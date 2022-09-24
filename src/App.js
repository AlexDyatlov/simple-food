import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Main from './layouts/main/main';
import Catalog from './layouts/catalog/catalog';

function App() {
  return (
    <Switch>
      <Route path='/catalog/:productId?' component={Catalog} />
      <Route path='/' exact component={Main} />
      <Redirect to='/' />
    </Switch>
  );
}

export default App;
