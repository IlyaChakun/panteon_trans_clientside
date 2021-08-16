import React, { useState } from 'react'
import { Route, Switch, withRouter, Redirect, Link } from 'react-router-dom'
import NewsList from '../NewsList/NewsList'
import NewsForm from '../NewsForm/NewsForm'
import NewsArticle from '../NewsArticle/NewsArticle'
import NewsEdit from '../NewsEdit/NewsEdit'

const News = () => {

  return (
      <Switch>
        <Route exact path='/news' component={NewsList}/>
        <Route exact path='/news/add' component={NewsForm}/>
        <Route exact path='/news/:id' component={NewsArticle}/>
        <Route exact path='/news/:id/edit' component={NewsEdit}/>
      </Switch>
  )
}

export default withRouter(News)
