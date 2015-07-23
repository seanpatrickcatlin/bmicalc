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
        var currentWeight = parseFloat($('#bmi-weight-tc').val());

        var currentHeightFeetValue = parseInt($('#bmi-height-ft-tc').val(), 10);
        var currentHeightInchesValue = parseFloat($('#bmi-height-in-tc').val());

        var currentHeightTotalInches = (currentHeightFeetValue * 12) + currentHeightInchesValue;

        var currentBmi = roundWithDecimal(((currentWeight /
            (currentHeightTotalInches * currentHeightTotalInches)) * 703), 3);

        $('#bmi-results-div').show();

        var bmiDescription = 'unknown';

        if (currentBmi > 50) {
            bmiDescription = 'Super Obese';
        } else if (currentBmi > 40) {
            bmiDescription = 'Morbidly Obese';
        } else if (currentBmi > 35) {
            bmiDescription = 'Severely Obese';
        } else if (currentBmi > 30) {
            bmiDescription = 'Obese';
        } else if (currentBmi > 25) {
            bmiDescription = 'Overweight';
        } else if (currentBmi > 18.49) {
            bmiDescription = 'Normal';
        } else {
            bmiDescription = 'Underweight';
        }

        $('#bmi-current-bmi').html(currentBmi + ' (' + bmiDescription + ')');

        var superObeseNode = $('#bmi-super-obese');
        if (currentBmi > 50) {
            superObeseNode.show();
            superObeseNode.find('.bmi-min-weight').html(getWeightForBmi(50, currentHeightTotalInches));
            superObeseNode.find('.bmi-max-weight').html('');
            superObeseNode.find('.bmi-need-to-lose').html('');
        } else {
            superObeseNode.hide();
        }

        var needToLoseVal = "";

        var morbidlyObeseNode = $('#bmi-morbidly-obese');
        if (currentBmi > 40) {
            morbidlyObeseNode.show();
            morbidlyObeseNode.find('.bmi-min-weight').html(getWeightForBmi(40, currentHeightTotalInches));
            morbidlyObeseNode.find('.bmi-max-weight').html(getWeightForBmi(49.99, currentHeightTotalInches));
            if (currentBmi >= 50) {
                needToLoseVal = roundWithDecimal(currentWeight - getWeightForBmi(49.99, currentHeightTotalInches), 2);
            } else {
                needToLoseVal = '';
            }
            morbidlyObeseNode.find('.bmi-need-to-lose').html(needToLoseVal);
        } else {
            morbidlyObeseNode.hide();
        }

        var severlyObeseNode = $('#bmi-severly-obese');
        if (currentBmi > 35) {
            severlyObeseNode.show();
            severlyObeseNode.find('.bmi-min-weight').html(getWeightForBmi(35, currentHeightTotalInches));
            severlyObeseNode.find('.bmi-max-weight').html(getWeightForBmi(39.99, currentHeightTotalInches));
            if (currentBmi >= 40) {
                needToLoseVal = roundWithDecimal(currentWeight - getWeightForBmi(39.99, currentHeightTotalInches), 2);
            } else {
                needToLoseVal = '';
            }
            severlyObeseNode.find('.bmi-need-to-lose').html(needToLoseVal);
        } else {
            severlyObeseNode.hide();
        }

        var obeseNode = $('#bmi-obese');
        if (currentBmi > 30) {
            obeseNode.show();
            obeseNode.find('.bmi-min-weight').html(getWeightForBmi(30, currentHeightTotalInches));
            obeseNode.find('.bmi-max-weight').html(getWeightForBmi(34.99, currentHeightTotalInches));
            if (currentBmi >= 35) {
                needToLoseVal = roundWithDecimal(currentWeight - getWeightForBmi(34.99, currentHeightTotalInches), 2);
            } else {
                needToLoseVal = '';
            }
            obeseNode.find('.bmi-need-to-lose').html(needToLoseVal);
        } else {
            obeseNode.hide();
        }

        var overweightNode = $('#bmi-overweight');
        if (currentBmi > 25) {
            overweightNode.show();
            overweightNode.find('.bmi-min-weight').html(getWeightForBmi(25, currentHeightTotalInches));
            overweightNode.find('.bmi-max-weight').html(getWeightForBmi(29.99, currentHeightTotalInches));
            if (currentBmi >= 30) {
                needToLoseVal = roundWithDecimal(currentWeight - getWeightForBmi(29.99, currentHeightTotalInches), 2);
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
        normalNode.find('.bmi-min-weight').html(getWeightForBmi(18.5, currentHeightTotalInches));
        normalNode.find('.bmi-max-weight').html(getWeightForBmi(24.99, currentHeightTotalInches));
        if (currentBmi >= 25) {
            needToLoseVal = roundWithDecimal(currentWeight - getWeightForBmi(24.99, currentHeightTotalInches), 2);
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
         $('#bmi-underweight').find('.bmi-max-weight').html(getWeightForBmi(18.49, currentHeightTotalInches));
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
