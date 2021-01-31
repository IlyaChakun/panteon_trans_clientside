import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Modal from "antd/es/modal";
import {getBouquetByIdRequest, updateBouquetRequest} from "../../util/utilsAPI";
import {localizedStrings} from "../../util/localization";
import {notification} from "antd";
import {isAdmin} from "../../../app/App";
import SettingOutlined from "@ant-design/icons/lib/icons/SettingOutlined";
import LoadingIndicator from "../../common/util/LoadingIndicator";
import {SUCCESS} from "../../../constants";
import BouquetForm from "./BouquetForm";

class EditBouquetModal extends Component {

    state = {
        shopId: this.props.shopId,

        productId: this.props.productId,

        loading: true,
        product: null
    }


    componentDidMount() {

        const product = getBouquetByIdRequest(this.state.productId);

        product
            .then(response => {

                this.setState({
                    product: {

                        id: response.id,
                        dateOfLastUpdate: response.dateOfLastUpdate,
                        bouquetType: response.bouquetType,
                        flowerColor: response.flowerColor,
                        flowerLengthCosts: response.flowerLengthCosts,
                        flowerSort: response.flowerSort,
                        country: response.country,
                        title: response.title,
                        description: response.description,
                        availableAmountOnStock: response.availableAmountOnStock,

                    }
                });

            })
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


    handleSubmitButton = (request) => {

        console.log('flower request: ' + request.shop.id)

        updateBouquetRequest(request.id, request)
            .then(() => {
                notification.success({
                    message: localizedStrings.alertAppName,
                    description: 'Букет обновлен!',
                })
                this.handleCancel()

            }).catch(error => {
            notification.error({
                message: localizedStrings.alertAppName,
                description: 'Чет пошло не так. сорян'
            })
        })
    }


    render() {

        const loadingIndicatorOrReadyBouquetForm = this.state.product === null ?
            (
                <LoadingIndicator/>
            ) : (
                <BouquetForm
                    bouquet={this.state.product}
                    action={'Изменить'}
                    shopId={this.state.shopId}
                    validateStatus={SUCCESS}
                    handleSubmitButton={this.handleSubmitButton}
                />
            );


        return (
            <div>

                <span className={isAdmin(this.props.currentUser) ? '' : 'custom-hidden'}>
                      <SettingOutlined style={{fontSize: '25px'}} onClick={this.showModal}/>
                </span>

                <Modal
                    title="Изменить букет"
                    visible={this.state.visible}
                    okButtonProps={{style: {display: 'none'}}}
                    onCancel={this.handleCancel}
                    centered
                    width={1200}
                >
                    {loadingIndicatorOrReadyBouquetForm}
                </Modal>
            </div>
        );
    }


}

export default withRouter(EditBouquetModal)
