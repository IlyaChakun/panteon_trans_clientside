import React, { useState } from 'react'
import { Row, Col, notification } from 'antd'
import { Button, Form, Input } from 'antd'

import { withRouter, Link, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Upload, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { addArticle } from '../../../redux/actions/news'

const NewsForm = (props) => {

  const [title, setTitle] = useState({ value: '' })
  const [description, setDescription] = useState({ value: '' })
  const [content, setContent] = useState({ value: {} })
  const [image, setImage] = useState()

  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()

  const validateFields = () => {
    if(!content.value){
      notification.error({
        message: 'Ожидался формат JSON',
        description: 'Содержимое должно быть JSON объектом'
      })
      return false
    }
    if (!image) {
      notification.error({
        message: 'Вы не добавили изображение',
      })
      return false
    }
    return true
  }

  const handleSubmit = () => {
    if (validateFields()) {
      setLoading(true)
      dispatch(addArticle(image, {
        title: title.value,
        description: description.value,
        content: JSON.stringify(content.value)
      }))
        .then(() => {
          setLoading(false)
          props.history.push('/news')
        })
        .catch(error => {
          setLoading(false)
          notification.error({
            message: 'Ошибка отправки данных',
          })
        })
    }
  }

  const handleTitleChange = (event) => {
    setTitle({
      value: event.target.value,
    })
  }

  const handleDescriptionChange = (event) => {
    setDescription({
      value: event.target.value,
    })
  }

  const handleContentChange = (event) => {
    const value = event.target.value
    try {
      setContent({
        value: JSON.parse(value)
      })
    } catch (e) {
      setContent({
        value: null
      })
    }
  }

  const handleImageChange = (info) => {
    setImage(info.file)
  }

  return (
    <Row style={{ height: 'calc(100vh - 64px)' }} align={'middle'}>
      <Col xs={{ span: 20, offset: 2 }} sm={{ span: 16, offset: 4 }} md={{ span: 10, offset: 7 }}>
        <Form
          style={{ padding: '25px', backgroundColor: '#fff' }}
          onFinish={handleSubmit}
        >
          <Form.Item
            name='title'
            rules={[{ required: true, message: 'Введите заголовок' }]}
            onChange={handleTitleChange}
          >
            <Input
               value={title.value}
               name='title'
               placeholder={'Заголовок'}
            />
          </Form.Item>

          <Form.Item
            name='description'
            rules={[{ required: true, message: 'Введите описание' }]}
            onChange={handleDescriptionChange}
          >
            <Input
              name='description'
              value={description.value}
              placeholder={'Описание'}
            />
          </Form.Item>

          <Form.Item
            name='content'
            rules={[{ required: true, message: 'Введите содержимое' }]}
            onChange={handleContentChange}
          >
            <Input.TextArea
              name='content'
              value={content.value}
              placeholder={'Содержимое (JSON)'}
            />
          </Form.Item>

          <Form.Item>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={
                {
                  showDownloadIcon: false,
                  showPreviewIcon: false,
                  showRemoveIcon: true
                }
              }
              onChange={handleImageChange}
              beforeUpload={Upload.LIST_IGNORE}
              maxCount={1}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item
            style={{marginBottom: '0'}}
          >
            <Button
              type='primary'
              htmlType='submit'
              style={{width: '100%', marginBottom: '16px'}}
              loading={loading}
            >
              {'Запостить'}
            </Button>
            <Button type={'link'} style={{padding: '0'}}><Link to={'/news'} style={{ textDecoration: 'none' }}>Вернуться на основной раздел</Link></Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}

export default withRouter(NewsForm)
