import React, { useEffect, useState } from 'react'
import {Table, Typography, Row, Col, Divider} from 'antd'
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCompanyProfile } from '../../../../../redux/actions/profile'
import CompanyForm from '../CompanyRegistration/CompanyForm'
import ChangeModal from '../../../settings/ChangeModal/ChangeModal'
import {DivIcon} from "leaflet/dist/leaflet-src.esm";

const { Title, Text } = Typography

const dividerStyles = {
  margin: '14px 0'
}

const labelStyles = {
  marginBottom: '8px',
  fontSize: '12px',
  color: '#a3a3a3'
}

const Company = (props) => {
  const dispatch = useDispatch()
  const { company } = useSelector(state => state.profileState)
  const { currentUser } = useSelector(state => state.authState)

  const companyData = (company) => [
    {
      key: '1',
      parameter: 'УНП:',
      value: company.unp
    },
    {
      key: '2',
      parameter: 'Название:',
      value: company.title
    },
    {
      key: '3',
      parameter: 'Контактный номер:',
      value: company.phoneNumber
    },
    {
      key: '4',
      parameter: 'Контактная почта:',
      value: company.email
    },
  ];

  useEffect(() => {
    if (currentUser) {
      dispatch(getCompanyProfile(currentUser.id))
    }
  }, [currentUser])
  return (
      <Row style={{ height: 'calc(100vh - 64px)', padding: '20px' }} align={"top"} justify={"start"}>
        <Col span={18} style={{ backgroundColor: '#fff', padding: '16px 32px' }} >
          {Object.keys(company).length ? (
              <CompanyForm edit={true}/>
          ) : (
            <React.Fragment>
              <CompanyForm registration={true}/>
            </React.Fragment>
          )}
        </Col>
      </Row>
  )
}


export default withRouter(Company)
