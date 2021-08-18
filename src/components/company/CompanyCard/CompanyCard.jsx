import React from 'react'
import { Button, Card, Col, Divider, Rate, Row, Table } from 'antd'
import { withRouter } from 'react-router-dom'

const { Column } = Table
const { Meta } = Card

const CompanyCard = ({ company }) => {
  const dataSource = []

  // company.truckPark.map(truck => {
  //   dataSource.push({
  //     key: truck.id,
  //     cargoStowageMethod: truck.cargoStowageMethod,
  //     truckBodyType: truck.truckBodyType,
  //     dimensions: truck.dimensions
  //   })
  // })
  const getCompanyType = () => {
    if (company.businessType === 'FREIGHT_OWNER') {
      return 'Грузовладелец'
    }
    if (company.businessType === 'FREIGHT_OPERATOR') {
      return 'Перевозчик'
    }
    if (company.businessType === 'FREIGHT_FORWARDER') {
      return 'Экпедитор'
    }
  }

  return (
    <Row>
      <Col span={24}>
      <Card
        hoverable
        style={{ marginBottom: '20px' }}
        extra={
          <React.Fragment>
            <Row>
              <Col>
                {getCompanyType()}
              </Col>
            </Row>
            <Row>
              <Col>
                Дата создания: {company.foundationDate}
              </Col>
            </Row>
            {/*<Row>*/}
            {/*  <Col>*/}
            {/*    Дата регистрации: {company.dateOfRegistration}*/}
            {/*  </Col>*/}
            {/*</Row>*/}
          </React.Fragment>
        }

        title={
          <span>{company.title}</span>
        }

        // cover={
        //   <React.Fragment>
        //     <Row style={{ padding: '20px' }}>
        //       <img
        //         style={{ width: '100%', height: 'fill', objectFit: 'cover' }}
        //         alt={company.title}
        //         src={company.title === null ? ''
        //           : company.imageUrl}
        //       />
        //     </Row>
        //     <Row style={{ padding: '0 20px' }} align="middle">
        //       <span style={{ marginRight: '10px' }}>Рейтинг:</span>
        //       <Rate disabled value={company.rating.rating_value} />
        //     </Row>
        //   </React.Fragment>
        // }
      >
        <Row gutter={16}>
          <Col span={8}>
            <Row>
              <span>Сайт: {company.site}</span>
            </Row>
            <Divider />
            <Row>
              <span>E-mail: {company.email}</span>
            </Row>
            <Divider />
            <Row>
              <span>Тел: {company.phoneNumbers[0]}</span>
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
            <React.Fragment>
              <Divider/>
              <Row>
                <Col span={24}>
                  Автопарк
                </Col>
              </Row>

              <Row onClick={e => e.preventDefault()}>
                <Col span={24}>

                  {/*<Table*/}
                  {/*  dataSource={dataSource}*/}
                  {/*  footer={() => ''}*/}
                  {/*>*/}
                  {/*  <Column title='Способ погрузки' dataIndex='cargoStowageMethod' key='cargoStowageMethod'/>*/}
                  {/*  <Column title='Тип кузова' dataIndex='truckBodyType' key='truckBodyType'/>*/}
                  {/*  <Column title='Размеры' dataIndex='dimensions' key='dimensions'/>*/}
                  {/*</Table>*/}

                </Col>
              </Row>
              <Divider/>
            </React.Fragment>
          }
        />
      </Card>
      </Col>
    </Row>

  )
}

export default CompanyCard
