import React, { useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Button, Col, Row, Pagination } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getArticles, getNews } from '../../../redux/actions/news'
import NewsCard from '../NewsCard/NewsCard'
import { useQueryParam, NumberParam, StringParam } from 'use-query-params'

const NewsList = () => {
  const dispatch = useDispatch()
  const [page, setPage] = useQueryParam('page', NumberParam)
  const [size, setPageSize] = useQueryParam('size', NumberParam)

  const { news, totalElements } = useSelector(state => state.newsState)

  useEffect(() => {
    dispatch(getArticles({page, size}))
  }, [page, size])

  const onSizeChangeHandler = (page, size) => {
    setPageSize(size)
  }

  const onPageChangeHandler = (pageNumber) => {
    window.scrollTo({top: 0});
    setPage(pageNumber)
  }

  return (
    <div style={{ width: '86%', maxWidth: '1068px', margin: 'auto', padding: '20px 0' }}>
      <Button type="primary" style={{ marginBottom: '20px' }}><Link to={'/news/add'} style={{ textDecoration: 'none' }}>Добавить новость</Link></Button>
      {news.length && totalElements && (
        <React.Fragment>
          <Row gutter={[16, 24]} style={{ paddingBottom: '20px' }}>
            {news.map(article => (
              <Col key={article.id} className="gutter-row" span={12}>
                <NewsCard article={article} />
              </Col>
            ))}
          </Row>
          <Pagination
            defaultCurrent={page || 1}
            total={totalElements}
            showSizeChanger={true}
            pageSizeOptions={[2, 8, 14]}
            defaultPageSize={size || 8}
            onChange={onPageChangeHandler}
            onShowSizeChange={onSizeChangeHandler}
          />
        </React.Fragment>
      )}
    </div>
  )
}

export default withRouter(NewsList)
