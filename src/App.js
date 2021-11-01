import Register from 'containers/share/Auth/Register/Register';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';// cần import
import Login from './containers/share/Auth/Login/Login';
import PageNotFound from './containers/share/PageNotFound/PageNotFound';
import ClientLayout from './layouts/ClientLayout';
import { clientRoutes } from './routes';


function App() {
  const renderLayout = (routes, Layout) => {
    return routes.map(route => {
      const { path, component, exact, isPrivate } = route;
      return (<Layout
      path={path}
        component={component}
        exact={exact}
        isPrivate={isPrivate}
         />)
    })
  }
  return (
    <div className="App">
      <Router>
        <Switch>
          {renderLayout(clientRoutes, ClientLayout)}
          <Route path="/login" component={Login} />
          <Route path='/register' component={Register}/>
          <Route path="*" component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
