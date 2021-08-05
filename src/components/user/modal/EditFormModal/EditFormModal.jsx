import React, { useState } from 'react'
import { Button, Form, Input, Modal, Select, Row, Col, notification } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { addCargo } from '../../../../redux/actions/cargo'
import { useDispatch, useSelector } from 'react-redux'
import { updateTransport } from '../../../../redux/actions/transport'

const EditFormModal = ({isCargo, isTransport, style, transport, cargo}) => {
  const dispatch = useDispatch()
  const { currentUser } = useSelector(state => state.authState)

  const [isLoading, setLoading] = useState(false)

  const [carryingCapacity, setCarryingCapacity] = useState('')
  const [volumeTransport, setVolumeTransport] = useState('')
  const [lengthTransport, setLengthTransport] = useState('')
  const [heightTransport, setHeightTransport] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  const [weight, setWeight] = useState(cargo ? cargo.weight : '')
  const [volume, setVolume] = useState(cargo ? cargo.volume : '')
  const [length, setLength] = useState(cargo ? cargo.length : '')
  const [height, setHeight] = useState(cargo ? cargo.height : '')
  const [description, setDescription] = useState(cargo ? cargo.description : '')

  const [visible, setVisible] = useState(false)

  console.log('cargo: ', cargo)

  const createTransportFromState = () => {
    return {
      // patch: [
      //   {
      //     op: "replace",
      //     path:
      //   }
      // ]
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
            message: 'Не удалось обновить груз',
            description: 'При обновлении груза возникла ошибка'
          })
          console.log('error: ', error)
        })

    }
    else {
      dispatch(updateTransport(createTransportFromState())).then((data) => {
        console.log(data)
        setVisible(false)
      })
    }
  }

  return (
    <React.Fragment>
      <Button
        type='primary'
        onClick={showModal}
        style={style}
        ghost
      >
        {'Редактировать'}
      </Button>
      <Modal
        title={isCargo ? 'Редактирование груза' : 'Добавление транспорта'}
        visible={visible}
        cancelText='Отменить'
        okText={'Изменить'}
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
            {isTransport && (
              <Form
                style={{ padding: '25px', backgroundColor: '#fff' }}
                onFinish={handleSubmit}
              >
                <Form.Item
                  name='carryingCapacity'
                  rules={[{ required: true }]}
                  onChange={event => setCarryingCapacity(event.target.value)}
                >
                  <Input
                    value={carryingCapacity}
                    name='carryingCapacity'
                    placeholder={'Грузоподъёмность'}
                  />
                </Form.Item>
                <Form.Item
                  name='volumeTransport'
                  rules={[{ required: true }]}
                  onChange={event => setVolumeTransport(event.target.value)}
                >
                  <Input
                    name='volumeTransport'
                    value={volumeTransport}
                    placeholder={'Объём транспорта'}
                  />
                </Form.Item>
                <Form.Item
                  name='lengthTransport'
                  rules={[{ required: true }]}
                  onChange={event => setLengthTransport(event.target.value)}
                >
                  <Input
                    name='lengthTransport'
                    value={lengthTransport}
                    placeholder={'Длина транспорта'}
                  />
                </Form.Item>
                <Form.Item
                  name='heightTransport'
                  rules={[{ required: true }]}
                  onChange={event => setHeightTransport(event.target.value)}
                >
                  <Input
                    name='heightTransport'
                    value={heightTransport}
                    placeholder={'Высота транспорта'}
                  />
                </Form.Item>
                <Form.Item
                  name='from'
                  rules={[{ required: true }]}
                  onChange={event => setFrom(event.target.value)}
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
                  onChange={event => setTo(event.target.value)}
                >
                  <Input
                    name='to'
                    value={to}
                    placeholder={'Куда'}
                  />
                </Form.Item>
                {/*<Form.List*/}
                {/*  name="truckBodyTypes"*/}
                {/*  rules={[*/}
                {/*    {*/}
                {/*      validator: async (_, names) => {*/}
                {/*        if (!names || names.length < 1) {*/}
                {/*          return Promise.reject(new Error('Не менее 1 типа кузова'));*/}
                {/*        }*/}
                {/*      },*/}
                {/*    },*/}
                {/*  ]}*/}
                {/*>*/}
                {/*  {(fields, { add, remove }, { errors }) => (*/}
                {/*    <>*/}
                {/*      {fields.map((field, index) => (*/}
                {/*        <Form.Item*/}
                {/*          label={index === 0 ? 'Типы кузова' : ''}*/}
                {/*          required={false}*/}
                {/*          key={field.key}*/}
                {/*        >*/}
                {/*          <Form.Item*/}
                {/*            {...field}*/}
                {/*            validateTrigger={['onChange', 'onBlur']}*/}
                {/*            rules={[*/}
                {/*              {*/}
                {/*                required: true,*/}
                {/*                whitespace: true,*/}
                {/*                message: "Введите тип кузова",*/}
                {/*              },*/}
                {/*            ]}*/}
                {/*            noStyle*/}
                {/*          >*/}
                {/*            <Input*/}
                {/*              placeholder="Тип кузова"*/}
                {/*              style={{ width: '60%' }}*/}
                {/*              onChange={truckBodyTypes[index]}*/}
                {/*            />*/}
                {/*          </Form.Item>*/}
                {/*          {fields.length > 1 ? (*/}
                {/*            <MinusCircleOutlined*/}
                {/*              className="dynamic-delete-button"*/}
                {/*              onClick={() => remove(field.name)}*/}
                {/*            />*/}
                {/*          ) : null}*/}
                {/*        </Form.Item>*/}
                {/*      ))}*/}
                {/*      <Form.Item>*/}
                {/*        <Button*/}
                {/*          type="dashed"*/}
                {/*          onClick={() => add()}*/}
                {/*          style={{ width: '60%' }}*/}
                {/*          icon={<PlusOutlined />}*/}
                {/*        >*/}
                {/*          Добавить тип кузова*/}
                {/*        </Button>*/}
                {/*        <Form.ErrorList errors={errors} />*/}
                {/*      </Form.Item>*/}
                {/*    </>*/}
                {/*  )}*/}
                {/*</Form.List>*/}
              </Form>
            )}
          </Col>
        </Row>
      </Modal>
    </React.Fragment>

  )
}

export default EditFormModal