import React, { useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Button, Col, Divider, Form, Input, List, Row, Select } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { getArticles, getNews } from '../../../redux/actions/news'
import NewsCard from '../NewsCard/NewsCard'

const style = { background: '#0092ff', padding: '8px 0' }

const NewsList = () => {
  const dispatch = useDispatch()

  const { news } = useSelector(state => state.newsState)

  useEffect(() => {
    dispatch(getArticles())
  }, [])

  const loadList = (page, size) => {
    const searchCriteria = {
      page: page,
      size: size
    }
    dispatch(getNews())
  }


  return (
    <div style={{ width: '86%', maxWidth: '1068px', margin: 'auto', padding: '20px 0' }}>
      <Button type="primary" style={{ marginBottom: '20px' }}><Link to={'/news/add'} style={{ textDecoration: 'none' }}>Добавить новость</Link></Button>
      {news.length && (
        <Row gutter={[16, 24]}>
          {news.map(article => (
            <Col key={article.id} className="gutter-row" span={12}>
              <NewsCard article={article} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  )
}

export default withRouter(NewsList)
