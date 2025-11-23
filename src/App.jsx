//import './App.css'
import { BrowserRouter, NavLink,  Routes, Route } from 'react-router-dom'
import { store } from './Store/store';
import { Provider } from 'react-redux';
import Body from './Components/Body';
import Login from './Components/Login';
import Profile from './Components/Profile';
import Feed from './Components/Feed';

function App() {
  return (
    <>
        <Provider store={store}>
            <BrowserRouter basename='/'>
                <Routes>
                    <Route path="/" element={<Body />}>
                        <Route path="/login" element={<Login />}></Route>
                        <Route path="/profile" element={<Profile />}></Route>
                        <Route path="/" element={<Feed />}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
        

    </>
  );
}

export default App;
