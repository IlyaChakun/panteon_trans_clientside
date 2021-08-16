import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './app/App'
import { BrowserRouter, Route } from 'react-router-dom'
import { QueryParamProvider } from 'use-query-params';

import { Provider } from 'react-redux'
import store from './redux/store'

import 'antd/dist/antd.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-grid.css'

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
          <QueryParamProvider ReactRouterRoute={Route}>
            <App/>
          </QueryParamProvider>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)

