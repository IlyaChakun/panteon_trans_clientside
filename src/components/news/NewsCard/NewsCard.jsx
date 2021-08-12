import React from 'react'
import { Card, Row } from 'antd'

const { Meta } = Card

const NewsCard = ({ article }) => {

  return (
    <Card
      hoverable
      cover={<img alt="example" height={200} style={{objectFit: 'cover'}} src={article.content.image} />}
    >
      <Meta title={article.title} />
      {article.description}
    </Card>
  )
}

export default NewsCard
