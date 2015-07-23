/*global
 require,
 module
 */

(function () {
    "use strict";

    var React = require('../../thirdParty/react');
    var MainPage = require('./MainPage.react');

    var BmiCalcReactApp = React.createClass({
        render: function() {
            return <MainPage />;
        }
    });

    module.exports = BmiCalcReactApp;
})();
