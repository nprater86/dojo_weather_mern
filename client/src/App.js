import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar'
import RegistrationForm from './components/RegistrationForm';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <div className="container">
          <Switch>
            <Route path="/register">
              <RegistrationForm />
            </Route>
            <Route path="/login">
              <h1>Login form here</h1>
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
