/*global
 require,
 module
 */

(function() {
    "use strict";

    var React = require('../../thirdParty/react');
    var MaterialAppBar = require('./MaterialAppBar.react');
    var HelloMessage = require('./HelloMessage.react');

    var MainPage = React.createClass({
        render: function() {
            return <div className="app">
                <MaterialAppBar title="bmicalc-react" />
                <div className="pageContent">
                    <HelloMessage />
                </div>
            </div>;
        }
    });

    module.exports = MainPage;
})();
