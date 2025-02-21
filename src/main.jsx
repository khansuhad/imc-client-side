import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()
import Router from './Routes/Router.jsx';
import AuthProvider from './AuthProvider/AuthProvidder.jsx';
import { store } from './Redux/Store/Store.jsx';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
  <AuthProvider>
  <Provider store={store}><RouterProvider router={Router} /></Provider>
  </AuthProvider>
  </QueryClientProvider>
  </React.StrictMode>,
)
