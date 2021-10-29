import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import privateRoute from './components/routing/privateRoute';

import { PrivateScreen, LoginScreen, RegisterScreen, ForgotPasswordScreen, PasswordResetScreen } from './components/screens';

const App = () => {
  return (
    
      <Router>
      <div className="app">
        <Switch>
          <privateRoute exact path="/" component{PrivateScreen}/>
          <Route exact path="/register" component={RegisterScreen} />
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/forgotpassword" component={ForgotPasswordScreen} />
          <Route exact path="/passwordreset/:resetToken" component={PasswordResetScreen} />

          
        </Switch>
      </div>
      </Router>
  
  );
}

export default App;
