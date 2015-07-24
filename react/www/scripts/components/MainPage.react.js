/*global
 require,
 module
 */

(function() {
    "use strict";

    var React = require('../../thirdParty/react');
    var MaterialAppBar = require('./MaterialAppBar.react');
    var MaterialInput = require('./MaterialInput.react');

    var MainPage = React.createClass({
        render: function() {
            return <div className="app">
                <MaterialAppBar title="bmicalc-react" />
                <div className="pageContent">
                    <MaterialInput label="Weight (lbs)" inputType="number"/>
                    <MaterialInput label="Height (ft)" inputType="number"/>
                    <MaterialInput label="Height (in)" inputType="number"/>

                    <div id="bmi-results-div">
                        <h2>Current BMI: <span id="bmi-current-bmi"></span></h2>
                        <table data-role="table" data-mode="reflow" id="bmi-results-table" class="ui-responsive table-stripe">
                            <thead>
                            <tr>
                                <th scope='col'>Classification</th>
                                <th scope='col'>Min Weight</th>
                                <th scope='col'>Max Weight</th>
                                <th scope='col'>Need To Lose</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr id="bmi-super-obese">
                                <th scope='row'>Super Obese</th>
                                <td class='bmi-min-weight'></td>
                                <td class='bmi-max-weight'></td>
                                <td class='bmi-need-to-lose'></td>
                            </tr>
                            <tr id="bmi-morbidly-obese">
                                <th scope='row'>Morbidly Obese</th>
                                <td class='bmi-min-weight'></td>
                                <td class='bmi-max-weight'></td>
                                <td class='bmi-need-to-lose'></td>
                            </tr>
                            <tr id="bmi-severly-obese">
                                <th scope='row'>Severely Obese</th>
                                <td class='bmi-min-weight'></td>
                                <td class='bmi-max-weight'></td>
                                <td class='bmi-need-to-lose'></td>
                            </tr>
                            <tr id="bmi-obese">
                                <th scope='row'>Obese</th>
                                <td class='bmi-min-weight'></td>
                                <td class='bmi-max-weight'></td>
                                <td class='bmi-need-to-lose'></td>
                            </tr>
                            <tr id="bmi-overweight">
                                <th scope='row'>Overweight</th>
                                <td class='bmi-min-weight'></td>
                                <td class='bmi-max-weight'></td>
                                <td class='bmi-need-to-lose'></td>
                            </tr>
                            <tr id="bmi-normal">
                                <th scope='row'>Normal</th>
                                <td class='bmi-min-weight'></td>
                                <td class='bmi-max-weight'></td>
                                <td class='bmi-need-to-lose'></td>
                            </tr>
                            <tr id="bmi-underweight">
                                <th scope='row'>Underweight</th>
                                <td class='bmi-min-weight'></td>
                                <td class='bmi-max-weight'></td>
                                <td class='bmi-need-to-lose'></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <div id="bmi-projection-div"></div>
                </div>
            </div>;
        }
    });

    module.exports = MainPage;
})();
