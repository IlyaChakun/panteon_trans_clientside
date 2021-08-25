import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Form, Input, Modal, Select, Row, Col, notification, Typography, DatePicker } from 'antd'
import { addCargo } from '../../../../redux/actions/cargo'
import { useDispatch, useSelector } from 'react-redux'
import { addTransport } from '../../../../redux/actions/transport'

const { Title } = Typography
const { Option } = Select
const { TextArea } = Input

const titleStyles = {
  marginBottom: '32px'
}

const AddForm = ({isCargo, isTransport, style}) => {
  const dispatch = useDispatch()
  const { currentUser } = useSelector(state => state.authState)

  const [isLoading, setLoading] = useState(false)

  // const [carryingCapacity, setCarryingCapacity] = useState('')
  // const [volumeTransport, setVolumeTransport] = useState('')
  // const [lengthTransport, setLengthTransport] = useState('')
  // const [heightTransport, setHeightTransport] = useState('')
  // const [from, setFrom] = useState('')
  // const [to, setTo] = useState('')
  //
  // const [weight, setWeight] = useState('')
  // const [volume, setVolume] = useState('')
  // const [length, setLength] = useState('')
  // const [height, setHeight] = useState('')
  // const [description, setDescription] = useState('')

  // const createCargoFromState = () => {
  //   return {
  //     cargoTypeId: 1,
  //     userId: currentUser.id,
  //     description,
  //     cargoStowageMethodIds: [
  //       1,
  //       2
  //     ],
  //     truckBodyTypeIds: [
  //       1,
  //       2
  //     ],
  //     cargoDimensions: {
  //       weight,
  //       dimensions: {
  //         volume: volume,
  //         length: length,
  //         height: height
  //       }
  //     },
  //     loadingPayload: {
  //       address: {
  //         countryId: 0,
  //         cityId: 0,
  //         address: from,
  //         apartment: 2
  //       },
  //       loadingDate: '2020-01-01'
  //     },
  //     unloadingPayload: {
  //       address: {
  //         countryId: 0,
  //         cityId: 0,
  //         address: to,
  //         apartment: 3
  //       },
  //       unloadingDate: '2020-01-01'
  //     }
  //   }
  // }

  // const createTransportFromState = () => {
  //   return {
  //
  //     truckBodyTypeId: 1,
  //     carrierCompanyId: 8,
  //     truckDimensions: {
  //       carryingCapacity,
  //       dimensions: {
  //         volume: volumeTransport,
  //         length: lengthTransport,
  //         height: heightTransport
  //       }
  //     },
  //     cargoStowageMethodIds: [
  //       1,
  //       2
  //     ],
  //     loadingPayload: {
  //       address: {
  //         countryId: 0,
  //         cityId: 0,
  //         address: from,
  //         apartment: 2
  //       },
  //       loadingDate: '2020-01-01'
  //     },
  //     unloadingPayload: {
  //       address: {
  //         countryId: 0,
  //         cityId: 0,
  //         address: to,
  //         apartment: 3
  //       },
  //       unloadingDate: '2020-01-01'
  //     }
  //   }
  // }

  const handleSubmit = (values) => {
    console.log(values)
    // if (isCargo) {
    //   setLoading(true)
    //   dispatch(addCargo(createCargoFromState()))
    //     .then((data) => {
    //       console.log('success: ', data)
    //       setLoading(false)
    //     })
    //     .catch(error => {
    //       setLoading(false)
    //       notification.error({
    //         message: 'Не удалось добавить груз',
    //         description: 'При добавлении груза возникла ошибка'
    //       })
    //       console.log('error: ', error)
    //     })

    // }
    // else {
    //   dispatch(addTransport(createTransportFromState())).then((data) => {
    //     console.log('success: ', data)
    //   })
    //     .catch(error => {
    //       console.log('error: ', error)
    //     })
    // }
  }

  const loadingPayloadFields = [
    <Form.Item
      name='country'
      rules={[{ required: true }]}
      label={'Страна:'}
    >
      <Input
        name='country'
        placeholder={'Укажите страну'}
      />
    </Form.Item>,
    <Form.Item
      name='city'
      rules={[{ required: true }]}
      label={'Город:'}
    >
      <Input
        name='city'
        placeholder={'Укажите город'}
      />
    </Form.Item>,
    <Form.Item
      name='address'
      rules={[{ required: true }]}
      label={'Адрес:'}
    >
      <Input
        name='address'
        placeholder={'Укажите адрес'}
      />
    </Form.Item>,
    <Form.Item
      name='date'
      rules={[{ required: true }]}
      label={'Дата:'}
    >
      <DatePicker
        style={{ width: '100%' }}
        placeholder={'Укажите дату'}
      />
    </Form.Item>
  ]

  const loadingPayloadFieldsTrans = (isRequired) => [
    <Form.Item
      name='country'
      rules={[{ required: isRequired }]}
      label={'Страна:'}
    >
      <Input
        name='country'
        placeholder={'Укажите страну'}
      />
    </Form.Item>,
    <Form.Item
      name='city'
      rules={[{ required: isRequired }]}
      label={'Город:'}
    >
      <Input
        name='city'
        placeholder={'Укажите город'}
      />
    </Form.Item>,
    <Form.Item
      name='address'
      rules={[{ required: isRequired }]}
      label={'Адрес:'}
    >
      <Input
        name='address'
        placeholder={'Радиус'}
      />
    </Form.Item>,
    <Form.Item
      name='date'
      rules={[{ required: isRequired }]}
      label={'Дата:'}
    >
      <DatePicker
        style={{ width: '100%' }}
        placeholder={'Укажите дату'}
      />
    </Form.Item>
  ]

  return (
    <React.Fragment>
          {isCargo && (
            <Form
              layout="vertical"
              onFinish={handleSubmit}
            >
              <Row style={{ marginBottom: '16px'}}>
                <Col span={8} style={{ paddingRight: '16px' }}>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Title level={5} style={titleStyles}>Загрузка</Title>
                      <Form.List name={'loadingPayload'}>
                        {() => (
                          <React.Fragment>
                            {loadingPayloadFields.map(item => item)}
                          </React.Fragment>
                        )}
                      </Form.List>
                    </Col>
                    <Col span={12}>
                      <Title level={5} style={titleStyles}>Разгрузка</Title>
                      <Form.List name={'unloadingPayload'}>
                        {() => (
                          <React.Fragment>
                            {loadingPayloadFields.map(item => item)}
                          </React.Fragment>
                        )}
                      </Form.List>
                    </Col>
                  </Row>
                </Col>
                <Col span={16} style={{ backgroundColor: '#9e9e9e' }}>

                </Col>
              </Row>
              <Row gutter={16} align="bottom">
                <Col span={24}>
                  <Title level={5} style={titleStyles}>Дополнительно</Title>
                </Col>
                <Col span={10}>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name='address'
                        rules={[{ required: true }]}
                        label={'Наименование:'}
                      >
                        <Input
                          name='address'
                          placeholder={'Укажите наименование'}
                        />
                      </Form.Item>
                      <Form.Item
                        name='address'
                        rules={[{ required: true }]}
                        label={'Вес:'}
                      >
                        <Input
                          name='address'
                          placeholder={'Укажите вес'}
                        />
                      </Form.Item>
                      <Form.Item
                        name='address'
                        rules={[{ required: true }]}
                        label={'Объём:'}
                      >
                        <Input
                          name='address'
                          placeholder={'Укажите объём'}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name='address'
                        rules={[{ required: true }]}
                        label={'Тип груза:'}
                      >
                        <Select defaultValue="Тип1">
                          <Option value="Тип1">Тип1</Option>
                          <Option value="Тип2">Тип2</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item
                        name='address'
                        rules={[{ required: true }]}
                        label={'Способ погрузки:'}
                      >
                        <Select defaultValue="Способ1">
                          <Option value="Способ1">Способ1</Option>
                          <Option value="Способ2">Способ2</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item
                        name='address'
                        rules={[{ required: true }]}
                        label={'Тип машины:'}
                      >
                        <Select defaultValue="Машина1">
                          <Option value="Машина1">Машина1</Option>
                          <Option value="Машина2">Машина2</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
                <Col span={10}>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name='address'
                        rules={[{ required: true }]}
                        label={'Температурный Режим:'}
                      >
                        <Input.Group compact>
                          <Input style={{ width: '50%' }} placeholder="От" />
                          <Input
                            style={{ width: '50%' }}
                            placeholder="До"
                          />
                        </Input.Group>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name='address'
                        rules={[{ required: true }]}
                        label={'Стоимость:'}
                      >
                        <Input.Group compact>
                          <Input
                            style={{ width: '70%' }}
                            placeholder={'Укажите стоимость'}
                          />
                          <Select defaultValue="BYN" style={{ width: '30%' }}>
                            <Option value="BYN">BYN</Option>
                            <Option value="USD">USD</Option>
                          </Select>
                        </Input.Group>
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        name='address'
                        rules={[{ required: true }]}
                        label={'Описание:'}
                      >
                        <TextArea
                          rows={4}
                          placeholder={'Добавьте описание'}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
                <Col span={4}>
                  <Form.Item>
                    <Button
                      type={'primary'}
                      htmlType={'submit'}
                      style={{ width: '100%' }}
                    >
                      Разместить заявку
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          )}
          {isTransport && (
            <Form
              layout="vertical"
              onFinish={handleSubmit}
            >
              <Row style={{ marginBottom: '16px'}}>
                <Col span={8} style={{ paddingRight: '16px' }}>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Title level={5} style={titleStyles}>Загрузка</Title>
                      <Form.List name={'loadingPayload'}>
                        {() => (
                          <React.Fragment>
                            {loadingPayloadFieldsTrans(true).map(item => item)}
                          </React.Fragment>
                        )}
                      </Form.List>
                    </Col>
                    <Col span={12}>
                      <Title level={5} style={titleStyles}>Разгрузка</Title>
                      <Form.List name={'unloadingPayload'}>
                        {() => (
                          <React.Fragment>
                            {loadingPayloadFieldsTrans(false).map(item => item)}
                          </React.Fragment>
                        )}
                      </Form.List>
                    </Col>
                  </Row>
                </Col>
                <Col span={16} style={{ backgroundColor: '#9e9e9e' }}>

                </Col>
              </Row>
              <Row gutter={16} align="bottom">
                <Col span={24}>
                  <Title level={5} style={titleStyles}>Дополнительно</Title>
                </Col>
                <Col span={10}>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name='address'
                        rules={[{ required: true }]}
                        label={'Наименование:'}
                      >
                        <Input
                          name='address'
                          placeholder={'Укажите наименование'}
                        />
                      </Form.Item>
                      <Form.Item
                        name='address'
                        rules={[{ required: true }]}
                        label={'Вес:'}
                      >
                        <Input
                          name='address'
                          placeholder={'Укажите вес'}
                        />
                      </Form.Item>
                      <Form.Item
                        name='address'
                        rules={[{ required: true }]}
                        label={'Объём:'}
                      >
                        <Input
                          name='address'
                          placeholder={'Укажите объём'}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name='address'
                        rules={[{ required: true }]}
                        label={'Тип груза:'}
                      >
                        <Select defaultValue="Тип1">
                          <Option value="Тип1">Тип1</Option>
                          <Option value="Тип2">Тип2</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item
                        name='address'
                        rules={[{ required: true }]}
                        label={'Способ погрузки:'}
                      >
                        <Select defaultValue="Способ1">
                          <Option value="Способ1">Способ1</Option>
                          <Option value="Способ2">Способ2</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item
                        name='address'
                        rules={[{ required: true }]}
                        label={'Тип машины:'}
                      >
                        <Select defaultValue="Машина1">
                          <Option value="Машина1">Машина1</Option>
                          <Option value="Машина2">Машина2</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
                <Col span={10}>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name='address'
                        rules={[{ required: true }]}
                        label={'Температурный Режим:'}
                      >
                        <Input.Group compact>
                          <Input style={{ width: '50%' }} placeholder="От" />
                          <Input
                            style={{ width: '50%' }}
                            placeholder="До"
                          />
                        </Input.Group>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name='address'
                        rules={[{ required: true }]}
                        label={'Стоимость:'}
                      >
                        <Input.Group compact>
                          <Input
                            style={{ width: '70%' }}
                            placeholder={'Укажите стоимость'}
                          />
                          <Select defaultValue="BYN" style={{ width: '30%' }}>
                            <Option value="BYN">BYN</Option>
                            <Option value="USD">USD</Option>
                          </Select>
                        </Input.Group>
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        name='address'
                        label={'Тип оплаты:'}
                      >
                        <Select defaultValue="Оплата1">
                          <Option value="Оплата1">Оплата1</Option>
                          <Option value="Оплата2">Оплата2</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        name='address'
                        label={'Описание:'}
                      >
                        <TextArea
                          rows={2}
                          placeholder={'Добавьте описание'}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
                <Col span={4}>
                  <Form.Item>
                    <Button
                      type={'primary'}
                      htmlType={'submit'}
                      style={{ width: '100%' }}
                    >
                      Разместить
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          )}
    </React.Fragment>

  )
}

export default withRouter(AddForm)