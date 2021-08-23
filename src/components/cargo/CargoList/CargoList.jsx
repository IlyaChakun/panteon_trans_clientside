import React, { useEffect, useState } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Button, Col, Form, Input, List, Row, Select } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useQueryParam, NumberParam } from 'use-query-params';

import LoadingIndicator from '../../common/LoadingIndicator/LoadingIndicator'
import CargoCardProxy from '../CargoCardProxy/CargoCardProxy'
import { getCargos, setPage, setSize } from '../../../redux/actions/cargo'
import AddForm from '../../user/modal/AddForm/AddForm'

const { Option } = Select

const CargoList = (props) => {
  const dispatch = useDispatch()
  const [page, setPage] = useQueryParam('page', NumberParam)
  const [size, setPageSize] = useQueryParam('size', NumberParam)
  const [allowPagination, setAllowPagination] = useState(props.location.pathname.split('/')[1] === 'cargos')

  const {
    cargos,
    totalElements
  } = useSelector(state => state.cargoState)

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
    dispatch(getCargos(searchCriteria))
  }

  const onSizeChangeHandler = (page, size) => {
    setPageSize(size)
  }

  const onPageChangeHandler = (pageNumber) => {
    window.scrollTo({top: 0});
    setPage(pageNumber)
  }

  const loadMore = () => {
    loadList(page + 1, size)
  }

  const list = cargos.map(cargo =>
    <CargoCardProxy
      key={cargo.id}
      cargo={cargo}
      currentUser={currentUser}
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
        <Select style={{ width: '100%' }}>
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
    <div>
      <Row style={{ width: '100%', padding: '30px' }}>
        <Col span={6} style={{ backgroundColor: '#fff' }}>
          <Form
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 24,
            }}
            style={{ padding: '20px' }}
          >
            {search}
          </Form>
        </Col>
        <Col span={18} style={{ backgroundColor: '#9e9e9e' }}>

        </Col>
      </Row>
      <Row style={{ width: '100%', padding: '0 30px' }}>
        <Col span={18} style={{ width: '100%' }}>
          {currentUser && <Button type={'primary'}><Link style={{ textDecoration: 'none' }} to={'/cargos/add'}>Добавить груз</Link></Button>}
          {!cargos.length ? (
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
              dataSource={list}
              renderItem={item => (
                <List.Item style={{ backgroundColor: '#fff', marginBottom: '25px', flexDirection: 'column', padding: '20px' }}>
                  {item}
                </List.Item>
              )}
            />
          )}
          {!allowPagination && (
            <Link to={'/cargos'}><Button style={{ width: '100%' }}>Все грузы</Button></Link>
          )}
        </Col>
      </Row>
    </div>

  )
}

export default withRouter(CargoList)
