import React, { useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import {Button, Col, Divider, Form, Input, List, Row, Select, Typography} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useQueryParam, NumberParam } from 'use-query-params'

import LoadingIndicator from '../../../../common/LoadingIndicator/LoadingIndicator'
import DriverCard from "../DriverCard/DriverCard";
import {getProfileDrivers} from "../../../../../redux/actions/profile";
import AddDriver from "../AddDriver/AddDriver";

const DriverList = () => {
  const dispatch = useDispatch()
  const [page, setPage] = useQueryParam('page', NumberParam)
  const [size, setPageSize] = useQueryParam('size', NumberParam)

  const { drivers } = useSelector(state => state.profileState)

  useEffect(() => {
    loadList(page, size)
  }, [page, size])

  const loadList = (page, size) => {
    const searchCriteria = {
      page: page,
      size: size
    }
    dispatch(getProfileDrivers(1))
        .then((data) => {
          console.log('drivers: ', data)
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

  const driverList = (driversData) => {
    return driversData.objects.map(driver =>
        <DriverCard
            driver={driver}
        />
    )
  }

  return (
      <Row justify="center">
        <Col span={24}>
          <Row style={{ width: '100%', padding: '10px 0px' }}>
            <Col span={24}>
              <AddDriver/>
              <Divider style={{ margin: '64px 0 16px 0' }}/>
              {Object.keys(drivers).length === 0 ? (
                  <LoadingIndicator />
              ) : (
                  <List
                      pagination={{
                        showSizeChanger: true,
                        defaultCurrent: page || 1,
                        defaultPageSize: size || 6,
                        pageSizeOptions: ['6', '9', '12'],
                        position: 'bottom',
                        total: drivers.totalElements,
                        showQuickJumper: true,
                        onShowSizeChange: onSizeChangeHandler,
                        onChange: onPageChangeHandler,
                      }}
                      dataSource={driverList(drivers)}
                      renderItem={item => (
                          <List.Item style={{ backgroundColor: '#fff', padding: 0, marginBottom: '16px' }}>
                            {item}
                          </List.Item>
                      )}

                  />
              )}
            </Col>
          </Row>
        </Col>
      </Row>

  )
}

export default withRouter(DriverList)
