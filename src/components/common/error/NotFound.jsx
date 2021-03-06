import React from 'react'
import './errorStyle.css'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import { localizedStrings } from '../../../util/localization'

const NotFound = () => {
  return (
    <div className="page-not-found">
      <h1 className="title">
        404
      </h1>
      <div className="desc">
        {localizedStrings.alertPageNotFound}
      </div>
      <Link to="/">
        <Button className="go-back-btn" type="primary" size="large">
          {localizedStrings.goBack}
        </Button>
      </Link>
    </div>
  )
}

export default NotFound
