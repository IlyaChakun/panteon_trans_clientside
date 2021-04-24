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
      style={{ width: '200%', marginTop: 16 }}

      extra={
        <>
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
        </>
      }

      title={
        <span>{company.title}</span>
      }

      cover={
        <Row>
          <Col span={4}>
            <div>
              <img
                style={{ width: '150px', height: '150px', margin: '20px' }}
                alt={company.title}
                src={company.title === null ? ''
                  : company.imageUrl}
              />
            </div>
          </Col>
          <Col span={6}>
            <Divider/>
            <Row>
              <span>Сайт: {company.siteUrl}</span>
            </Row>
            <Divider/>
            <Row>
              <span>E-mail: {company.email}</span>
            </Row>
            <Divider/>
            <Row>
              <span>Тел: {company.phoneNumber}</span>
            </Row>
            <Divider/>
          </Col>
          <Col span={8}>
            <Divider/>
            <Row>
              <span>Описание:<br/> {company.description}</span>
            </Row>
            <Divider/>
          </Col>
          <Col span={6}>
            <Row>
              <span>Рейтинг: </span>
              <Rate disabled value={company.rating.rating_value} defaultValue={2}/>
            </Row>
            <Divider/>
            <Row>
              <Button type='primary'>
                Смотреть отзывы
              </Button>
            </Row>
            <Divider/>
            <Row>
              <Button type='primary'>
                Добавить отзыв
              </Button>
            </Row>
          </Col>
        </Row>
      }
    >

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

        description={

          <Row>
            <Col span={24}>
              <Row>

              </Row>
              <Row>

              </Row>
            </Col>
          </Row>

        }
      />
    </Card>
  )
}

export default withRouter(CompanyCard)
