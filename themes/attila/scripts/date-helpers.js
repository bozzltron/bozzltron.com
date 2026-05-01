'use strict';

/**
 * Readable absolute dates plus moment "fromNow" for static generates.
 */
const moment = require('moment');

hexo.extend.helper.register('readable_date', (dateVal, format) => {
  if (!dateVal) return '';
  return moment(dateVal).format(format || 'MMMM D, YYYY');
});

hexo.extend.helper.register('time_ago', (dateVal) => {
  if (!dateVal) return '';
  return moment(dateVal).fromNow();
});
