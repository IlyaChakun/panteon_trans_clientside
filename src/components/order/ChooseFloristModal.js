import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import Modal from 'antd/es/modal'
import { Button, Space, Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { floristsSelector, getFlorists } from '../../redux/reducers/FloristSliceReducer'
import { partialOrderUpdate, setPage, setSize } from '../../redux/reducers/OrdersSliceReducer'
import LoadingIndicator from '../common/util/LoadingIndicator'

const { Column } = Table

const ChooseFloristModal = (props) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)

  const { florists, totalElements, loading, page, size } = useSelector(floristsSelector)

  useEffect(() => {
    updateList()
  }, [dispatch])

  const updateList = () => {
    loadList(page, size)
  }

  const loadList = (page, size) => {
    const searchCriteria = {
      page: page,
      size: size
    }
    dispatch(getFlorists(searchCriteria))
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

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
    }
  }

  const showModal = () => {
    setVisible(true)
  }

  const handleCancel = e => {
    setVisible(false)
  }

  const onChooseFlorist = (floristId) => {
    const orderPartialUpdate = {
      orderId: props.orderId,
      orderFloristChoice: {
        floristId: floristId
      }
      // orderFloristCompletion: '',
      // orderReview: '',
      // orderAutoFloristChoose: '',
      // orderClose: {
      //   description: 'I don\'t want this order'
      // }
    }

    dispatch(partialOrderUpdate(orderPartialUpdate))
    props.updateList()
    handleCancel()
  }

  const loadMore = () => {
    loadList(page + 1, size)
  }

  if (loading === true) {
    return <LoadingIndicator />
  }

  const dataSource = []

  florists.map(florist => {
    if (florist.activeOrdersCount < 3) {
      dataSource.push({
        key: florist.id,
        floristName: florist.user.name,
        rating: florist.floristStatistic.rating,
        experience: florist.experience,
        completedOrdersCount: florist.floristStatistic.completedOrdersCount,
        floristId: florist.id,
        activeOrdersCount: florist.activeOrdersCount
      })
    }
  })

  return (
    <>
      <Button type='primary' size='large' onClick={showModal}>
        Выбрать флориста
      </Button>

      <Modal
        title='Выбрать флориста'
        visible={visible}
        okButtonProps={{ style: { display: 'none' } }}
        cancelText='Отменить'
        onCancel={handleCancel}
        centered
        width={1200}
      >
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
          // rowKey={'key'}
          dataSource={dataSource}
          footer={() => ''}
        >
          <Column title='Флорист' dataIndex='floristName' key='floristName' />
          <Column title='Рейтинг' dataIndex='rating' key='rating' />
          <Column title='Опыт(лет)' dataIndex='experience' key='experience' />
          <Column title='Заказов выполнено' dataIndex='completedOrdersCount' key='completedOrdersCount' />
          <Column title='Активных заказов' dataIndex='activeOrdersCount' key='activeOrdersCount' />
          <Column title='Действия' dataIndex='floristId' key='floristId' render={floristId => (
            <Space size='middle'>
              <Button type='primary' size='large' onClick={() => onChooseFlorist(floristId)}>
                Передать заказ
              </Button>
            </Space>
          )} />
        </Table>
      </Modal>
    </>
  )
}

export default withRouter(ChooseFloristModal)
