import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store'
import App from './App.jsx'
// Remove index.css import
// import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // Remove StrictMode to prevent double rendering in development
  <Provider store={store}>
    <App />
  </Provider>
)
