import { Router, Route, Switch } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import { adminRoutes } from './routes';
import history from './utils/history';

function App() {
  const renderLayout = (routes, Layout) => {
    return routes.map((route) => {
      const { path, component, exact, isPrivate } = route;
      return (
        <Layout
          path={path}
          component={component}
          exact={exact}
          isPrivate={isPrivate}
        />
      );
    });
  };
  return (
    <div className='App'>
      <Router history={history}>
        <Switch>{renderLayout(adminRoutes, AdminLayout)}</Switch>
      </Router>
    </div>
  );
}

export default App;
