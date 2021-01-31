import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import CompanyForm from '../company/CompanyForm'

import '../../index.css'

class Company extends Component {
  render () {
    return (
      <CompanyForm currentUser={this.props.currentUser}
        currentCompany={this.props.currentCompany}/>
    )
  }
}

export default withRouter(Company)
