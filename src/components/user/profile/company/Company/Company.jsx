import React, { useEffect, useState } from 'react'
import { Table, Typography } from 'antd'
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCompanyProfile } from '../../../../../redux/actions/profile'
import CompanyRegistration from '../CompanyRegistration/CompanyRegistration'
import ChangeModal from '../../../settings/ChangeModal/ChangeModal'

const { Column } = Table;

const { Title } = Typography

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
    <React.Fragment>
      {Object.keys(company).length ? (
          <React.Fragment>
            <Title level={2}>Ваша компания: </Title>
            {currentUser && (
              <Table style={{ marginBottom: '20px' }} showHeader={false} pagination={false} dataSource={companyData(company)}>
                <Column dataIndex="parameter" key="parameter" />
                <Column
                  dataIndex="value"
                  key="value"
                />
              </Table>
            )}
            <CompanyRegistration buttonText={'Перерегистрировать компанию'} />
          </React.Fragment>
      ) : (
        <React.Fragment>
          <Title level={2}>Ваша компания ещё не зарегистрирована. Пожалуйста, пройдите регистрацию</Title>
          <CompanyRegistration buttonText={'Пройти регистрацию'} />
        </React.Fragment>
      )}
    </React.Fragment>
  )
}


export default withRouter(Company)
