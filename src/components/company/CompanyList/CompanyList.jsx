import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Col, Divider, Form, Input, List, Row, Select, Steps } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import LoadingIndicator from '../../common/LoadingIndicator/LoadingIndicator'
import CompanyCardProxy from '../CompanyCardProxy/CompanyCardProxy'
import { getCompanies, setPage, setSize } from '../../../redux/actions/company'

const { Step } = Steps
const { Option } = Select

const CompanyList = () => {
  const dispatch = useDispatch()

  const {
    companies,
    loading,
    page,
    size,
    totalElements
  } = useSelector(state => state.companyState)

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
    dispatch(getCompanies(searchCriteria))
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
    <>
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
    </>
  )

  return (
    <div className='pb-5'>
      <Row justify='center'>
        <Col span={22}>
          <Row gutter={16} style={{padding: '30px'}}>
            <Col span={6}>
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
            <Col span={18}>
              <List
                pagination={{
                  loading: loading,
                  showSizeChanger: true,
                  defaultCurrent: page,
                  defaultPageSize: size,
                  pageSizeOptions: ['6', '9', '12'],
                  position: 'bottom',
                  total: totalElements,
                  showQuickJumper: true,
                  onShowSizeChange: onSizeChangeHandler,
                  onChange: onPageChangeHandler,
                  loadMore: loadMore
                }}

                dataSource={companyList}

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

export default withRouter(CompanyList)
