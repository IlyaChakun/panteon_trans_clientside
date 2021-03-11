import React, {Component} from 'react';
import {notification, Popconfirm} from "antd";

import {withRouter} from "react-router-dom";
import {deleteProductRequest} from "../../util/utilsAPI";
import {localizedStrings} from "../../util/localization";


class DeleteProductModal extends Component {

    state = {
        productId: this.props.productId,
        button: this.props.button
    };


    submitDelete = (productId) => {
        deleteProductRequest(productId)
            .then(() => {
                notification.success({
                    message: localizedStrings.alertAppName,
                    description: 'Успешное удаление!'
                });
                window.location.href = "/";
            }).catch(error => {
            if (error.status === 401) {
                this.props.handleLogout('/login', 'error', localizedStrings.alertLoggedOut);
            } else if (error.status === 404) {
                notification.error({
                    message: localizedStrings.alertAppName,
                    description: 'Продукт не найден!'
                });
            } else {
                notification.error({
                    message: localizedStrings.alertAppName,
                    description: error.message || localizedStrings.alertException
                });
            }
        });
    };


    confirm = (e) => {
        console.log(e);
        this.submitDelete(this.state.productId)
    };

    cancel = (e) => {
        console.log(e);
        // message.error('Click on No');
    };


    render() {

        return (
            <div>
                <Popconfirm
                    title="Вы уверены, что хотите удалить продукт?"
                    onConfirm={this.confirm}
                    onCancel={this.cancel}
                    okText="Да"
                    cancelText="Нет">
                    {this.state.button}
                </Popconfirm>
            </div>
        );
    }

}

export default withRouter(DeleteProductModal);
