import React, { useState } from 'react'
import { Button, Form, Input, Modal, Select, Row, Col, Typography } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { addTransport } from '../../../../redux/actions/transport'
import { addCargo } from '../../../../redux/actions/cargo'
import { useDispatch } from 'react-redux'
import { registerCompany } from '../../../../redux/actions/company'

const { Option } = Select
const { Title } = Typography

const AddFormModal = ({isCargo, isTransport, style}) => {
  const dispatch = useDispatch()
  const [countryIndexFrom, setCountryIndexFrom] = useState('')
  const [countryIndexTo, setCountryIndexTo] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [distance, setDistance] = useState('')
  const [dimensions, setDimensions] = useState('')
  const [cargoType, setCargoType] = useState('')
  const [truckBodyTypes, setTruckBodyTypes] = useState([])
  const [cargoStowageMethods, setCargoStowageMethods] = useState([])
  const [payment, setPayment] = useState('')
  const [priority, setPriority] = useState({})
  const [contacts, setContacts] = useState({})
  const [visible, setVisible] = useState(false)

  const createObjectFromState = () => {
    return {
      countryIndexFrom,
      countryIndexTo,
      from,
      to,
      distance,
      dimensions
    }
  }

  const showModal = () => {
    setVisible(true)
  }

  const handleCancel = e => {
    setVisible(false)
  }

  const handleChangeInput = e => {
    switch (e.target.name) {
      case 'countryIndexFrom':
        return setCountryIndexFrom(e.target.value)
      case 'countryIndexTo':
        return setCountryIndexTo(e.target.value)
      case 'from':
        return setFrom(e.target.value)
      case 'to':
        return setTo(e.target.value)
      case 'distance':
        return setDistance(e.target.value)
      case 'dimensions':
        return setDimensions(e.target.value)
      case 'truckBodyTypes':
        return setTruckBodyTypes(prevArray => [ ...prevArray, e.target.value ])
      case 'cargoStowageMethods':
        return setCargoStowageMethods(e.target.value)
      case 'payment':
        return setPayment(e.target.value)
      case 'priority':
        return setPriority(e.target.value)
      case 'contacts':
        return setContacts(e.target.value)
    }
  }

  const handleSubmit = () => {
    if (isCargo) {
      dispatch(addCargo({
        countryIndexFrom,
        countryIndexTo,
        from,
        to,
        distance,
        dimensions
      })).then((data) => {
        console.log(data)
        setVisible(false)
      })
    }
    else {
      dispatch(addTransport(createObjectFromState())).then((data) => {
        console.log(data)
        setVisible(false)
      })
    }
    console.log(createObjectFromState())
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
      >
        <Row>
          <Col span={24}>
            <Form
              style={{ padding: '25px', backgroundColor: '#fff' }}
              onFinish={handleSubmit}
            >
              <Form.Item
                name='countryIndexFrom'
                rules={[{ required: true }]}
                onChange={handleChangeInput}
              >
                <Input
                  value={countryIndexFrom}
                  name='countryIndexFrom'
                  placeholder={'Индекс страны отправления'}
                />
              </Form.Item>
              <Form.Item
                name='countryIndexTo'
                rules={[{ required: true }]}
                onChange={handleChangeInput}
              >
                <Input
                  name='countryIndexTo'
                  value={countryIndexTo}
                  placeholder={'Индекс страны прибытия'}
                />
              </Form.Item>
              <Form.Item
                name='from'
                rules={[{ required: true }]}
                onChange={handleChangeInput}
              >
                <Input
                  name='from'
                  value={from}
                  placeholder={'Откуда'}
                />
              </Form.Item>
              <Form.Item
                name='to'
                rules={[{ required: true }]}
                onChange={handleChangeInput}
              >
                <Input
                  name='to'
                  value={to}
                  placeholder={'Куда'}
                />
              </Form.Item>
              <Form.Item
                name='distance'
                rules={[{ required: true }]}
                onChange={handleChangeInput}
              >
                <Input
                  name='distance'
                  value={distance}
                  placeholder={'Дистанция'}
                />
              </Form.Item>
              <Form.Item
                name='dimensions'
                rules={[{ required: true }]}
                onChange={handleChangeInput}
              >
                <Input
                  name='dimensions'
                  value={dimensions}
                  placeholder={'Размеры'}
                />
              </Form.Item>

              <Form.List
                name="truckBodyTypes"
                rules={[
                  {
                    validator: async (_, names) => {
                      if (!names || names.length < 1) {
                        return Promise.reject(new Error('Не менее 1 типа кузова'));
                      }
                    },
                  },
                ]}
              >
                {(fields, { add, remove }, { errors }) => (
                  <>
                    {fields.map((field, index) => (
                      <Form.Item
                        label={index === 0 ? 'Типы кузова' : ''}
                        required={false}
                        key={field.key}
                      >
                        <Form.Item
                          {...field}
                          validateTrigger={['onChange', 'onBlur']}
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message: "Введите тип кузова",
                            },
                          ]}
                          noStyle
                        >
                          <Input
                            placeholder="Тип кузова"
                            style={{ width: '60%' }}
                            onChange={truckBodyTypes[index]}
                          />
                        </Form.Item>
                        {fields.length > 1 ? (
                          <MinusCircleOutlined
                            className="dynamic-delete-button"
                            onClick={() => remove(field.name)}
                          />
                        ) : null}
                      </Form.Item>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        style={{ width: '60%' }}
                        icon={<PlusOutlined />}
                      >
                        Добавить тип кузова
                      </Button>
                      <Form.ErrorList errors={errors} />
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Form>
          </Col>
        </Row>
      </Modal>
    </React.Fragment>

  )
}

export default AddFormModal