import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Col, Divider, Form, Input, List, Row, Select, Steps } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import LoadingIndicator from '../../common/LoadingIndicator/LoadingIndicator'
import { getTransport, setPage, setSize } from '../../../redux/actions/transport'
import TransportCardProxy from '../TransportCardProxy/TransportCardProxy'


const { Step } = Steps
const { Option } = Select

const TransportList = () => {
  const dispatch = useDispatch()

  const {
    transports,
    loading,
    page,
    size,
    totalElements
  } = useSelector(state => state.transportState)

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
    dispatch(getTransport(searchCriteria))
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

  const list = transports.map(transport =>
    <TransportCardProxy
      key={transport.id}
      transport={transport}
      updateList={updateList}
    />
  )

  const bodyTypeOptions = [
    <Option key={1} value={1}>
      Тент
    </Option>,
    <Option key={2} value={2}>
      Рефрижератор
    </Option>,
    <Option key={3} value={3}>
      Контейнер
    </Option>,
    <Option key={4} value={4}>
      Бортовой
    </Option>,
    <Option key={5} value={5}>
      Самосвал
    </Option>
  ]
  const placeDateOptions = [
    <Option key={1} value={1}>
      Сегодня
    </Option>,
    <Option key={2} value={2}>
      1 день назад
    </Option>,
    <Option key={3} value={3}>
      2 день назад
    </Option>,
    <Option key={4} value={4}>
      3 день назад
    </Option>,
    <Option key={5} value={5}>
      4 день назад
    </Option>
  ]

  const loadTypeOptions = [
    <Option key={1} value={1}>
      Задняя
    </Option>,
    <Option key={2} value={2}>
      Боковая
    </Option>
  ]

  const search = (
    <>
      <Form.Item
        label={'Место загрузки:'}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={'Место разгрузки:'}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={'Тип загрузки:'}
      >
        <Select>
          {loadTypeOptions}
        </Select>
      </Form.Item>

      <Form.Item
        label={'Тип кузова:'}
      >
        <Select>
          {bodyTypeOptions}
        </Select>
      </Form.Item>

      <Form.Item
        label={'Размещено'}
      >
        <Select>
          {placeDateOptions}
        </Select>
      </Form.Item>

      <Form.Item>

        <Button
          type='primary'
          htmlType='submit'
          style={{ width: '100%' }}
        >
          Найти
        </Button>
      </Form.Item>
    </>
  )

  return (
    <React.Fragment style={{ boxSizing: 'border-box' }}>
      <Row gutter={16} style={{ width: '100%', padding: '30px' }}>
        <Col span={6}>
          <Form
            labelCol={{
              span: 24
            }}
            wrapperCol={{
              span: 24
            }}
            style={{ padding: '20px' }}
          >
            {search}
          </Form>

        </Col>
        <Col span={18}>
          <List
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
              <List.Item style={{ backgroundColor: '#fff', marginBottom: '25px', flexDirection: 'column', padding: '20px' }}>
                {item}
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default withRouter(TransportList)
