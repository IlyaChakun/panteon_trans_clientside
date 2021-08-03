import React, { useState } from 'react'
import { Button, Form, Input, Modal, Select, Row, Col, Typography, notification } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { addTransport } from '../../../../redux/actions/transport'
import { addCargo } from '../../../../redux/actions/cargo'
import { useDispatch, useSelector } from 'react-redux'
import { registerCompany } from '../../../../redux/actions/company'

const { Option } = Select
const { Title } = Typography

const AddFormModal = ({isCargo, isTransport, style}) => {
  const dispatch = useDispatch()
  const { currentUser } = useSelector(state => state.authState)

  const [isLoading, setLoading] = useState(false)

  const [countryIndexFrom, setCountryIndexFrom] = useState('')
  const [countryIndexTo, setCountryIndexTo] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [distance, setDistance] = useState('')
  const [cargoType, setCargoType] = useState('')
  const [truckBodyTypes, setTruckBodyTypes] = useState([])
  const [cargoStowageMethods, setCargoStowageMethods] = useState([])
  const [payment, setPayment] = useState('')
  const [priority, setPriority] = useState({})
  const [contacts, setContacts] = useState({})

  const [weight, setWeight] = useState('')
  const [volume, setVolume] = useState('')
  const [length, setLength] = useState('')
  const [height, setHeight] = useState('')
  const [description, setDescription] = useState('')

  const [visible, setVisible] = useState(false)

  const createTransportFromState = () => {
    return {
      countryIndexFrom,
      countryIndexTo,
      from,
      to,
      distance,
    }
  }

  const createCargoFromState = () => {
    return {
      cargoTypeId: 0,
      description,
      cargoDimensions: {
        weight,
        dimensions: {
          volume,
          length,
          height
        }
      },
      customerCompanyId: currentUser.id
    }
  }

  const showModal = () => {
    setVisible(true)
  }

  const handleCancel = e => {
    setVisible(false)
  }

  const handleSubmit = () => {
    if (isCargo) {
      setLoading(true)
      dispatch(addCargo(createCargoFromState()))
        .then((data) => {
          console.log('success: ', data)
          setLoading(false)
          setVisible(false)
        })
        .catch(error => {
          setLoading(false)
          notification.error({
            message: 'Не удалось добавить груз',
            description: 'При добавлении груза возникла ошибка'
          })
          console.log('error: ', error)
        })

    }
    // else {
    //   dispatch(addTransport(createObjectFromState())).then((data) => {
    //     console.log(data)
    //     setVisible(false)
    //   })
    // }
    // console.log(createObjectFromState())
  }

  return (
    <React.Fragment>
      <Button
        type='primary'
        onClick={showModal}
        style={style}
      >
        {isCargo ? 'Добавить груз' : 'Добавить транспорт'}
      </Button>
      <Modal
        title={isCargo ? 'Добавить груз' : 'Добавить транспорт'}
        visible={visible}
        cancelText='Отменить'
        okText={'Добавить'}
        onOk={handleSubmit}
        onCancel={handleCancel}
        confirmLoading={isLoading}
      >
        <Row>
          <Col span={24}>
            {isCargo && (
              <Form
                style={{ padding: '25px', backgroundColor: '#fff' }}
                onFinish={handleSubmit}
              >
                <Form.Item
                  name='description'
                  rules={[{ required: true }]}
                  onChange={event => setDescription(event.target.value)}
                >
                  <Input
                    value={description}
                    name='description'
                    placeholder={'Описание'}
                  />
                </Form.Item>
                <Form.Item
                  name='weight'
                  rules={[{ required: true }]}
                  onChange={event => setWeight(event.target.value)}
                >
                  <Input
                    name='weight'
                    value={weight}
                    placeholder={'Вес'}
                  />
                </Form.Item>
                <Form.Item
                  name='volume'
                  rules={[{ required: true }]}
                  onChange={event => setVolume(event.target.value)}
                >
                  <Input
                    name='volume'
                    value={volume}
                    placeholder={'Объём'}
                  />
                </Form.Item>
                <Form.Item
                  name='length'
                  rules={[{ required: true }]}
                  onChange={event => setLength(event.target.value)}
                >
                  <Input
                    name='length'
                    value={length}
                    placeholder={'Длина'}
                  />
                </Form.Item>
                <Form.Item
                  name='height'
                  rules={[{ required: true }]}
                  onChange={event => setHeight(event.target.value)}
                >
                  <Input
                    name='height'
                    value={height}
                    placeholder={'Высота'}
                  />
                </Form.Item>
              </Form>
            )}
            {/*<Form*/}
            {/*  style={{ padding: '25px', backgroundColor: '#fff' }}*/}
            {/*  onFinish={handleSubmit}*/}
            {/*>*/}
            {/*  <Form.Item*/}
            {/*    name='countryIndexFrom'*/}
            {/*    rules={[{ required: true }]}*/}
            {/*    onChange={handleChangeInput}*/}
            {/*  >*/}
            {/*    <Input*/}
            {/*      value={countryIndexFrom}*/}
            {/*      name='countryIndexFrom'*/}
            {/*      placeholder={'Индекс страны отправления'}*/}
            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*  <Form.Item*/}
            {/*    name='countryIndexTo'*/}
            {/*    rules={[{ required: true }]}*/}
            {/*    onChange={handleChangeInput}*/}
            {/*  >*/}
            {/*    <Input*/}
            {/*      name='countryIndexTo'*/}
            {/*      value={countryIndexTo}*/}
            {/*      placeholder={'Индекс страны прибытия'}*/}
            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*  <Form.Item*/}
            {/*    name='from'*/}
            {/*    rules={[{ required: true }]}*/}
            {/*    onChange={handleChangeInput}*/}
            {/*  >*/}
            {/*    <Input*/}
            {/*      name='from'*/}
            {/*      value={from}*/}
            {/*      placeholder={'Откуда'}*/}
            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*  <Form.Item*/}
            {/*    name='to'*/}
            {/*    rules={[{ required: true }]}*/}
            {/*    onChange={handleChangeInput}*/}
            {/*  >*/}
            {/*    <Input*/}
            {/*      name='to'*/}
            {/*      value={to}*/}
            {/*      placeholder={'Куда'}*/}
            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*  <Form.Item*/}
            {/*    name='distance'*/}
            {/*    rules={[{ required: true }]}*/}
            {/*    onChange={handleChangeInput}*/}
            {/*  >*/}
            {/*    <Input*/}
            {/*      name='distance'*/}
            {/*      value={distance}*/}
            {/*      placeholder={'Дистанция'}*/}
            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*  <Form.Item*/}
            {/*    name='dimensions'*/}
            {/*    rules={[{ required: true }]}*/}
            {/*    onChange={handleChangeInput}*/}
            {/*  >*/}
            {/*    <Input*/}
            {/*      name='dimensions'*/}
            {/*      value={dimensions}*/}
            {/*      placeholder={'Размеры'}*/}
            {/*    />*/}
            {/*  </Form.Item>*/}

            {/*  <Form.List*/}
            {/*    name="truckBodyTypes"*/}
            {/*    rules={[*/}
            {/*      {*/}
            {/*        validator: async (_, names) => {*/}
            {/*          if (!names || names.length < 1) {*/}
            {/*            return Promise.reject(new Error('Не менее 1 типа кузова'));*/}
            {/*          }*/}
            {/*        },*/}
            {/*      },*/}
            {/*    ]}*/}
            {/*  >*/}
            {/*    {(fields, { add, remove }, { errors }) => (*/}
            {/*      <>*/}
            {/*        {fields.map((field, index) => (*/}
            {/*          <Form.Item*/}
            {/*            label={index === 0 ? 'Типы кузова' : ''}*/}
            {/*            required={false}*/}
            {/*            key={field.key}*/}
            {/*          >*/}
            {/*            <Form.Item*/}
            {/*              {...field}*/}
            {/*              validateTrigger={['onChange', 'onBlur']}*/}
            {/*              rules={[*/}
            {/*                {*/}
            {/*                  required: true,*/}
            {/*                  whitespace: true,*/}
            {/*                  message: "Введите тип кузова",*/}
            {/*                },*/}
            {/*              ]}*/}
            {/*              noStyle*/}
            {/*            >*/}
            {/*              <Input*/}
            {/*                placeholder="Тип кузова"*/}
            {/*                style={{ width: '60%' }}*/}
            {/*                onChange={truckBodyTypes[index]}*/}
            {/*              />*/}
            {/*            </Form.Item>*/}
            {/*            {fields.length > 1 ? (*/}
            {/*              <MinusCircleOutlined*/}
            {/*                className="dynamic-delete-button"*/}
            {/*                onClick={() => remove(field.name)}*/}
            {/*              />*/}
            {/*            ) : null}*/}
            {/*          </Form.Item>*/}
            {/*        ))}*/}
            {/*        <Form.Item>*/}
            {/*          <Button*/}
            {/*            type="dashed"*/}
            {/*            onClick={() => add()}*/}
            {/*            style={{ width: '60%' }}*/}
            {/*            icon={<PlusOutlined />}*/}
            {/*          >*/}
            {/*            Добавить тип кузова*/}
            {/*          </Button>*/}
            {/*          <Form.ErrorList errors={errors} />*/}
            {/*        </Form.Item>*/}
            {/*      </>*/}
            {/*    )}*/}
            {/*  </Form.List>*/}
            {/*</Form>*/}
          </Col>
        </Row>
      </Modal>
    </React.Fragment>

  )
}

export default AddFormModal