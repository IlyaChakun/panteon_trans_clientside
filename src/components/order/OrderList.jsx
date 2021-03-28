import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { List, Tabs } from 'antd'
import OrderDetail from './OrderDetail'
import { useDispatch, useSelector } from 'react-redux'
import { getUsualOrders, orderSelector, setPage, setSize } from '../../redux/reducers/OrdersSliceReducer'
import LoadingIndicator from '../common/util/LoadingIndicator'

const { TabPane } = Tabs

const OrderList = (props) => {
  const dispatch = useDispatch()
  const {
    orders,
    loading,
    page,
    size,
    totalElements
  } = useSelector(orderSelector)


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
      clientId: props.currentUser.id
    }
    dispatch(getUsualOrders(searchCriteria))
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

  const ordersList = orders.map(order => (
        <OrderDetail
          key={order.id}
          order={order}
        />
      )
    )

  return (
    <>

      <Tabs defaultActiveKey='1' centered>
        <TabPane tab='Активные заказы' key='1'>
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab='Завершенные заказы' key='2'>
          Content of Tab Pane 2
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

export default withRouter(OrderList)
