import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Header from './components/ui/header/header';
import Main from './layouts/main/main';
import Catalog from './layouts/catalog/catalog';
import User from './layouts/user/user';
import ProtectedRoute from './components/common/protectedRoute/protectedRoute';
import AppLoader from './components/ui/hoc/appLoader';

function App() {
  return (
    <div className="App">
      <AppLoader>
        <Header />
        <Switch>
          <ProtectedRoute path="/user/:userId?" component={User} />
          <Route path="/catalog/:productId?" component={Catalog} />
          <Route path="/" exact component={Main} />
          <Redirect to="/" />
        </Switch>
      </AppLoader>
    </div>
  );
}

export default App;
