import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Modal from "antd/es/modal";
import {saveBouquetRequest} from "../../util/utilsAPI";
import {localizedStrings} from "../../util/localization";
import {Button, notification} from "antd";
import BouquetForm from "./BouquetForm";


class AddBouquetModal extends Component {

    state = {
        bouquet: {
            id: "",
            dateOfLastUpdate: "",
            bouquetType: "",
            flowerLengthCosts: [],

            flowerColor: "",
            flowerSort: "",

            country: "",
            title: "",
            description: "",
            availableAmountOnStock: "",
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


    handleSubmitButton = (bouquetRequest) => {

        console.log('bouquet request: ' + bouquetRequest)

        saveBouquetRequest(bouquetRequest)
            .then(() => {
                notification.success({
                    message: localizedStrings.alertAppName,
                    description: 'Букет сохранен!',
                })

                this.props.updateList()

                this.handleCancel()

            }).catch(error => {
            notification.error({
                message: localizedStrings.alertAppName,
                description: 'Чет пошло не так. сорян'
            })
        })
    }


    render() {

        return (
            <div>
                <Button type="primary"
                        style={{background: "black", color: "white"}}
                        shape="round"
                        onClick={this.showModal}
                >
                    Добавить букет
                </Button>

                <Modal
                    title="Добавить букет"
                    visible={this.state.visible}
                    okButtonProps={{style: {display: 'none'}}}
                    onCancel={this.handleCancel}
                    centered
                    width={1200}
                >

                    <BouquetForm
                        bouquet={this.state.bouquet}
                        action={'Добавить'}
                        validateStatus={''}
                        shopId={this.props.shopId}
                        handleSubmitButton={this.handleSubmitButton}
                    />

                </Modal>
            </div>
        );
    }


}

export default withRouter(AddBouquetModal)
