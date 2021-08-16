import React, { useState } from 'react'
import { Row, Col, notification, Form, Input } from 'antd'
import { Button, Modal } from 'antd'

import { withRouter, Link, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Upload, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { addArticle, editArticle } from '../../../redux/actions/news'

const NewsEditModal = (props) => {

  const [title, setTitle] = useState({ value: '' })
  const [description, setDescription] = useState({ value: '' })
  const [content, setContent] = useState({ value: '' })
  const [image, setImage] = useState()
  const [visible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const dispatch = useDispatch()

  const showModal = () => {
    setVisible(true)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const validateFields = () => {
    if(props.content) {
      try {
        JSON.parse(content.value)
      }
      catch (e) {
        notification.error({
          message: 'Ожидался формат JSON',
          description: 'Содержимое должно быть JSON объектом'
        })
        return false
      }
    }
    if (props.image && !image) {
      notification.error({
        message: 'Вы не добавили изображение',
      })
      return false
    }
    return true
  }

  const handleSubmit = () => {
    if (validateFields()) {
      setConfirmLoading(true)
      let editData = {}
      if (title.value) {
        editData.title = title.value
      }
      if (description.value) {
        editData.description = description.value
      }
      if (content.value) {
        editData.content = JSON.stringify(JSON.parse(content.value))
      }
      if (image) {
        editData.image = image
      }

      dispatch(editArticle(props.match.params.id, editData))
        .then(() => {
          setConfirmLoading(false)
          setVisible(false)
          notification.success({
            message: 'Данные изменены',
          })
        })
        .catch(error => {
          setConfirmLoading(false)
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
    setContent({
      value: event.target.value
    })

  }

  const handleImageChange = (info) => {
    setImage(info.file)
  }

  return (
    <React.Fragment>
      <Button type="primary" onClick={showModal}>
        {props.title && 'Заголовок'}
        {props.description && 'Описание'}
        {props.content && 'Содержимое'}
        {props.image && 'Изображение'}
      </Button>
      <Modal
        title={
          props.title ? 'Изменение заголовка' :
          props.description ? 'Изменение описания' :
          props.content ? 'Изменение содержимого' :
          props.image ? 'Замена изображения' : ''
        }
        visible={visible}
        onOk={handleSubmit}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form>
          {props.image && (
            <Form.Item
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Введите новые данные'
                }
              ]}
            >
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
          )}
          {((props.image && props.content) || props.title || props.description) && (
            <Form.Item
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Введите новые данные'
                }
              ]}
              onChange={
                props.title ? handleTitleChange :
                  props.description ? handleDescriptionChange :
                    props.content ? handleContentChange : ''
              }
            >
              <Input.TextArea
                name={
                  props.title ? 'title' :
                    props.description ? 'description' :
                      props.content ? 'content' : ''
                }
                autoComplete='off'
                placeholder={'Новые данные'}
                value={
                  props.title ? title.value :
                    props.description ? description.value :
                      props.content ? content.value : ''
                }

              />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </React.Fragment>
  )
}

export default NewsEditModal
