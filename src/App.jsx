//import './App.css'
import { BrowserRouter, NavLink,  Routes, Route } from 'react-router-dom'
import { store } from './Store/store';
import { Provider } from 'react-redux';
import Body from './Components/Body';
import Login from './Components/Login';
import Profile from './Components/Profile';
import Logout from './Components/Logout';
import Feed from './Components/Feed';
import ConnectionRequests from './Components/ConnectionRequests';
import Connections from './Components/Connections';

import ProtectedRoute from './Components/ProtectedRoute'; 

function App() {
  return (
    <>
        <Provider store={store}>
            <BrowserRouter basename="/">
                <Routes>

                    <Route path="/" element={<Body />}>
                        
                        {/* Public Route */}
                        <Route path="/login" element={<Login />} />

                        {/* Protected Routes */}
                        <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                            <Profile />
                            </ProtectedRoute>
                        }
                        />

                        <Route
                        path="/connectionRequests"
                        element={
                            <ProtectedRoute>
                            <ConnectionRequests />
                            </ProtectedRoute>
                        }
                        />

                        <Route
                        path="/connections"
                        element={
                            <ProtectedRoute>
                            <Connections />
                            </ProtectedRoute>
                        }
                        />

                        <Route
                        path="/logout"
                        element={
                            <ProtectedRoute>
                            <Logout />
                            </ProtectedRoute>
                        }
                        />

                        {/* Feed also requires login */}
                        <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                            <Feed />
                            </ProtectedRoute>
                        }
                        />

                    </Route>

                </Routes>
            </BrowserRouter>
        </Provider>

    </>
  );
}

export default App;
