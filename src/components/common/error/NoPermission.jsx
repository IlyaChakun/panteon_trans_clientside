import React from 'react'
import './errorStyle.css'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import { localizedStrings } from '../../../util/localization'

const NoPermission = () => {
  return (
    <div className="page-not-found">
      <h1 className="title">
        403
      </h1>
      <div className="desc">
        {localizedStrings.alertPageNoPermission}
      </div>
      <Link to="/">
        <Button className="go-back-btn" type="primary" size="large">
          {localizedStrings.goBack}
        </Button>
      </Link>
    </div>
  )
}

export default NoPermission
