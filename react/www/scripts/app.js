/*global
 require
 */

(function () {
    "use strict";

    var React = require('../thirdParty/react');
    var BmiCalcReactApp = require('./components/bmiCalcReactApp.react');

    React.render(<BmiCalcReactApp />, document.getElementById('BmiCalcReactApp'));
})();
