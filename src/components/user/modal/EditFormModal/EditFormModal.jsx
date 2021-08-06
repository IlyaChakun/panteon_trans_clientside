import React, { useState } from 'react'
import { Button, Form, Input, Modal, Select, Row, Col, notification, Table } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { addCargo } from '../../../../redux/actions/cargo'
import { useDispatch, useSelector } from 'react-redux'
import { updateTransport } from '../../../../redux/actions/transport'
import ChangeModal from '../../settings/ChangeModal/ChangeModal'
import ChangeDataModal from '../ChangeDataModal/ChangeDataModal'

const { Column } = Table

const EditFormModal = ({isCargo, isTransport, style, transport, cargo}) => {
  const dispatch = useDispatch()
  const { currentUser } = useSelector(state => state.authState)

  const [weight, setWeight] = useState(cargo ? cargo.weight : '')
  const [volume, setVolume] = useState(cargo ? cargo.volume : '')
  const [length, setLength] = useState(cargo ? cargo.length : '')
  const [height, setHeight] = useState(cargo ? cargo.height : '')
  const [description, setDescription] = useState(cargo ? cargo.description : '')

  const [visible, setVisible] = useState(false)

  const transportData = (transport) => [
    {
      key: '1',
      parameter: `Грузоподъёмность: ${transport.truckDimensions.carryingCapacity}`,
      control: {
        carryingCapacity: true
      }
    },
    {
      key: '2',
      parameter: `Объём: ${transport.truckDimensions.dimensions.volume}`,
      control: {
        volume: true
      }
    },
    {
      key: '3',
      parameter: `Длина: ${transport.truckDimensions.dimensions.length}`,
      control: {
        length: true
      }
    },
    {
      key: '4',
      parameter: `Высота: ${transport.truckDimensions.dimensions.height}`,
      control: {
        height: true
      }
    },
    {
      key: '5',
      parameter: `Откуда: ${transport.loadingPayload.address.address}`,
      control: {
        addressFrom: true
      }
    },
    {
      key: '6',
      parameter: `Куда: ${transport.unloadingPayload.address.address}`,
      control: {
        addressTo: true
      }
    },
  ];

  const createTransportFromState = () => {

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
        title={isCargo ? 'Редактирование груза' : 'Редактирование транспорта'}
        visible={visible}
        cancelText='Закрыть'
        onCancel={handleCancel}
        okButtonProps={{ style: { display: 'none' } }}
      >
        <Row>
          <Col span={24}>
            {isCargo && (
              <Form
                style={{ padding: '25px', backgroundColor: '#fff' }}
              >
                <Form.Item
                  name='description'
                  rules={[{ required: true }]}
                  onChange={event => setDescription({ value: event.target.value, isChange: true })}
                >
                  <Input
                    value={description.value}
                    name='description'
                    placeholder={'Описание'}
                  />
                </Form.Item>
                <Form.Item
                  name='weight'
                  rules={[{ required: true }]}
                  onChange={event => setWeight({ value: event.target.value, isChange: true })}
                >
                  <Input
                    name='weight'
                    value={weight.value}
                    placeholder={'Вес'}
                  />
                </Form.Item>
                <Form.Item
                  name='volume'
                  rules={[{ required: true }]}
                  onChange={event => setVolume({ value: event.target.value, isChange: true })}
                >
                  <Input
                    name='volume'
                    value={volume.value}
                    placeholder={'Объём'}
                  />
                </Form.Item>
                <Form.Item
                  name='length'
                  rules={[{ required: true }]}
                  onChange={event => setLength({ value: event.target.value, isChange: true })}
                >
                  <Input
                    name='length'
                    value={length.value}
                    placeholder={'Длина'}
                  />
                </Form.Item>
                <Form.Item
                  name='height'
                  rules={[{ required: true }]}
                  onChange={event => setHeight({ value: event.target.value, isChange: true })}
                >
                  <Input
                    name='height'
                    value={height.value}
                    placeholder={'Высота'}
                  />
                </Form.Item>
              </Form>
            )}
            {isTransport && (
              <Table showHeader={false} pagination={false} dataSource={transportData(transport)}>
                <Column dataIndex="parameter" key="parameter" />
                <Column
                  align={'right'}
                  dataIndex="control"
                  key="control"
                  render={(control) => { control = {...control, id: transport.id }; return <ChangeDataModal isTransport={true} {...control} />}}
                />
              </Table>
            )}
          </Col>
        </Row>
      </Modal>
    </React.Fragment>

  )
}

export default EditFormModal