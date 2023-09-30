import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

//redux import
import store from './Reducer/store'
import { Provider } from 'react-redux'
//redux import
import { BrowserRouter } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  
  <BrowserRouter >
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
  
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
