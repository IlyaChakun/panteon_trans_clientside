import React, { Component } from 'react'
import './ShopsBlock.css'
import { Link } from 'react-router-dom'
import ShopCard from './ShopCard'
import { getAllShopsRequest } from '../util/utilsAPI'

class ShopsBlock extends Component {

    state = {
        shops: [],

        page: 1,
        size: 2,
        pagesCount: 0,

        totalPages: 0,
        totalElements: 0,


        isLoading: false

    }

    componentDidMount() {
        this.loadList(this.state.page, this.state.size)
    }


    loadList = (page, size) => {

        const searchCriteria = {
            page: page,
            size: size
        };

        const promise = getAllShopsRequest(searchCriteria);
        if (!promise) {
            return;
        }
        this.extractPromise(promise);
    };


    extractPromise = (promise) => {

        this.setState({
            isLoading: true
        });

        promise
            .then(response => {

                this.setState({
                    shops: response.objects.slice(),
                    totalPages: response.totalPages,
                    totalElements: response.totalElements,
                });

            }).catch(() => {
            this.setState({
                isLoading: false
            });
        });
    };

    render() {

        const shopElements = this.state.shops
            .map(shop => (<ShopCard key={shop.id} shop={shop}/>))

        return (
            <div className="row shops-front">
                <div className="shops-top-info d-flex flex-row justify-content-between">
                    <h3>Адреса магазинов</h3>
                    <Link to="/cargo/shops">ПЕРЕЙТИ В РАЗДЕЛ</Link>
                </div>

                <div className="col-5">
                    {shopElements}
                </div>
                <div className="col-7">
                    {/*<MapContainer*/}
                    {/*    google={this.props.google}*/}
                    {/*    center={{lat: 53.893009, lng: 27.567444}}*/}
                    {/*    height='300px'*/}
                    {/*    zoom={14}*/}
                    {/*/>*/}
                </div>
            </div>
        )
    }
}

export default ShopsBlock

