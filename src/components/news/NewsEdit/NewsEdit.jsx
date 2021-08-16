import React, { useState } from 'react'
import { Row, Col, notification } from 'antd'
import { Button, Form, Input } from 'antd'

import { withRouter, Link, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Upload, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { addArticle } from '../../../redux/actions/news'
import NewsEditModal from '../NewsEditModal/NewsEditModal'

const NewsForm = (props) => {

  return (
    <Row style={{ height: 'calc(100vh - 64px)' }} align={'middle'}>
      <Col xs={{ span: 20, offset: 2 }} sm={{ span: 16, offset: 4 }} md={{ span: 10, offset: 7 }}>
        <NewsEditModal {...props} title={true}/>
        <NewsEditModal {...props} description={true}/>
        <NewsEditModal {...props} content={true} image={true}/>
        <NewsEditModal {...props} image={true}/>
      </Col>
    </Row>
  )
}

export default withRouter(NewsForm)
