import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Space, Table, Tag } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders, setPage, setSize } from '../../redux/reducers/OrdersSliceReducer'
import LoadingIndicator from '../common/util/LoadingIndicator'
import { clientsSelector, getClients } from '../../redux/reducers/ClientSliceReducer'
import ClientDetailModal from './ClientDetailModal'

const { Column } = Table

const ClientList = (props) => {
  const dispatch = useDispatch()

  const {
    clients,
    loading,
    page,
    size,
    totalElements
  } = useSelector(clientsSelector)

  const {
    orders
  } = useSelector(clientsSelector)


  useEffect(() => {
    dispatch(getOrders())
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
    return <LoadingIndicator />
  }

  const getClientOrders = (clientId) => {
    const clientOrders = []
    orders.forEach(order => {
      if (order.clientId === clientId) {
        clientOrders.push(order)
      }
    })
    return clientOrders
  }

  const getTotalOrderPayment = (orders) => {
    let sum = 0
    orders.forEach(order => {
      sum += order.orderPriceInfo.totalAmount
    })
    return sum
  }

  const dataSource = []

  clients.map(client => {
    dataSource.push({
      key: client.id,
      clientUniqueId: client.uniqueId,
      clientName: client.name,
      clientTotalOrderPayment: getTotalOrderPayment(getClientOrders(client.id)),
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
        title='Уникальный ИД клиента'
        dataIndex='clientUniqueId'
        key='clientUniqueId'
        render={clientUniqueId => (
          <Tag color='blue' key={clientUniqueId}>
            {clientUniqueId}
          </Tag>
        )}
      />
      <Column title='ФИО' dataIndex='clientName' key='clientName' />
      <Column title='Сумма всех заказов' dataIndex='clientTotalOrderPayment' key='clientTotalOrderPayment' />
      <Column title='Действия' dataIndex='clientId' key='clientId' render={clientId => (
        <Space size='middle'>
          <ClientDetailModal
            clientId={clientId}
          />
        </Space>
      )} />
    </Table>
  )
}

export default withRouter(ClientList)
