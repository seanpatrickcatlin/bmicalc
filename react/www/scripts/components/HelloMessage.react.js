/*global
 require,
 module
 */

(function() {
    "use strict";

    var React = require('../../thirdParty/react');

    var HelloMessage = React.createClass({
        render: function() {
            return <div>Hello!  TODO: Implement more stuff!!!</div>;
        }
    });

    module.exports = HelloMessage;
})();
