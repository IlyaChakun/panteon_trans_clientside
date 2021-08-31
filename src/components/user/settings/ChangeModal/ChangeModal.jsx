import React, {useEffect, useMemo, useState} from 'react'
import {Button, Form, Input, Modal, notification} from 'antd'


const ChangeModal = (props) => {
    const [value, setValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const [modalTitle, setModalTitle] = useState('')
    const [modalPlaceholder, setModalPlaceholder] = useState('')
    const [inputName, setInputName] = useState('')
    console.log('props: ', props)
    useEffect(() => {
        if (props.isEmail) {
            setModalTitle('Изменение адреса электронной почты')
            setModalPlaceholder('Введите новый адрес')
            setInputName('email')
        }
        if (props.isPassword) {
            setModalTitle('Изменение пароля')
            setModalPlaceholder('Введите новый пароль')
            setInputName('password')
        }
        if (props.isName) {
            setModalTitle('Изменение имени')
            setModalPlaceholder('Введите новое имя')
            setInputName('name')
        }
        if (props.isSurname) {
            setModalTitle('Изменение фамилии')
            setModalPlaceholder('Введите новую фамилию')
            setInputName('surname')
        }
        if (props.isLastname) {
            setModalTitle('Изменение отчества')
            setModalPlaceholder('Введите новое отчество')
            setInputName('lastname')
        }
    }, [props])

    const showModal = () => {
        setVisible(true)
    }

    const handleCancel = e => {
        setVisible(false)
    }

    const handleSubmit = () => {
    }

    return (
        <div>
            <Button
                type={props.isPassword ? 'primary' : 'link'}
                onClick={showModal}
            >
                { props.children || 'Изменить' }
            </Button>
            <Modal
                title={modalTitle}
                visible={visible}
                cancelText='Отменить'
                okText={'Применить'}
                onOk={handleSubmit}
                onCancel={handleCancel}
                confirmLoading={isLoading}
            >
                <Form layout={"vertical"}>
                    {props.isPassword ? (
                        <React.Fragment>
                            <Form.Item
                                name={inputName}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Введите текущий пароль'
                                    }
                                ]}
                                label={'Текущий пароль:'}
                            >
                                <Input
                                    name={inputName}
                                    autoComplete='off'
                                    placeholder={'Введите текущий пароль'}
                                    value={value}
                                    onChange={(event) => setValue(event.target.value)}
                                />
                            </Form.Item>
                            <Form.Item
                                name={inputName}
                                label={'Новый пароль:'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Введите новый пароль'
                                    }
                                ]}
                            >
                                <Input
                                    name={inputName}
                                    autoComplete='off'
                                    placeholder={'Введите новый пароль'}
                                    value={value}
                                    onChange={(event) => setValue(event.target.value)}
                                />
                            </Form.Item>
                            <Form.Item
                                name={inputName}
                                label={'Повторите новый пароль:'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Введите новый пароль'
                                    }
                                ]}
                            >
                                <Input
                                    name={inputName}
                                    autoComplete='off'
                                    placeholder={'Введите новый пароль'}
                                    value={value}
                                    onChange={(event) => setValue(event.target.value)}
                                />
                            </Form.Item>
                        </React.Fragment>
                    ) : (
                        <Form.Item
                            name={inputName}
                            rules={[
                                {
                                    required: true,
                                    message: modalPlaceholder
                                }
                            ]}
                        >
                            <Input
                                name={inputName}
                                autoComplete='off'
                                placeholder={modalPlaceholder}
                                value={value}
                                onChange={(event) => setValue(event.target.value)}
                            />
                        </Form.Item>
                    )}
                </Form>
            </Modal>
        </div>

    )
}

export default ChangeModal