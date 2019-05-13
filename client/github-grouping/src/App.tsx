import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './views/Home'
import { Provider } from 'mobx-react';
import stores from './stores';
import { socketEmit } from 'Utils/socket';
import Layer from './views/Layer'

window.onunload = () => {
  socketEmit('out.user', stores.userStore.user.id)
}
const App: React.FC = () => {
  return (
    <Provider {...stores}>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
        <Layer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
