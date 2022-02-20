import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import { AuthProvider} from './context/AuthContext'; 

import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  render() {
    return (
      <Router >
        <AuthProvider>
          <Routes>
            <Route exact path='/' element={ <PrivateRoute />}>
              <Route exact path='/' element={ <Home/> }/>
            </Route>
            
            <Route exact path='/home' element={ <PrivateRoute />}>
              <Route exact path='/home' element={ <Home/> }/>
            </Route>
            <Route exact path='/login' element={ <Login />} />
            <Route exact path='/register' element={ <Register />} />
          </Routes>
        </AuthProvider>
      </Router>
    );
  }
}

export default App;