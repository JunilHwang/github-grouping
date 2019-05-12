import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './views/Home'
import { Provider } from 'mobx-react';
import stores from './stores';

const App: React.FC = () => {
  return (
    <Provider {...stores}>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
