import React, { useEffect, useState } from 'react'
import { Typography } from 'antd'
import { withRouter, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCompanyProfile } from '../../../../../redux/actions/profile'
import CompanyRegistration from '../CompanyRegistration/CompanyRegistration'

const { Title } = Typography

const Company = (props) => {
  const dispatch = useDispatch()
  const { company } = useSelector(state => state.profileState)
  const { currentUser } = useSelector(state => state.authState)
  useEffect(() => {
    if (currentUser) {
      dispatch(getCompanyProfile(currentUser.id))
    }
  }, [currentUser])
  return (
    <React.Fragment>
      {Object.keys(company).length ? (
        <Title level={2} style={{ padding: '0 20px 0 20px' }}>Ваша компания: </Title>
      ) : (
        <CompanyRegistration />
      )}
    </React.Fragment>
  )
}

export default withRouter(Company)
