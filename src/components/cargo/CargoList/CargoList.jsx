import React, { useEffect, useState } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Button, Col, Form, Input, List, Row, Select, Typography } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useQueryParam, NumberParam } from 'use-query-params';

import LoadingIndicator from '../../common/LoadingIndicator/LoadingIndicator'
import CargoCardProxy from '../CargoCardProxy/CargoCardProxy'
import { getCargos, setPage, setSize } from '../../../redux/actions/cargo'
import AddForm from '../../user/modal/AddForm/AddForm'
import L from "leaflet"
import 'leaflet/dist/leaflet.css'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet"

const { Title } = Typography

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
})

L.Marker.prototype.options.icon = DefaultIcon
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

  const cargosList = (cargosData) => {
    return cargosData.map(cargo =>
        <CargoCardProxy
            key={cargo.id}
            cargo={cargo}
            currentUser={currentUser}
        />
    )
  }

  const bodyTypeOptions = [
    <Option key={1} value={1}>
      ????????
    </Option>,
    <Option key={2} value={2}>
      ????????????????????????
    </Option>,
    <Option key={3} value={3}>
      ??????????????????
    </Option>,
    <Option key={4} value={4}>
      ????????????????
    </Option>,
    <Option key={5} value={5}>
      ????????????????
    </Option>
  ]

  const loadTypeOptions = [
    <Option key={1} value={1}>
      ????????????
    </Option>,
    <Option key={2} value={2}>
      ??????????????
    </Option>
  ]

  const search = (
    <React.Fragment>
      <Form.Item
        label={'?????????? ????????????????:'}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={'?????????? ??????????????????:'}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={'?????? ????????????????:'}
      >
        <Select style={{ width: '100%' }}>
          {loadTypeOptions}
        </Select>
      </Form.Item>

      <Form.Item
        label={'?????? ????????????:'}
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
          ??????????
        </Button>
      </Form.Item>
    </React.Fragment>
  )


  return (
    <Row justify="center">
      <Col md={24} lg={18}>
        <Row style={{ width: '100%', padding: '30px' }}>
          <Col span={6} style={{ backgroundColor: '#fff', padding: '20px' }}>
            <Title level={4}>?????????? ????????????</Title>
            <Form
              labelCol={{
                span: 24,
              }}
              wrapperCol={{
                span: 24,
              }}
            >
              {search}
            </Form>
          </Col>
          <Col span={18} style={{ backgroundColor: '#9e9e9e' }}>
            <MapContainer style={{ width: '100%', height: '100%' }} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
              <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[51.505, -0.09]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          </Col>
        </Row>
        <Row style={{ width: '100%', padding: '0 30px' }}>
          <Col span={24} style={{ width: '100%' }}>
            {/*{currentUser && <Button type={'primary'}><Link style={{ textDecoration: 'none' }} to={'/cargos/add'}>?????????????? ????????????</Link></Button>}*/}
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
                dataSource={cargosList(cargos)}
                renderItem={item => (
                  <List.Item style={{ backgroundColor: '#fff', padding: 0, marginBottom: '26px' }}>
                    {item}
                  </List.Item>
                )}
              />
            )}
            {!allowPagination && (
              <Link to={'/cargos'}><Button style={{ width: '100%' }}>?????? ??????????</Button></Link>
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default withRouter(CargoList)
