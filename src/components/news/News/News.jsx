import React, { useState } from 'react'
import { Route, Switch, withRouter, Redirect, Link } from 'react-router-dom'
import NewsList from '../NewsList/NewsList'
import NewsForm from '../NewsForm/NewsForm'

const News = () => {

  return (
      <Switch>
        <Route exact path='/news' component={NewsList}/>
        <Route exact path='/news/add' component={NewsForm}/>
      </Switch>
  )
}

export default withRouter(News)
