import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Divider, Space, Table, Tabs, Tag } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders, orderSelector, setPage, setSize } from '../../redux/reducers/OrdersSliceReducer'
import LoadingIndicator from '../common/util/LoadingIndicator'
import { isAdmin, isUserClient, isUserFlorist } from '../../app/App'
import AddFloristToOrderModal from './ChooseFloristModal'

const { Column, ColumnGroup } = Table
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

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
    }
  }

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
      </Tabs>

      <div>

        <Divider/>

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

          rowSelection={{
            type: 'radio',
            ...rowSelection
          }}
          rowKey={'id'}
          dataSource={orders}
          footer={() => ''}
        >
          <Column
            title="Статус заказа"
            dataIndex="orderStatus"
            render={orderStatus => (
              <Tag color="blue" key={orderStatus}>
                {orderStatus}
              </Tag>
            )}
          />
          dateOfCreation
          <Column title="Дата создания" dataIndex="dateOfCreation"/>
          <Column title="Комментарий" dataIndex="comment"/>
          <Column title="Сумма заказа" dataIndex={'orderPriceInfo'}/>
          <Column title="Способ получения" dataIndex="orderDeliveryInfo.deliveryType.deliveryTypeName"/>

          <Column
            title="Действия"
            key="action"
            render={(text, record) => (
              <Space size="middle">

                {orderStatus === 'NEW' ? (
                  <>
                    <Button
                      type='primary'
                      size='large'
                      // onClick={showModal}
                    >
                      Закрыть заказ
                    </Button>

                    {isAdmin(props.currentUser) === false
                      ? <AddFloristToOrderModal
                        updateList={updateList}/>
                      : ''
                    }
                  </>
                ) : ''}

                {orderStatus === 'COMPLETED' ? (
                  <>
                    {isUserClient(props.currentUser)
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
                    {isUserFlorist(props.currentUser)
                      ? <Button
                        type='primary'
                        size='large'
                        // onClick={showModal}
                      >
                        Выполнить заказ
                      </Button>
                      : ''
                    }
                  </>
                ) : ''}

                <Button
                  type='primary'
                  size='large'
                  // onClick={showModal}
                >
                  Подбронее
                </Button>
              </Space>
            )}
          />
        </Table>
      </div>

    </>
  )
}

export default withRouter(OrderList)
