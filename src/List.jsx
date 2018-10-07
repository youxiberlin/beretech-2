import React, { Component } from 'react';
import Item from './Item'
import { Button } from 'reactstrap';


class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      meetup: [],
      loading: true,
      displayList: 10,
    }

    this._sortByDate = this._sortByDate.bind(this)
    this._sortByRsvp = this._sortByRsvp.bind(this)
    this._loadList = this._loadList.bind(this)

  }

  componentDidMount() {
    this._createList()
  }

  render() {
    if (this.state.loading) {

    }

    const mappedList = this.state.meetup.map((el, i) =>
      <Item
        key={i}
        id={el.id}
        name={el.name}
        detail={el.description.slice(0, 300)}
        date={el.local_date}
        time={el.local_time}
        rsvp={el.rsvp}
        link={el.link}
      />
    ).slice(0, this.state.displayList)

    return (
      <div>
        <div className='search-btn'>
          <Button
            color='primary'
            onClick={this._sortByDate}
            className='mr-4'
          >
            Sort by Date </Button>

          <Button
            color='info'
            onClick={this._sortByRsvp}
          >
            Sort by RSVP number </Button>
        </div>
        <div className='main-list'>
          {mappedList}
        </div>
        <div className='text-center mt-3 mb-3'>
          <Button
            color='info'
            onClick={this._loadList}
          >
            More </Button>
        </div>
      </div>
    );
  }

  _createList() {
    const newArray = [];
    const meetupLi = this.props.meetup
    meetupLi.forEach(el => {
      let placeholder = {
        name: 'unknown',
        lat: 52.516382,
        lon: 13.377954
      }
      newArray.push({
        id: el.id,
        name: el.name,
        description: el.description ? el.description : 'unknown',
        local_time: el.local_time,
        local_date: el.local_date,
        group: el.group,
        venue: el.venue ? el.venue : placeholder,
        rsvp: el.yes_rsvp_count,
        link: el.link
      })
    })
    this.setState({
      meetup: newArray,
      loading: false,
    })
  }

  _compareDate(a, b) {
    if (a.local_date > b.local_date) {
      return 1;
    } else if (a.local_date < b.local_date) {
      return -1;
    } else {
      return 0;
    }
  }

  _sortByDate() {
    this.setState({
      meetup: this.state.meetup.sort(this._compareDate)
    })
  }

  _compareRsvp(a, b) {
    if (a.rsvp > b.rsvp) {
      return -1;
    } else if (a.rsvp < b.rsvp) {
      return 1;
    } else {
      return 0;
    }
  }

  _sortByRsvp() {
    this.setState({
      meetup: this.state.meetup.sort(this._compareRsvp)
    })
  }

  _loadList() {
    this.setState({
      displayList: this.state.displayList + 3
    })
  }

}

export default List;