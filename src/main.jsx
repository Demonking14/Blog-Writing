import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { LoginPage, AllPost, EditPostPage, Home, Posts, SignUpPage, AddPostPage } from './Pages'
import AuthLayout from './components/AuthLayout.jsx'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/login',
          element: (
            <AuthLayout authentication={false}>
              <LoginPage />
            </AuthLayout>
          ),
        },
        {
          path: '/signup',
          element: (
            <AuthLayout authentication={false}>
              <SignUpPage />
            </AuthLayout>
          ),
        },
        {
          path: '/all-posts',
          element: (
            <AuthLayout authentication>
              <AllPost />
            </AuthLayout>
          ),
        },
        {
          path: '/add-post',
          element: (
            <AuthLayout authentication>
              <AddPostPage />
            </AuthLayout>
          ),
        },
        {
          path: '/edit-post/:slug',
          element: (
            <AuthLayout authentication>
              <EditPostPage />
            </AuthLayout>
          ),
        },
        {
          path: '/post/:slug',
          element: <Posts />,
        },
      ],
    },
  ],
 
)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>
)
