/*global
 $
*/

(function () {
    'use strict';

    /**
     * This is a slightly modified example of rounding input to a given number of decimal places.
     * The original example came from MDN, but it is no longer available there.
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
     * @param {number} input - The number to round.
     * @param {number} places - The number of decimal places to include.
     * @returns {number} The rounded number.
     */
    var roundWithDecimal = function (input, places) {
        return +(Math.round(input + 'e+' + places) + 'e-' + places);
    };

    /**
     * Helper function to get a weight for a specified BMI level.
     * @param {number} targetBmi - The BMI that you would like to query.
     * @param {number} heightInInches - The height of the query in inches.
     * @returns {number} The weight for the given BMI.
     */
    var getWeightForBmi = function (targetBmi, heightInInches) {
        return roundWithDecimal(((heightInInches * heightInInches * targetBmi) / 703), 2);
    };

    /**
     * Handle jQuery Mobile tap events on the calculate button.
     */
    var onCalculateButtonTap = function () {
        var curWeight = parseFloat($('#bmi-weight-tc').val());

        var curHeightFt = parseInt($('#bmi-height-ft-tc').val(), 10);
        var curHeightIn = parseFloat($('#bmi-height-in-tc').val());

        var curHeight = (curHeightFt * 12) + curHeightIn;

        var curBmi = roundWithDecimal(((curWeight / (curHeight * curHeight)) * 703), 3);

        var needToLoseVal = '';

        $('#bmi-results-div').show();

        if (curBmi > 50) {
            $('#bmi-current-bmi').html(curBmi + ' (Super Obese)');
        } else if (curBmi > 40) {
            $('#bmi-current-bmi').html(curBmi + ' (Morbidly Obese)');
        } else if (curBmi > 35) {
            $('#bmi-current-bmi').html(curBmi + ' (Severely Obese)');
        } else if (curBmi > 30) {
            $('#bmi-current-bmi').html(curBmi + ' (Obese)');
        } else if (curBmi > 25) {
            $('#bmi-current-bmi').html(curBmi + ' (Overweight)');
        } else if (curBmi > 18.49) {
            $('#bmi-current-bmi').html(curBmi + ' (Normal)');
        } else {
            $('#bmi-current-bmi').html(curBmi + ' (Underweight)');
        }

        var superObeseNode = $('#bmi-super-obese');
        if (curBmi > 50) {
            superObeseNode.show();
            superObeseNode.find('.bmi-min-weight').html(getWeightForBmi(50, curHeight));
            superObeseNode.find('.bmi-max-weight').html('');
            superObeseNode.find('.bmi-need-to-lose').html('');
        } else {
            superObeseNode.hide();
        }

        var morbidlyObeseNode = $('#bmi-morbidly-obese');
        if (curBmi > 40) {
            morbidlyObeseNode.show();
            morbidlyObeseNode.find('.bmi-min-weight').html(getWeightForBmi(40, curHeight));
            morbidlyObeseNode.find('.bmi-max-weight').html(getWeightForBmi(49.99, curHeight));
            if (curBmi >= 50) {
                needToLoseVal = roundWithDecimal(curWeight - getWeightForBmi(49.99, curHeight), 2);
            } else {
                needToLoseVal = '';
            }
            morbidlyObeseNode.find('.bmi-need-to-lose').html(needToLoseVal);
        } else {
            morbidlyObeseNode.hide();
        }

        var severlyObeseNode = $('#bmi-severly-obese');
        if (curBmi > 35) {
            severlyObeseNode.show();
            severlyObeseNode.find('.bmi-min-weight').html(getWeightForBmi(35, curHeight));
            severlyObeseNode.find('.bmi-max-weight').html(getWeightForBmi(39.99, curHeight));
            if (curBmi >= 40) {
                needToLoseVal = roundWithDecimal(curWeight - getWeightForBmi(39.99, curHeight), 2);
            } else {
                needToLoseVal = '';
            }
            severlyObeseNode.find('.bmi-need-to-lose').html(needToLoseVal);
        } else {
            severlyObeseNode.hide();
        }

        var obeseNode = $('#bmi-obese');

        if (curBmi > 30) {
            obeseNode.show();
            obeseNode.find('.bmi-min-weight').html(getWeightForBmi(30, curHeight));
            obeseNode.find('.bmi-max-weight').html(getWeightForBmi(34.99, curHeight));
            if (curBmi >= 35) {
                needToLoseVal = roundWithDecimal(curWeight - getWeightForBmi(34.99, curHeight), 2);
            } else {
                needToLoseVal = '';
            }
            obeseNode.find('.bmi-need-to-lose').html(needToLoseVal);
        } else {
            obeseNode.hide();
        }

        var overweightNode = $('#bmi-overweight');
        if (curBmi > 25) {
            overweightNode.show();
            overweightNode.find('.bmi-min-weight').html(getWeightForBmi(25, curHeight));
            overweightNode.find('.bmi-max-weight').html(getWeightForBmi(29.99, curHeight));
            if (curBmi >= 30) {
                needToLoseVal = roundWithDecimal(curWeight - getWeightForBmi(29.99, curHeight), 2);
            } else {
                needToLoseVal = '';
            }
            overweightNode.find('.bmi-need-to-lose').html(needToLoseVal);
            $('#bmi-projection-div').show();
        } else {
            overweightNode.hide();
            $('#bmi-projection-div').hide();
        }

        var normalNode = $('#bmi-normal');
        normalNode.show();
        normalNode.find('.bmi-min-weight').html(getWeightForBmi(18.5, curHeight));
        normalNode.find('.bmi-max-weight').html(getWeightForBmi(24.99, curHeight));
        if (curBmi >= 25) {
            needToLoseVal = roundWithDecimal(curWeight - getWeightForBmi(24.99, curHeight), 2);
            var projDate = new Date();
            projDate = new Date(projDate.getTime() + (needToLoseVal / 2) * 7 * 24 * 60 * 60 * 1000);
            $('#bmi-projection-div').html('If you lost 2 pounds a week you would be at a normal BMI in ' +
                (needToLoseVal / 2) + ' weeks.  [' + projDate.toDateString() + ']');
        } else {
            needToLoseVal = '';
        }
        normalNode.find('.bmi-need-to-lose').html(needToLoseVal);

        /*
         $('#bmi-underweight').show();
         $('#bmi-underweight').find('.bmi-min-weight').html('-');
         $('#bmi-underweight').find('.bmi-max-weight').html(getWeightForBmi(18.49, curHeight));
         $('#bmi-underweight').find('.bmi-need-to-lose').html('-');
         */
        $('#bmi-underweight').hide();

        $('#bmi-results-table').table('refresh');
    };

    $(document).ready(function () {
        $('#bmi-results-div').hide();
        $('#bmi-calc-btn').on('tap', onCalculateButtonTap);
    });
})();
