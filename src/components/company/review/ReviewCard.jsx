import React, { Component } from 'react'
import { Card, Rate } from 'antd'
import './ReviewCard.css'

const { Meta } = Card

class ReviewCard extends Component {
  state = {
    review: this.props.review
  }

  render() {
    console.log('build review card: ' + JSON.stringify(this.state.review))

    return (

      <Card
        hoverable
        style={{ width: 400, height: 250 }}
        title={this.state.review.dateOfCreation}
        extra={
          <Rate
            value={this.state.review.rating}/>
        }
      >
        <Meta
          title={<strong>{this.state.review.name}</strong>}
        />
        <div className="box">
          <div className="preview-text text-justify">
            {this.state.review.text}
          </div>
        </div>
      </Card>
    )
  }
}

export default ReviewCard
