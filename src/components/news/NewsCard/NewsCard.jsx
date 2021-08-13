import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Row } from 'antd'

const { Meta } = Card

const NewsCard = ({ article }) => {

  return (
    <Link to={`/news/${article.id}`} style={{ textDecoration: 'none' }}>
      <Card
        hoverable
        cover={<img alt="example" height={200} style={{objectFit: 'cover'}} src={article.content.image} />}
      >
        <Meta title={article.title} />
        {article.description}
      </Card>
    </Link>
  )
}

export default NewsCard
