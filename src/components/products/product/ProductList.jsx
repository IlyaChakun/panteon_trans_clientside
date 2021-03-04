import React, {useEffect} from 'react'
import {withRouter} from "react-router-dom";
import {Col, List, Row, Select} from 'antd'
import LoadingIndicator from "../../common/util/LoadingIndicator";
import AddProductModal from "./AddProductModal"
import ProductCardProxy from "./ProductCardProxy"

import {useDispatch, useSelector} from "react-redux";
import {
    getProducts,
    fetchShops,
    productSelector,
    setPage,
    setShopId,
    setShopValue,
    setSize
} from "../../../redux/reducers/ProductsSliceReducer"
import SideMenu from '../../common/sidemenu/SideMenu'

const {Option} = Select;


const ProductList = (props) => {

    const dispatch = useDispatch()
    const {
        products,
        loading,
        errors,
        shops,
        shopId,
        shopValue,
        page,
        size,
        pagesCount,
        totalPages,
        totalElements,
        searchString
    } = useSelector(productSelector)

    useEffect(() => {
        dispatch(fetchShops())
    }, [dispatch])

    useEffect(() => {
        loadList()
    }, [dispatch])

    const updateList = () => {
        loadList(page, size, shopId)
    }

    const loadList = (page, size, shopId, minPrice, maxPrice, sortBy, sortType) => {
        const searchCriteria = {
            page: page,
            size: size,
            shopId: shopId,

            minPrice: minPrice,
            maxPrice: maxPrice,
            sortBy: sortBy,
            sortType: sortType
        };

        if (!shopId) {
            dispatch(getProducts(searchCriteria))
        } else {
            dispatch(getProducts(searchCriteria, shopId))
        }
    }

    const loadSearchList = (productName, minPrice, maxPrice, sortBy, sortType, checkedBrands) => {
        loadList(page, size, productName, minPrice, maxPrice, sortBy, sortType, checkedBrands);
    }


    // if (loading === true) {
    //     return <LoadingIndicator/>
    // }

    const addProductButton = shopId === undefined ? '' :
        (
            <AddProductModal shopId={shopId}
                             updateList={updateList}
            />
        )

    const productsMap = products
        .map(product => (
                <ProductCardProxy
                    history={props.history}
                    key={product.id}
                    product={product}
                />
            )
        )

    // const shopOptions = shops.map(
    //     shop =>
    //         <Option key={shop.id} value={shop.contacts.address}>
    //             {shop.contacts.city}, {shop.contacts.address}
    //         </Option>
    // )


    const handleShopChange = (input, option) => {
        dispatch(setShopId(option.props.key))
        dispatch(setShopValue(option.props.value))

        // this.setState({
        //         shopId: option.props.key,
        //         shopValue: option.props.value
        //     },
        //     () => {
        //         updateList(productsState.page, productsState.size, productsState.shopId)
        //     })

    }

    const onSizeChangeHandler = (currentPage, currentSize) => {
        dispatch(setSize(currentSize))
        dispatch(setPage(currentPage))
        loadList(currentPage, currentSize);
    };

    const onPageChangeHandler = (pageNumber) => {
        dispatch(setPage(pageNumber))
        loadList(pageNumber, size);
    };

    const loadMore = () => {
        loadList(page + 1, size);
    }


    return (
        <div className="pb-5">
            <Row justify="center">
                <Col span={22}>
                    <Row gutter={16} >
                        <Col span={6}>
                            <h1>Каталог</h1>
                            <SideMenu/>
                            {addProductButton}
                        </Col>
                        <Col span={18}>
                            <List
                              grid={{
                                  gutter: 4,
                                  column: 3,
                              }}
                              pagination={{

                                  loading: loading,
                                  showSizeChanger: true,

                                  defaultCurrent: Number(page),
                                  defaultPageSize: Number(size),

                                  pageSizeOptions: ["6", "9", "12"],
                                  position: "bottom",

                                  total: totalElements,

                                  showQuickJumper: true,
                                  onShowSizeChange: onSizeChangeHandler,
                                  onChange: onPageChangeHandler,

                                  loadMore: loadMore
                              }}
                              dataSource={productsMap}
                              renderItem={item => (
                                <List.Item>
                                    {item}
                                </List.Item>
                              )}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default withRouter(ProductList)
