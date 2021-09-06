import React, { useState } from 'react'
import {Button, Form, Input, Modal, Typography } from 'antd'

const { Title } = Typography

const AddDriver = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true)
    }

    const handleOk = () => {
        setIsModalVisible(false)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    return (
        <div>
            <Button
                type='primary'
                onClick={showModal}
            >
                Добавить водителя
            </Button>
            <Modal
                title='Добавление водителя'
                visible={isModalVisible}
                cancelText='Отменить'
                okText={'Добавить'}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form
                    layout={"vertical"}
                >
                    <Title level={4}>Основная информация</Title>
                    <Form.Item
                        name={'phone'}
                        rules={[
                            {
                                required: true,
                                message: 'Введите номер'
                            }
                        ]}
                        label={'Номер телефона:'}
                    >
                        <Input
                            name='message'
                            autoComplete='off'
                            placeholder={'Номер телефона'}
                        />
                    </Form.Item>
                    <Form.Item
                        name={'name'}
                        rules={[
                            {
                                required: true,
                                message: 'Введите имя'
                            }
                        ]}
                        label={'Имя:'}
                    >
                        <Input
                            name='message'
                            autoComplete='off'
                            placeholder={'Имя'}
                        />
                    </Form.Item>
                    <Form.Item
                        name={'surname'}
                        rules={[
                            {
                                required: true,
                                message: 'Введите текст'
                            }
                        ]}
                        label={'Фамилия:'}
                    >
                        <Input
                            name='message'
                            autoComplete='off'
                            placeholder={'Фамилия'}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>

    )
}

export default AddDriver