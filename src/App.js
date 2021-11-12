
import AdminLayout from './layouts/AdminLayout';
import { adminRoutes } from './routes';
import history from './utils/history';    
import Register from 'containers/share/Auth/Register/Register';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
      <Router history={history}>
        <Switch>
        {renderLayout(adminRoutes, AdminLayout)}
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
