import React, { Component } from 'react'
import { Card, Rate } from 'antd'

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
        title={this.state.review.dateOfCreation}
        extra={
          <Rate
            value={this.state.review.rating}/>
        }
      >
        <Meta
          title={<strong>{this.state.review.name}</strong>}
        />
        <div>
          <div>
            {this.state.review.text}
          </div>
        </div>
      </Card>
    )
  }
}

export default ReviewCard
