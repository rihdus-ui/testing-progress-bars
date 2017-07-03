/**
 * Created by t_mehes on 3/7/17.
 */

import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';
import ReactTestUtils from 'react-dom/test-utils'
import axios from 'axios';
import sinon from 'sinon';

import ProgressbarView from './index.js';

describe('ProgressbarView', () => {
  let progressBarView = null;
  let sandbox = null
    , server = null
  ;
  beforeAll(() => {
    const data = {
      buttons: [31, 22, -48, -25],
      bars: [78, 71, 85, 73],
      limit: 200
    };
    progressBarView = renderer.create((<ProgressbarView
      maxVal={data.limit}
      selectBarId={0}
      bars={data.bars}
      buttons={data.buttons}
      loading={false}/>))
  });

  afterEach(() => {
  });

  it('component should render', () => {
    let tree = progressBarView.toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('component render', () => {
    const data = {
      buttons: [31, 22, -48, -25],
      bars: [78, 71, 85, 73],
      limit: 200
    };
    let progressBarDataView = null
      , emptyView = null;

    beforeAll(() => {
      progressBarDataView = shallow((<ProgressbarView
        maxVal={data.limit}
        selectBarId={0}
        bars={data.bars}
        buttons={data.buttons}
        loading={false}/>));

      emptyView = shallow((<ProgressbarView
        maxVal={data.limit}
        selectBarId={0}
        bars={data.bars}
        buttons={data.buttons}
        loading={true}/>))
    });

    it('should render loading view but not the data view when data is being loaded', () => {
      const dataView = emptyView.find('.test-class-data-view');
      const loadingView = emptyView.find('.test-class-loading-view');
      expect(dataView.node).toBe(undefined);
      expect(loadingView.node).not.toBe(undefined);
    });

    it('should render data view but not the loading view when data loading flag is false', () => {
      const dataView = progressBarDataView.find('.test-class-data-view');
      const loadingView = progressBarDataView.find('.test-class-loading-view');
      expect(dataView.node).not.toBe(undefined);
      expect(loadingView.node).toBe(undefined);
    });

    it('should update progressbar selection on progress select change', () => {
      const dataView = progressBarDataView.find('.test-class-data-view');
      expect(dataView).not.toBe(null);
      let sandboxView = ReactTestUtils.renderIntoDocument(<ProgressbarView
        maxVal={data.limit}
        selectBarId={0}
        bars={data.bars}
        buttons={data.buttons}
        loading={false}/>);

      /** Test State update **/
      expect(sandboxView.state.selectBarId).toBe(0);
      sandboxView.onProgressSelect(1);
      expect(sandboxView.state.selectBarId).toBe(1);
    });


    it('should update progressbar value on update', () => {
      const dataView = progressBarDataView.find('.test-class-data-view');
      let sandboxView = ReactTestUtils.renderIntoDocument(<ProgressbarView
        maxVal={data.limit}
        selectBarId={0}
        bars={data.bars}
        buttons={data.buttons}
        loading={false}/>);

      /** Test State update **/
      const originalVal = data.bars[0];

      expect(sandboxView.state.selectBarId).toBe(0);
      expect(sandboxView.state.bars[0]).toBe(originalVal);

      /** Simple Increment */
      sandboxView.onProgressValueUpdate(10);
      expect(sandboxView.state.bars[0]).toBe(originalVal + 10);

      /** Simple Decrement */
      sandboxView.onProgressValueUpdate(-9);
      expect(sandboxView.state.bars[0]).toBe(originalVal + 10 - 9);


      /** Test value overflow
       * --------------------
       * Value should not exceed max value.
       * **/
      sandboxView.onProgressValueUpdate(1000);
      expect(sandboxView.state.bars[0]).toBe(data.limit);


      /** Test value underflow
       * ----------------------
       * Value should not be less than 0 if the user tries to reduce the
       * value below the min value.
       * **/
      sandboxView.onProgressValueUpdate(-10000);
      expect(sandboxView.state.bars[0]).toBe(0);
    })

  });

});