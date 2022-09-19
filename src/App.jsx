import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Layouts //
import AuthLayout from './layouts/AuthLayout';
import ProtectedRoute from './layouts/ProtectedRoute';
// Pages //
import Login from './pages/Login';
import Register from './pages/Register';
import ForgottenPassword from './pages/ForgottenPassword';
import NewPassword from './pages/NewPassword';
import ConfirmAccount from './pages/ConfirmAccount';
import Projects from './pages/Projects';
import NewProject from './pages/NewProject';
import Project from './pages/Project'
import EditProject from './pages/EditProject';
import NewCollab from './pages/NewCollab';
// Context //
import { AuthProvider } from './context/AuthProvider';
import { ProjectsProvider } from './context/ProjectsProvider';


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectsProvider>
          <Routes>

            <Route path='/' element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path='register' element={<Register />} />
              <Route path='forgotten-password' element={<ForgottenPassword />} />
              <Route path='forgotten-password/:token' element={<NewPassword />} />
              <Route path='confirm-account/:id' element={<ConfirmAccount />} />
            </Route>

            <Route path='/projects' element={<ProtectedRoute />} >
              <Route index element={<Projects />} />
              <Route path='create-project' element={<NewProject />} />
              <Route path='new-collab/:id' element={<NewCollab />} />
              <Route path=':id' element={<Project />} />
              <Route path='edit/:id' element={<EditProject />} />
            </Route>

          </Routes>
        </ProjectsProvider>
      </AuthProvider>

    </BrowserRouter>
  )
}

export default App;
