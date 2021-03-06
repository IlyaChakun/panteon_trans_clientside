import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Space, Table, Tag } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import LoadingIndicator from '../../../common/LoadingIndicator/LoadingIndicator'
import { getClients, setPage, setSize } from '../../../../redux/reducers/client'
import ClientDetailModal from '../ClientDetail/ClientDetail'
import { authSelector } from '../../../../redux/reducers/auth'

const { Column } = Table

const ClientList = (props) => {
  const dispatch = useDispatch()

  const { currentUser } = useSelector(authSelector)
  const [userType, setUserType] = useState(currentUser !== null ? currentUser.userType : null)

  const {
    clients,
    loading,
    page,
    size,
    totalElements
  } = useSelector(state => state.clientState)

  useEffect(() => {
    updateList()
  }, [dispatch])

  const updateList = () => {
    loadList(page, size)
  }

  const loadList = (page, size) => {
    console.log('loadList')

    const searchCriteria = {
      page: page,
      size: size
    }

    console.log('LOAD MORE SERACH = ', JSON.stringify(searchCriteria))
    dispatch(getClients(searchCriteria))
  }

  const onSizeChangeHandler = (page, size) => {
    dispatch(setPage(page))
    dispatch(setSize(size))
    loadList(page, size)
  }

  const onPageChangeHandler = (pageNumber) => {
    dispatch(setPage(pageNumber))
    loadList(pageNumber, size)
  }

  const loadMore = () => {
    loadList(page + 1, size)
  }

  if (loading === true) {
    return <LoadingIndicator/>
  }

  const dataSource = []

  clients.map(client => {
    dataSource.push({
      key: client.id,
      clientUniqueId: client.uniqueId,
      clientName: client.name,
      clientPhone: client.phoneNumber,
      clientEmail: client.email,
      clientId: client.id
    })
  })

  return (
    <Table
      pagination={{

        loading: loading,
        showSizeChanger: true,

        defaultCurrent: page,
        defaultPageSize: size,

        pageSizeOptions: ['10', '20', '30'],
        position: 'bottom',

        total: totalElements,

        showQuickJumper: true,
        onShowSizeChange: onSizeChangeHandler,
        onChange: onPageChangeHandler,

        loadMore: loadMore
      }}

      dataSource={dataSource}
      footer={() => ''}
    >
      <Column
        title='???????????????????? ???? ??????????????'
        dataIndex='clientUniqueId'
        key='clientUniqueId'
        render={clientUniqueId => (
          <Tag color='blue' key={clientUniqueId}>
            {clientUniqueId}
          </Tag>
        )}
      />
      <Column title='??????' dataIndex='clientName' key='clientName'/>
      <Column title='??????????????' dataIndex='clientPhone' key='clientPhone'/>
      <Column title='??????????' dataIndex='clientEmail' key='clientEmail'/>
      <Column title='????????????????' dataIndex='clientId' key='clientId' render={clientId => (
        <Space size='middle'>
          <ClientDetailModal
            userId={clientId}
            userType={'ROLE_CLIENT'}
            currentUser={currentUser}
          />
        </Space>
      )}/>
    </Table>
  )
}

export default withRouter(ClientList)
