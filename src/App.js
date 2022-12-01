import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Header from './components/ui/header/header';
import Main from './layouts/main/main';
import Catalog from './layouts/catalog/catalog';
import { loadCategoriesList } from './store/categories';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadCategoriesList());
  }, []);

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/catalog/:productId?" component={Catalog} />
        <Route path="/" exact component={Main} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
