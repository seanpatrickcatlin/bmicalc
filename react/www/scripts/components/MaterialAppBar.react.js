/*global
 require,
 module
 */

(function() {
    "use strict";

    var React = require('../../thirdParty/react');

    var MaterialAppBar = React.createClass({
        render: function() {
            var classNameList = 'materialAppBar';

            var titleText = '';

            if(this.props.title && (this.props.title.length > 0)) {
                titleText = this.props.title;
            }

            return <div className={classNameList}>
                <span className="materialAppBarTitle">{titleText}</span>
            </div>;
        }
    });

    module.exports = MaterialAppBar;
})();
