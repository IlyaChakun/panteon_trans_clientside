import React, { useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Button, Col, Form, Input, List, Row, Select } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useQueryParam, NumberParam } from 'use-query-params';

import LoadingIndicator from '../../common/LoadingIndicator/LoadingIndicator'
import { getTransport, setPage, setSize } from '../../../redux/actions/transport'
import TransportCardProxy from '../TransportCardProxy/TransportCardProxy'
import AddFormModal from '../../user/modal/AddFormModal/AddFormModal'
import DeleteFormModal from '../../user/modal/DeleteFormModal/DeleteFormModal'
import EditFormModal from '../../user/modal/EditFormModal/EditFormModal'

const { Option } = Select

const TransportList = (props) => {
  const dispatch = useDispatch()
  const [page, setPage] = useQueryParam('page', NumberParam)
  const [size, setPageSize] = useQueryParam('size', NumberParam)
  const [allowPagination, setAllowPagination] = useState(props.location.pathname.split('/')[1] === 'transports')

  const {
    transports,
    totalElements
  } = useSelector(state => state.transportState)

  const { currentUser } = useSelector(state => state.authState)

  useEffect(() => {
    loadList(page, size)
  }, [page, size])

  const updateList = () => {
    loadList(page, size)
  }

  const loadList = (page, size) => {
    const searchCriteria = {
      page: page,
      size: size
    }
    dispatch(getTransport(searchCriteria)).then((data) => {
      console.log('transports: ', data)
    })
      .catch(error => {
        console.log('err: ', error)
      })

  }

  const onSizeChangeHandler = (page, size) => {
    setPageSize(size)
  }

  const onPageChangeHandler = (pageNumber) => {
    setPage(pageNumber)
  }

  const loadMore = () => {
    loadList(page + 1, size)
  }

  const transportList = (transportsData) => {
    return transportsData.map(transport =>
      <React.Fragment>
        <TransportCardProxy
          key={transport.id}
          transport={transport}
          updateList={updateList}
        />
        <Row style={{ width: '100%' }}>
          <EditFormModal style={{marginRight: '10px'}} transport={transport} isTransport={true} />
          <DeleteFormModal transport={transport} isTransport={true} />
        </Row>
      </React.Fragment>
    )
  }

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
    <React.Fragment>
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
    </React.Fragment>
  )

  return (
    <Row gutter={16} style={{ width: '100%', padding: '30px', minHeight: 'calc(100vh - 60px)' }}>
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
        {currentUser && <AddFormModal isTransport={true} style={{ marginBottom: '20px' }}/>}
        {!transports.length ? (
          <LoadingIndicator />
        ) : (
          <List
            pagination={allowPagination ? {
              showSizeChanger: true,
              defaultCurrent: page || 1,
              defaultPageSize: size || 6,
              pageSizeOptions: ['6', '9', '12'],
              position: 'bottom',
              total: totalElements,
              showQuickJumper: true,
              onShowSizeChange: onSizeChangeHandler,
              onChange: onPageChangeHandler,
            } : false}
            dataSource={transportList(transports)}
            renderItem={item => (
              <List.Item style={{ backgroundColor: '#fff', marginBottom: '25px', flexDirection: 'column', padding: '20px' }}>
                {item}
              </List.Item>
            )}
          />
        )}
        {!allowPagination && (
          <Link to={'/transports'}><Button style={{ width: '100%' }}>Весь транспорт</Button></Link>
        )}
      </Col>
    </Row>
  )
}

export default withRouter(TransportList)
