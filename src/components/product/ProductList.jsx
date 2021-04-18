import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Col, List, Row } from 'antd'
import AddProductModal from './AddProductModal'
import ProductCardProxy from './ProductCardProxy'

import { useDispatch, useSelector } from 'react-redux'
import { getProducts, productSelector, setPage, setSize } from '../../redux/reducers/ProductsSliceReducer'
import SideMenu from '../common/sidemenu/SideMenu'
import LoadingIndicator from '../common/util/LoadingIndicator'


const ProductList = (props) => {
  const dispatch = useDispatch() //без него  ниче в стор нельзя положить фукнци ядя связи со сторром
  const {
    products,
    loading,
    page,
    size,
    totalElements
  } = useSelector(productSelector)   // селектор вытягивает все поля из конкретного стора

  useEffect(() => {
    loadList()
  }, [dispatch])

  const updateList = () => {
    loadList(page, size)
  }

  const loadList = (page, size, minPrice, maxPrice, sortBy, sortType) => {
    const searchCriteria = {
      page: page,
      size: size,

      minPrice: minPrice,
      maxPrice: maxPrice,
      sortBy: sortBy,
      sortType: sortType
    }
    dispatch(getProducts(searchCriteria))
  }

  const loadListWithCategory = (categoryId) => {
    const searchCriteria = {
      page: page,
      size: size,

      categoryId: categoryId
    }
    dispatch(getProducts(searchCriteria))
  }

  if (loading === true) {
    return <LoadingIndicator/>
  }

  const productsMap = products === undefined ? [] : products.map(product =>
    <ProductCardProxy
      history={props.history}
      key={product.id}
      product={product}
      updateList={updateList}
    />
  )

  const onSizeChangeHandler = (currentPage, currentSize) => {
    dispatch(setSize(currentSize))
    dispatch(setPage(currentPage))
    loadList(currentPage, currentSize)
  }

  const onPageChangeHandler = (pageNumber) => {
    dispatch(setPage(pageNumber))
    loadList(pageNumber, size)
  }

  const loadMore = () => {
    loadList(page + 1, size)
  }

  return (
    <div className='pb-5'>
      <Row justify='center'>
        <Col span={22}>
          <Row gutter={16}>
            <Col span={6}>
              <h1>Каталог</h1>
              <SideMenu loadListWithCategory={loadListWithCategory}/>
              <AddProductModal updateList={updateList}/>
            </Col>
            <Col span={18}>
              <List
                grid={{
                  gutter: 4,
                  column: 3
                }}
                pagination={{

                  loading: loading,
                  showSizeChanger: true,

                  defaultCurrent: Number(page),
                  defaultPageSize: Number(size),

                  pageSizeOptions: ['6', '9', '12'],
                  position: 'bottom',

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
