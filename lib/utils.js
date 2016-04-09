/**
 * Created by alykoshin on 09.04.16.
 */

'use strict';


var sanitizeCb = function(cb) {
  return typeof cb === 'function' ? cb : function() {};
};


module.exports = {
  sanitizeCb: sanitizeCb,
};
