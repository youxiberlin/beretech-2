import React from 'react';
import axios from 'axios';
import List from './List';
import Footer from './Footer';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      meetup: [],
      loading: true,
    }
  }

  componentDidMount() {
    axios
      .get('https://api.meetup.com/find/upcoming_events?key=54465a657dc2b49e3743e613548e&excluded_groups=29613865,25779929,4927432,13625922,24913806,18395143,23042925,254815626&lat=52.516382&lon=13.377954&topic_category=9696,108403,10579,7860&sign=true')
      .then(result => {
        this.setState({ meetup: result.data.events, loading: false })
      })
      .catch(console.error)
  }


  render() {
    if (this.state.loading) {
      return <div className='spinner'>loading.....</div>
    }

    return (
      <div className="application">
        <header><h1>Berlin tech meetup</h1></header>
        <List
          meetup={this.state.meetup}
        />
        <Footer />
      </div>
    )
  }


}

export default App
