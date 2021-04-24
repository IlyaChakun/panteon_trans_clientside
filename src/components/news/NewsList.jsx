import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Col, Divider, Form, Input, List, Row, Select } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import LoadingIndicator from '../common/util/LoadingIndicator'
import { getNews, newsSelector, setPage, setSize } from '../../redux/reducers/NewsSliceReducer'
import NewsCard from './NewsCard'

const { Option } = Select

const NewsList = () => {
  const dispatch = useDispatch()

  const {
    news,
    loading,
    page,
    size,
    totalElements
  } = useSelector(newsSelector)

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
    dispatch(getNews())
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

  const list = news.map(newNews =>
    <NewsCard
      key={newNews.id}
      news={newNews}
      updateList={updateList}
    />
  )

  return (
    <div className='pb-5'>
      <Row justify='center'>
        <Col span={22}>
          <Row gutter={16}>

              <Divider>Новости</Divider>

              <List

                grid={{
                  gutter: 150,
                  column: 2
                }}
                pagination={{

                  loading: loading,
                  showSizeChanger: true,

                  defaultCurrent: page,
                  defaultPageSize: size,

                  pageSizeOptions: ['2', '6', '9', '12'],
                  position: 'bottom',

                  total: totalElements,

                  showQuickJumper: true,
                  onShowSizeChange: onSizeChangeHandler,
                  onChange: onPageChangeHandler,

                  loadMore: loadMore
                }}

                dataSource={list}

                renderItem={item => (
                  <List.Item>
                    {item}
                  </List.Item>
                )}
              />

          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default withRouter(NewsList)
