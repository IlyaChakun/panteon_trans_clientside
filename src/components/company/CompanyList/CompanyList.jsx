import React, { useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Button, Col, Form, Input, List, Row, Select, Steps } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import LoadingIndicator from '../../common/LoadingIndicator/LoadingIndicator'
import CompanyCardProxy from '../CompanyCardProxy/CompanyCardProxy'
import { getCompanies } from '../../../redux/actions/company'
import { useQueryParam, NumberParam } from 'use-query-params';

const { Option } = Select

const CompanyList = (props) => {
  const dispatch = useDispatch()
  const [page, setPage] = useQueryParam('page', NumberParam)
  const [size, setPageSize] = useQueryParam('size', NumberParam)
  const [allowPagination, setAllowPagination] = useState(props.location.pathname.split('/')[1] === 'companies')

  const {
    companies,
    totalElements
  } = useSelector(state => state.companyState)

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
    dispatch(getCompanies(searchCriteria))
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

  const companyList = companies.map(company =>
    <CompanyCardProxy
      key={company.id}
      company={company}
      updateList={updateList}
    />
  )

  const ratingOptions = [
    <Option key={1} value={1}>
      1
    </Option>,
    <Option key={2} value={2}>
      2
    </Option>,
    <Option key={3} value={3}>
      3
    </Option>,
    <Option key={4} value={4}>
      4
    </Option>,
    <Option key={5} value={5}>
      5
    </Option>
  ]

  const search = (
    <React.Fragment>
      <Form.Item
        style={{width: '100%'}}
        label={'По названию или УНН:'}
      >
        <Input
          style={{ fontSize: '16px', width: '100%'}}
        />
      </Form.Item>

      <Form.Item
        style={{width: '100%'}}
        label={'Местоположение:'}
      >
        <Input
          style={{ fontSize: '16px', width: '100%'}}
        />
      </Form.Item>

      <Form.Item
        style={{width: '100%'}}
        label={'Рейтинг:'}
      >
        <Select
          style={{ fontSize: '16px', width: '100%'}}
        >
          {ratingOptions}
        </Select>
      </Form.Item>

      <Form.Item
        style={{width: '100%'}}>

        <Button
          type='primary'
          htmlType='submit'
          style={{width: '100%'}}
        >
          Найти компанию
        </Button>
      </Form.Item>
    </React.Fragment>
  )

  return (
    <React.Fragment>
        <Row justify='center'>
          <Col span={22}>
            <Row gutter={16} style={{ padding: '30px' }}>
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
                {!companies.length ? (
                  <LoadingIndicator />
                ) : (
                  <List
                    pagination={allowPagination ? {
                      showSizeChanger: true,
                      defaultCurrent: page || 1,
                      defaultPageSize: size || 3,
                      pageSizeOptions: ['3', '6', '9'],
                      position: 'bottom',
                      total: totalElements,
                      showQuickJumper: true,
                      onShowSizeChange: onSizeChangeHandler,
                      onChange: onPageChangeHandler,
                    } : false}
                    dataSource={companyList}
                    renderItem={item => (
                      <List.Item style={{ padding: '0' }}>
                        {item}
                      </List.Item>
                    )}
                  />
                )}
                {!allowPagination && (
                  <Link to={'/companies'}><Button style={{ width: '100%' }}>Все компании</Button></Link>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
    </React.Fragment>

  )
}

export default withRouter(CompanyList)
