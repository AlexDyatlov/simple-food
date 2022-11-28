import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Header from './components/ui/header/header';
import Main from './layouts/main/main';
import Catalog from './layouts/catalog/catalog';

function App() {
  return (
    <div className='App'>
      <Header />
      <Switch>
        <Route path='/catalog/:productId?' component={Catalog} />
        <Route path='/' exact component={Main} />
        <Redirect to='/' />
      </Switch>
    </div>
  );
}

export default App;
