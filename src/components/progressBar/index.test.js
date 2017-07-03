/**
 * Created by t_mehes on 3/7/17.
 */

import React from 'react';
import ProgressBar from './index.js';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';


describe('Progressbar', () => {

  let progressBarComponent = null;

  beforeAll(() => {
    progressBarComponent = renderer.create((<ProgressBar/>))
  });

  it('component render', () => {
    let tree = progressBarComponent.toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('component render', () => {

    let testProgressBars = []
      , testData = [
        {value: 4, max: 30},
        {value: 0, max: 1},
      ]
    ;

    beforeAll(() => {
      testData.forEach((test, i) => {
        testProgressBars[i] = shallow(<ProgressBar value={test.value} max={test.max}/>);
      });
    });

    it('with props', () => {
      testData.forEach((test, i) => {

        const testProgressBar = testProgressBars[i]
          , progressText = `${test.value}/${test.max}` // 20/100
          , progressLineStyleTransform = `translateX(-${(test.max - test.value) * 100 / test.max}%)` // translateX(-80%)
        ;

        it('should render the text correctly', () => {
          const progressTextEl = testProgressBar.find('.bar-text');
          expect(progressTextEl.text()).toBe(progressText);
        });

        it('should render the the bar with correct value', () => {
          const lineSvg = testProgressBar.find('.path')
          ;
          const lineStyle = lineSvg.node.props.style;
          console.log(lineStyle.transform);
          expect(lineStyle).not.toBe(undefined);
          expect(lineStyle.transform)
            .toBe(progressLineStyleTransform);
        });
      })
    });

  })

});

