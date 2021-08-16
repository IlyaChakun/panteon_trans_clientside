import React, { useEffect, useState } from 'react'
import { Button, Col, notification, Row, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearArticle, deleteArticle, getArticle } from '../../../redux/actions/news'

const { Title, Paragraph } = Typography

const NewsArticle = (props) => {
  const dispatch = useDispatch()
  const { article } = useSelector(state => state.newsState)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    dispatch(getArticle(props.match.params.id))
      .catch(error => {
        notification.error({
          message: 'Не удалось загрузить новость',
        })
      })
    return (() => {
      dispatch(clearArticle())
    })
  }, [])

  const handleDelete = () => {
    setLoading(true)
    dispatch(deleteArticle(props.match.params.id))
      .then(data => {
        props.history.push('/news')
        notification.success({
          message: 'Новость удалена',
        })
      })
      .catch(error => {
        setLoading(false)
        notification.error({
          message: 'Не удалось удалить новость',
        })
      })
  }

  return (
    <div style={{ width: '86%', maxWidth: '1068px', margin: 'auto', padding: '20px 0' }}>
      {Object.keys(article).length && (
        <React.Fragment>
          <div style={{ marginBottom: '20px' }}>
            <Button type="primary" style={{ marginRight: '16px' }} ><Link to={`/news/${props.match.params.id}/edit`} style={{ textDecoration: 'none' }}>Редактировать</Link></Button>
            <Button type="primary" danger onClick={handleDelete} loading={loading}>Удалить</Button>
          </div>
          <Row>
            <Col span={24}  style={{
              backgroundImage: `url("${article.content.image}")`,
              backgroundSize: 'cover',
              backgroundPositionX: 'center',
              backgroundPositionY: 'center',
              backgroundRepeat: 'no-repeat',
              marginBottom: '34px'
            }}>
              <div style={{ padding: '100px 50px', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                <Title style={{ color: '#fff' }}>{article.title}</Title>
                <Title style={{ margin: '0', color: '#fff' }} level={4}>{article.description}</Title>
              </div>
            </Col>
            <Col span={24}>
              {article.content.sections.map((section, secNum) => (
                <React.Fragment key={secNum}>
                  <Title level={3}>{section.header}</Title>
                  {section.paragraphs.map((paragraph, pNum) => (
                    <Paragraph key={pNum}>{paragraph.text}</Paragraph>
                  ))}
                </React.Fragment>
              ))}
            </Col>
          </Row>
        </React.Fragment>
      )}
    </div>
  )
}

export default NewsArticle
