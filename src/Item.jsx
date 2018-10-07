import React, { Component } from 'react';
import { Button } from 'reactstrap';


class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: false,
    }

    this._showDetail = this._showDetail.bind(this)
  }

  render() {
    let detailToggle;
    if (!this.state.detail) {
      detailToggle = 'off'
    } else {
      detailToggle = 'on'
    }
    const meetupUrl = this.props.link
    const detailLink = `<a href= '${meetupUrl}'> more on Meetup.com</a>`
    const detail = this.props.detail.slice(0, 300).concat('...', detailLink)

    return (
      <div className='item pb-3 pt-3 text-center'>
        <h4>
          {this.props.name}
        </h4>
        <p>{this.props.date} at {this.props.time} || {this.props.rsvp} people are going</p>
        <div>
          <Button
            className='btn-sm btn-outline-primary'
            onClick={this._showDetail}
          >
            More </Button>
        </div>
        <div className={detailToggle}>
          <span className='text-left' dangerouslySetInnerHTML={{ __html: detail }}></span>
        </div>
      </div>
    );
  }

  _showDetail() {
    let detail = this.state.detail;
    if (!detail) {
      detail = true;
    } else {
      detail = false;
    }
    this.setState({
      detail: detail,
    })
  }
}

export default Item;