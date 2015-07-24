/*global
 require,
 module
 */

(function() {
    "use strict";

    var React = require('../../thirdParty/react');

    var MaterialInput = React.createClass({
        render: function() {
            var inputType = "text";

            if(this.props.inputType !== undefined) {
                inputType = this.props.inputType;
            }

            var placeHolder = "";

            if(this.props.placeHolder !== undefined) {
                placeHolder = this.props.placeHolder;
            }

            var value = "";

            if(this.props.value !== undefined) {
                value = this.props.value;
            }

            var label = "";

            if(this.props.label !== undefined) {
                label = this.props.label;
            }

            return (
                <div className="materialInput">
                    <span className="label">{label}</span>
                    <input type={inputType} /*placeholder={placeHolder} value={value}*//>
                </div>
            );
        }
    });

    module.exports = MaterialInput;
})();
