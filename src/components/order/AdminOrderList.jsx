import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Col, Divider, Row, Table, Tabs } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders, orderSelector, setPage, setSize } from '../../redux/reducers/OrdersSliceReducer'
import LoadingIndicator from '../common/util/LoadingIndicator'
import s from '../user/profile/Profile.module.css'
import AddFloristModal from '../florist/AddFloristModal'

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

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name
    })
  }

  const columns = [

    {
      title: 'Статус',
      dataIndex: 'orderStatus'
    },
    {
      title: 'Комментарий',
      dataIndex: 'comment'

    },
    {
      title: 'стоимость',
      dataIndex: 'orderPriceInfo.totalAmount'

    },
    {
      title: 'Способ получения',
      dataIndex: 'orderDeliveryInfo.deliveryType.deliveryTypeName'

    }
  ]

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
          columns={columns}
          dataSource={orders}
        />
      </div>

    </>
  )
}

export default withRouter(AdminOrderList)
