import React from 'react'
import { Button, Card, Col, Divider, Rate, Row, Table } from 'antd'
import { withRouter } from 'react-router-dom'

const { Column } = Table
const { Meta } = Card

const CompanyCard = ({ company }) => {
  const dataSource = []

  console.log(JSON.stringify(company))

  company.truckPark.map(truck => {
    dataSource.push({
      key: truck.id,
      cargoStowageMethod: truck.cargoStowageMethod,
      truckBodyType: truck.truckBodyType,
      dimensions: truck.dimensions
    })
  })

  return (
    <Card
      hoverable
      style={{ marginBottom: '20px' }}
      extra={
        <React.Fragment>
          <Row>
            <Col>
              Дата создания: {company.dateOfCreation}
            </Col>
          </Row>
          <Row>
            <Col>
              Дата регистрации: {company.dateOfRegistration}
            </Col>
          </Row>
        </React.Fragment>
      }

      title={
        <span>{company.title}</span>
      }

      cover={
        <Row style={{padding: '20px'}}>
          <Col span={6}>
            <img
              style={{ width: '100%', height: 'fill', objectFit: 'cover' }}
              alt={company.title}
              src={company.title === null ? ''
                : company.imageUrl}
            />
          </Col>
          <Col span={18} style={{padding: '20px'}}>
            <Row>
              <span>Рейтинг: </span>
              <Rate disabled value={company.rating.rating_value} defaultValue={2} />
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Button type='primary' style={{ width: '100%' }}>
                  Смотреть отзывы
                </Button>
              </Col>
              <Col span={12}>
                <Button type='primary' style={{ width: '100%' }}>
                  Добавить отзыв
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      }
    >
      <Row gutter={16}>
        <Col span={8}>
          <Row>
            <span>Сайт: {company.siteUrl}</span>
          </Row>
          <Divider />
          <Row>
            <span>E-mail: {company.email}</span>
          </Row>
          <Divider />
          <Row>
            <span>Тел: {company.phoneNumber}</span>
          </Row>
        </Col>
        <Col span={16}>
          <Row>
            <span>Описание:<br /> {company.description}</span>
          </Row>
        </Col>
      </Row>
      <Meta
        style={{ padding: '5px' }}
        title={
          <>
            <Divider/>
            <Row>
              <Col span={24}>
                Автопарк
              </Col>
            </Row>

            <Row>
              <Col span={24}>

                <Table
                  dataSource={dataSource}
                  footer={() => ''}
                >
                  <Column title='Способ погрузки' dataIndex='cargoStowageMethod' key='cargoStowageMethod'/>
                  <Column title='Тип кузова' dataIndex='truckBodyType' key='truckBodyType'/>
                  <Column title='Размеры' dataIndex='dimensions' key='dimensions'/>
                </Table>

              </Col>
            </Row>
            <Divider/>
          </>
        }
      />
    </Card>
  )
}

export default withRouter(CompanyCard)
