import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Col, Divider, Form, Input, List, Row, Select, Steps } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import LoadingIndicator from '../common/util/LoadingIndicator'
import CargoCardProxy from './CargoCardProxy'
import { cargoSelector, getCargos, setPage, setSize } from '../../redux/reducers/CargoSliceReducer'


const { Step } = Steps
const { Option } = Select

const CargoList = () => {
  const dispatch = useDispatch()

  const {
    cargos,
    loading,
    page,
    size,
    totalElements
  } = useSelector(cargoSelector)

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
    dispatch(getCargos(searchCriteria))
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

  const list = cargos.map(cargo =>
    <CargoCardProxy
      key={cargo.id}
      cargo={cargo}
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
    <>
      <Form.Item
        label={'Место загрузки:'}
      >
        <Input
          style={{ fontSize: '16px', width: 450 }}
        />
      </Form.Item>

      <Form.Item
        label={'Место разгрузки:'}
      >
        <Input
          style={{ fontSize: '16px', width: 450 }}
        />
      </Form.Item>

      <Form.Item
        label={'Тип загрузки:'}
      >
        <Select
          style={{ fontSize: '16px', width: 450 }}
        >
          {loadTypeOptions}
        </Select>
      </Form.Item>

      <Form.Item
        label={'Тип кузова:'}
      >
        <Select
          style={{ fontSize: '16px', width: 450 }}
        >
          {bodyTypeOptions}
        </Select>
      </Form.Item>

      <Form.Item
        style={{ marginTop: '50px', width: 250 }}>

        <Button
          type='primary'
          htmlType='submit'
          size='large'>
          Найти
        </Button>
      </Form.Item>
    </>
  )


  return (
    <div className='pb-5'>
      <Row justify='center'>
        <Col span={22}>
          <Row gutter={16}>
            <Col span={6}>
              <h1>Поиск</h1>

              <Form>
                {search}
              </Form>

            </Col>
            <Col span={18}>
              <Divider>Грузы</Divider>

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

export default withRouter(CargoList)
