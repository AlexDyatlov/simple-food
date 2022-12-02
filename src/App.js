import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Header from './components/ui/header/header';
import Main from './layouts/main/main';
import Catalog from './layouts/catalog/catalog';
import { loadCategoriesList } from './store/categories';
import { loadFoodsList } from './store/foods';
import { loadUsersList } from './store/users';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadCategoriesList());
    dispatch(loadFoodsList());
    dispatch(loadUsersList());
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
