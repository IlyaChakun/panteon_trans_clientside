import React, { useEffect } from 'react'
import { Layout, Typography, Rate, List, Row, Col, Divider, Table, Card } from 'antd'
import { withRouter, Redirect, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearCompany, getCompany } from '../../../redux/actions/company'
import AddReviewModal from '../review/AddReview/AddReviewModal'

const { Content } = Layout
const { Title } = Typography
const { Column } = Table
const { Meta } = Card

const CompanyProfile = (props) => {
  const dispatch = useDispatch()
  const companies = useSelector(state => state.companyState)
  const { currentUser } = useSelector(state => state.authState)

  useEffect(() => {
    dispatch(getCompany(props.match.params.id)).then(() => {
      window.scrollTo({ top: 0 })
    })
    return (() => {
      dispatch(clearCompany())
    })
  }, [])

  return (
    <Content style={{ padding: '30px' }}>
      {Object.keys(companies.company).length &&
        <div style={{ padding: '30px', backgroundColor: '#fff' }}>
          <Title>{companies.company.title}</Title>
          <img
            style={{ width: '100%', height: 'fill', objectFit: 'cover', marginBottom: '20px' }}
            alt={companies.company.title}
            src={companies.company.title === null ? '' : companies.company.imageUrl}
          />
          <Row align={'middle'} style={{ marginBottom: '20px' }}>
            <span style={{ marginRight: '10px' }}>Рейтинг:</span>
            {companies.company.rating &&
              <Rate disabled value={companies.company.rating.rating_value} />
            }
          </Row>
          <div style={{ marginBottom: '40px' }}>
            <Row>
              <span>Дата создания: {companies.company.dateOfCreation}</span>
            </Row>
            <Row style={{ marginBottom: '20px' }}>
              <span>Дата регистрации: {companies.company.dateOfRegistration}</span>
            </Row>
          </div>
          <div>
            <Row gutter={16}>
              <Col span={8}>
                <Row>
                  <span>Сайт: {companies.company.siteUrl}</span>
                </Row>
                <Divider />
                <Row>
                  <span>E-mail: {companies.company.email}</span>
                </Row>
                <Divider />
                <Row>
                  <span>Тел: {companies.company.phoneNumber}</span>
                </Row>
              </Col>
              <Col span={16}>
                <Row>
                  <span>Описание:<br /> {companies.company.description}</span>
                </Row>
              </Col>
            </Row>
            <Meta
              style={{ padding: '5px' }}
              title={
                <React.Fragment>
                  <Divider/>
                  <Row>
                    <Col span={24}>
                      Автопарк
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Table
                        dataSource={companies.company.truckPark.map(truck => {
                          return {
                            key: truck.id,
                            cargoStowageMethod: truck.cargoStowageMethod,
                            truckBodyType: truck.truckBodyType,
                            dimensions: truck.dimensions
                          }
                        })}
                        footer={() => ''}
                      >
                        <Column title='Способ погрузки' dataIndex='cargoStowageMethod' key='cargoStowageMethod'/>
                        <Column title='Тип кузова' dataIndex='truckBodyType' key='truckBodyType'/>
                        <Column title='Размеры' dataIndex='dimensions' key='dimensions'/>
                      </Table>
                    </Col>
                  </Row>
                  <Divider/>
                </React.Fragment>
              }
            />
          </div>
          <div>
            <Title level={3}>Отзывы:</Title>
            <AddReviewModal isCompany={true} />
            <List
              itemLayout="horizontal"
              dataSource={companies.company.rating.reviews}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={item.name}
                    description={item.text}
                  />
                </List.Item>
              )}
            />
          </div>
        </div>
      }
    </Content>
  )
}

export default withRouter(CompanyProfile)
