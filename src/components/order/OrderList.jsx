import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Divider, Space, Table, Tabs, Tag } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders, orderSelector, setPage, setSize } from '../../redux/reducers/OrdersSliceReducer'
import LoadingIndicator from '../common/util/LoadingIndicator'
import { isAdmin, isUserClient, isUserFlorist } from '../../app/App'
import CloseOrderModal from './CloseOrderModal'
import ChooseFloristModal from './ChooseFloristModal'
import OrderDetailModal from './OrderDetailModal'
import CompleteOrderByFloristModal from './CompleteOrderByFloristModal'
import { authSelector } from '../../redux/reducers/AuthSliceReducer'

const { Column } = Table
const { TabPane } = Tabs

const OrderList = (props) => {
  const { currentUser } = useSelector(authSelector)

  const [userId, setUserId] = useState(currentUser !== null ? currentUser.userType === 'ROLE_ADMIN' ? null : currentUser.id : null)
  const [userType, setUserType] = useState(currentUser !== null ? currentUser.userType : null)

  const dispatch = useDispatch()

  const {
    orders,
    loading,
    page,
    size,
    totalElements
  } = useSelector(orderSelector)

  const [orderStatus, setOrderStatus] = useState('NEW')
  const [activeTab, setActiveTab] = useState('NEW')

  useEffect(() => {
    updateList()
  }, [dispatch])

  const updateList = () => {
    loadList(page, size)
  }

  const loadListWithOrderStatus = (orderStatus) => {
    console.log('loadListWithOrderStatus')
    console.log('userId= ', userId)

    const searchCriteria = {
      page: page,
      size: size,
      orderStatus: orderStatus,
      userId: userId,
      userType: userType
    }

    console.log('loadListWithOrderStatus = ', JSON.stringify(searchCriteria))

    doGetOrders(searchCriteria)
  }

  const loadList = (page, size) => {
    console.log('loadList')
    console.log('userId= ', userId)

    const searchCriteria = {
      page: page,
      size: size,
      orderStatus: orderStatus,
      userId: userId,
      userType: userType
    }

    console.log('LOAD MORE SERACH = ', JSON.stringify(searchCriteria))
    doGetOrders(searchCriteria)
  }

  const doGetOrders = (searchCriteria) => {
    dispatch(getOrders(searchCriteria))
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

  const onOrderStatusChangeHandler = (orderStatus) => {
    console.log('orderStatus=' + orderStatus)

    setOrderStatus(orderStatus)
    setActiveTab(orderStatus)

    loadListWithOrderStatus(orderStatus)
  }

  const loadMore = () => {
    loadList(page + 1, size)
  }

  if (loading === true || currentUser === null) {
    return <LoadingIndicator/>
  }

  // const rowSelection = {
  //   onChange: (selectedRowKeys, selectedRows) => {
  //     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
  //   }
  // }

  const dataSource = []

  orders.map(order => {
    dataSource.push({
      key: order.id,
      orderStatus: order.orderStatus,
      dateOfCreation: order.dateOfCreation,
      comment: order.comment,
      orderPriceInfo: order.orderPriceInfo.totalAmount,
      deliveryTypeName: order.orderDeliveryInfo.deliveryType.deliveryTypeName,
      orderId: order.id
    })
  })

  console.log(JSON.stringify(orders))
  return (
    <>

      <Tabs activeKey={activeTab} centered onChange={onOrderStatusChangeHandler}>
        <TabPane tab='Новые заказы' key='NEW'>
          <Divider>Новые заказы</Divider>
        </TabPane>
        <TabPane tab='Выполняемые заказы' key='IN_PROCESS'>
          <Divider>Выполняемые заказы</Divider>
        </TabPane>
        <TabPane tab='Завершенные заказы' key='COMPLETED'>
          <Divider>Завершенные заказы</Divider>
        </TabPane>
        <TabPane tab='Отмененные заказы' key='CLOSED'>
          <Divider>Завершенные заказы</Divider>
        </TabPane>
      </Tabs>

      <div>

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

          // rowSelection={{
          //   type: 'radio',
          //   ...rowSelection
          // }}
          // rowKey={'id'}
          dataSource={dataSource}
          footer={() => ''}
        >
          <Column
            title='Статус заказа'
            dataIndex='orderStatus'
            key='orderStatus'
            render={orderStatus => (
              <Tag color='blue' key={orderStatus}>
                {orderStatus}
              </Tag>
            )}
          />
          <Column title='Дата создания' dataIndex='dateOfCreation' key='dateOfCreation'/>
          <Column title='Комментарий' dataIndex='comment' key='comment'/>
          <Column title='Сумма заказа' dataIndex='orderPriceInfo' key='orderPriceInfo'/>
          <Column title='Способ получения' dataIndex='deliveryTypeName' key='deliveryTypeName'/>
          <Column title='Действия' dataIndex='orderId' key='orderId' render={orderId => (
            <Space size='middle'>
              {orderStatus === 'NEW' ? (
                <>

                  <div className={isAdmin(currentUser) ? '' : 'custom-hidden'}>
                    <CloseOrderModal
                      orderId={orderId}
                      button={<Button type='primary' size='large'> Отменить заказ </Button>}/>
                  </div>

                  {isAdmin(currentUser) === true
                    ? <ChooseFloristModal
                      orderId={orderId}
                      updateList={updateList}/>
                    : ''
                  }
                </>
              ) : ''}

              {orderStatus === 'COMPLETED' ? (
                <>
                  {isUserClient(currentUser)
                    ? <Button
                      type='primary'
                      size='large'
                      // onClick={showModal}
                    >
                      Оставить отзыв
                    </Button>
                    : ''
                  }
                </>
              ) : ''}

              {orderStatus === 'IN_PROCESS' ? (
                <>
                  {isUserFlorist(currentUser)
                    ? <CompleteOrderByFloristModal
                      orderId={orderId}
                      button={<Button type='primary' size='large'> Выполнить заказ </Button>}/>
                    : ''
                  }
                </>
              ) : ''}

              <OrderDetailModal
                orderId={orderId}
              />

            </Space>
          )}/>
        </Table>
      </div>

    </>
  )
}

export default withRouter(OrderList)
