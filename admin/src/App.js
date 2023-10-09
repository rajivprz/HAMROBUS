import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { userInputs } from "./formSource";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/Authcontext";
import { bookingColumns, busColumns, userColumns } from "./datatablesource";
import NewBus from "./pages/newBus/NewBus";
import EditBus from "./pages/editbus/EditBus";
import EditBook from "./pages/editbook/EditBook";
function App() {
  const { darkMode } = useContext(DarkModeContext);
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="users">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={userColumns} />
                  </ProtectedRoute>
                }
              />

              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <New inputs={userInputs} title="Add New User" />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="bus">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={busColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewBus />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/bus/edit/:id"
                exact
                element={
                  <ProtectedRoute>
                    <EditBus />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="book">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={bookingColumns} />
                  </ProtectedRoute>
                }
              />
               <Route
               path="/book/edit/:id"
               exact
                element={
                  <ProtectedRoute>
                    <EditBook />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
