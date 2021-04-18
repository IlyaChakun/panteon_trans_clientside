import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { Button, Modal, notification } from 'antd'
import { localizedStrings } from '../util/localization'
import { saveShopRequest } from '../util/utilsAPI'
import ShopForm from './ShopForm'


class AddShopModal extends Component {
    state = {
        shop: {
            contacts: {
                firstPhoneNumber: "",
                secondPhoneNumber: "",
                email: "",
                city: "",
                address: "",
            },
            workingHours: "",
            image: null
        }
    }


    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };


    handleSubmitButton = (shopRequest) => {

        console.log('shop request: ' + shopRequest)

        saveShopRequest(shopRequest)
            .then(() => {
                notification.success({
                    message: 'Цветочный магазин',
                    description: 'Магазин сохранен!',
                })

                this.props.updateList()

                this.handleCancel()

            }).catch(error => {
            notification.error({
                message: 'Цветочный магазин',
                description: 'Чет пошло не так. сорян'
            })
        })
    }


    render() {

        return (
            <div className='mt-3 mb-5 float-right'>
                <Button type="primary" onClick={this.showModal}>
                    Добавить магазин
                </Button>

                <Modal
                    title="Добавить магазин"
                    visible={this.state.visible}
                    okButtonProps={{style: {display: 'none'}}}
                    onCancel={this.handleCancel}
                    centered
                    width={1200}
                >

                    <ShopForm
                        shop={this.state.shop}
                        action={'Добавить'}
                        validateStatus={''}
                        handleSubmitButton={this.handleSubmitButton}
                    />

                </Modal>
            </div>
        );
    }


}

export default withRouter(AddShopModal)
