import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Divider, List, Tabs } from 'antd'
import OrderDetail from './OrderDetail'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders, orderSelector, setPage, setSize } from '../../redux/reducers/OrdersSliceReducer'
import LoadingIndicator from '../common/util/LoadingIndicator'
import s from '../user/profile/Profile.module.css'

const { TabPane } = Tabs

const AdminOrderList = (props) => {
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

  const loadList = (page, size) => {
    const searchCriteria = {
      page: page,
      size: size,
      orderStatus: orderStatus
    }
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

    loadList(page, size)
  }

  const loadMore = () => {
    loadList(page + 1, size)
  }

  if (loading === true) {
    return <LoadingIndicator/>
  }

  const ordersList = orders.map(order => (
    <OrderDetail
      key={order.id}
      order={order}
    />)
  )

  return (
    <>
      <Tabs activeKey={activeTab} centered onChange={onOrderStatusChangeHandler}>
        <TabPane tab='Новые заказы' key='NEW'>
          <Divider>Новые заказы</Divider>


          <Button
            type='primary'
            htmlType='submit'
            size='large'
            className={s.button}
          >
            Передать выбранный заказ флористу
          </Button>

          <Button
            type='primary'
            htmlType='submit'
            size='large'
            className={s.button}
          >
            Отменить заказ
          </Button>

        </TabPane>
        <TabPane tab='Выполняемые заказы' key='IN_PROCESS'>
          <Divider>Выполняемые заказы</Divider>
          <Button
            type='primary'
            htmlType='submit'
            size='large'
            className={s.button}
          >
            Подробнее (модалка высплывающая)
          </Button>
        </TabPane>
        <TabPane tab='Завершенные заказы' key='COMPLETED'>
          <Divider>Завершенные заказы</Divider>
          <Button
            type='primary'
            htmlType='submit'
            size='large'
            className={s.button}
          >
            Подробнее (модалка высплывающая)
          </Button>

        </TabPane>
      </Tabs>

      <List
        grid={{
          gutter: 16,
          column: 1
        }}

        pagination={{

          loading: loading,
          showSizeChanger: true,

          defaultCurrent: page,
          defaultPageSize: size,

          pageSizeOptions: ['6', '9', '12'],
          position: 'bottom',

          total: totalElements,

          showQuickJumper: true,
          onShowSizeChange: onSizeChangeHandler,
          onChange: onPageChangeHandler,

          loadMore: loadMore
        }}

        dataSource={ordersList}

        renderItem={item => (
          <List.Item>
            {item}
          </List.Item>
        )}
      />
    </>
  )
}

export default withRouter(AdminOrderList)
