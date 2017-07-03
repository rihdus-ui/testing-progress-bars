import React, {Component} from 'react';
import './App.css';
import ProgressBarView from './module/progressBarsSandbox/index';
import 'font-awesome/css/font-awesome.css'
import store from './module/progressBarsSandbox/store';

class App extends Component {

  constructor(props) {
    super(props);

    this.layoutProps = {
      asideTabThickness: '30px'
    };

    this.state = {
      loading: true,
      data: {},
      bars: [],
      selectBarId: 0,
      buttons: [],
      maxVal: 0
    }
  }

  componentDidMount() {
    let _this = this;
    this.setState({loading: true});
    store.read()
      .then((resp) => {
        setTimeout(() => {
          _this.setState({
            loading: false,
            data: resp.data,
            bars: resp.data.bars,
            selectBarId: 0,
            buttons: resp.data.buttons,
            maxVal: resp.data.limit
          });
        }, 200);
      })
  }

  render() {
    return (
      <div className="App flexbox f-col">
        <h1>SVG Progress-bars Playground</h1>
        <div style={{width: '100%', maxWidth: '1000px', margin: 'auto'}}>
          <ProgressBarView
            maxVal={this.state.maxVal}
            selectBarId={this.state.selectBarId}
            bars={this.state.bars}
            buttons={this.state.buttons}
            loading={this.state.loading}/>
        </div>
      </div>
    );
  }
}

export default App;
