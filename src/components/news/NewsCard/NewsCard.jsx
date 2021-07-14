import React from 'react'
import { Card, Row } from 'antd'

const { Meta } = Card

const NewsCard = ({ news }) => {
  const randomViewCount = Math.floor(Math.random() * (1000 - 1) + 1)

  return (
    <>
      <Card
        hoverable
        style={{ width: 950 }}
        cover={
          <img
            width={150}
            height={400}
            alt={news.title}
            src={news.imageUrl}/>
        }
      >
        <Meta title={news.title}
          description={
            <>
              <strong style={{ color: 'black' }}>
                <Row>
                  {news.info}
                </Row>
              </strong>
              < div style={{ textAlign: 'right' }}>
                    Источник: {news.source}
                <br/>
                    Просмотров: {randomViewCount}
              </div>
            </>
          }
        />
      </Card>
    </>
  )
}

export default NewsCard
