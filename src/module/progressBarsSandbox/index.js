/**
 * Created by rihdus on 17/6/17.
 */

import React, {Component} from 'react';
import _ from 'lodash';

import ProgressBar from '../../components/progressBar/index';

import './index.css';

export default class View extends Component {

  constructor(props) {
    super(props);
    this.onProgressValueUpdate = this.onProgressValueUpdate.bind(this);

    this.state = {
      ...props
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps
    })
  }

  render() {
    const dataView = !this.props.loading ? (<div className="test-class-data-view">
        {_.map(this.state.bars, (value, i) => {
          return (<div key={`${i}`}
                       className="mb2 flexbox f-row text-class-progressbar-container">
            <div
              key={`prefix-${i}`}
              className={`p1 bar-prefix ${this.state.selectBarId == i ? 'active' : ''}`}>#{i}</div>
            <ProgressBar
              key={`bar-${i}`} value={value} max={this.state.maxVal}/>
          </div>)
        })}

        <div className="flexbox f-row flex-wrap">

          <div className="mr2 mt2">
            <div className="select-container">
              <select name="selectBar" id="bar-select"
                      className="selector"
                      onChange={(e) => {
                        this.onProgressSelect(e.target.value)
                      }}>
                {_.map(this.state.bars, (value, i) => {
                  return (<option key={i} value={i}>Progress #{i}</option>)
                })}
              </select>

            </div>

          </div>

          <span className="flex1"></span>

          <div className="ib">
            {_.map(this.state.buttons, (value, i) => {
              return (<button
                className={`button mt2 ${i > 0 ? 'ml1' : ''}`}
                key={i}
                value={value}
                max={this.state.maxVal}
                onClick={() => {
                  this.onProgressValueUpdate(value)
                }}>{value}</button>)
            })}
          </div>
        </div>
      </div>
    ) : null;

    const loadingView = this.props.loading ? (<div className="text-center test-class-loading-view">
      <p>Loading...</p>
    </div>) : null;

    return (
      <div className="flexbox f-col flex1">{loadingView}{dataView}</div>
    )
  }

  onProgressSelect(barId) {
    this.setState({
      selectBarId: barId
    })
  }

  onProgressValueUpdate(value) {
    const index = this.state.selectBarId;
    this.state.bars[index] += value;
    this.state.bars[index] = this.state.bars[index] < 0
      ? 0
      : this.state.bars[index];
    this.state.bars[index] = this.state.bars[index] > this.state.maxVal
      ? this.state.maxVal
      : this.state.bars[index];

    this.setState({
      bars: [...this.state.bars]
    })
  }
}
