import Vue from 'vue'
import moment from 'moment';

Vue.filter('moment', function (value, formatString) {
  formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
  if(!value) return '';
  return moment(value).format(formatString);
});

export default {}
