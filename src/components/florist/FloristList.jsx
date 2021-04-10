import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Col, Divider, List, Row } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import LoadingIndicator from '../common/util/LoadingIndicator'
import { floristsSelector, getFlorists, setPage, setSize } from '../../redux/reducers/FloristSliceReducer'
import AddFloristModal from './AddFloristModal'
import FloristCardProxy from './FloristCardProxy'

const FloristList = () => {
  const dispatch = useDispatch()

  const {
    florists,
    loading,
    page,
    size,
    totalElements
  } = useSelector(floristsSelector)

  useEffect(() => {
    loadList(page, size)
  }, [dispatch, page, size])

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

  const loadMore = () => {
    loadList(page + 1, size)
  }

  if (loading === true) {
    return <LoadingIndicator />
  }

  const floristList = florists === undefined ? [] : florists.map(florist =>
    <FloristCardProxy
      key={florist.id}
      florist={florist}
      updateList={updateList}
    />
  )

  return (
    <div className='pb-5'>
      <Row justify='center'>
        <Col span={22}>
          <Row gutter={16}>
            <Col span={6}>
              <h1>Управление</h1>

              <AddFloristModal updateList={updateList} />

            </Col>
            <Col span={18}>
              <Divider>Флористы</Divider>

              <List
                grid={{
                  gutter: 16,
                  column: 2
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

                dataSource={floristList}

                renderItem={item => (
                  <List.Item>
                    {item}
                  </List.Item>
                )}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default withRouter(FloristList)
