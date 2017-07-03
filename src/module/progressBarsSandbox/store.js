/**
 * Created by rihdus on 17/6/17.
 */

import axios from 'axios';

const config = {
  url: "https://pb-api.herokuapp.com/bars"
};

export default {
  config: config,
  data: {},
  init: () => {
  },
  read: () => {
    let _this = this;
    return axios.get(config.url)
      .then((resp) => {
        _this.data = resp.data;
        return {
          data: _this.data
        };
      })
  }
}
