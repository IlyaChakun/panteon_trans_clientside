import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Table, Tabs } from 'antd'
import { useSelector } from 'react-redux'
import { authSelector } from '../../redux/reducers/AuthSliceReducer'
import OrderList from './OrderList'

const { Column } = Table
const { TabPane } = Tabs

const ProxyOrderList = (props) => {
  const { currentUser } = useSelector(authSelector)

  const [userId, setUserId] = useState(currentUser !== null ? currentUser.userType === 'ROLE_ADMIN' ? null : currentUser.id : null)
  const [userType, setUserType] = useState(currentUser !== null ? currentUser.userType : null)

  return (
    <>
      <OrderList
        userId={userId}
        userType={userType}
        currentUser={currentUser}
      />
    </>
  )
}

export default withRouter(ProxyOrderList)
