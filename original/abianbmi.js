function abianBmiRound(input, places) {
    return +(Math.round(input + "e+" + places)  + "e-" + places);
}

function abianBmiGetWeightForBmi(targetBmi, heightInInches) {
    return abianBmiRound(((heightInInches*heightInInches*targetBmi)/703), 2);
}

$(document).ready(function () {
    $('#abmi-results-div').hide();

    $(document.body).on('click', '#abmi-calc-btn', function (event) {
        var curWeight = parseFloat($('#abmi-weight-tc').val(), 10);

        var curHeightFt = parseInt($('#abmi-height-ft-tc').val(), 10);
        var curHeightIn = parseFloat($('#abmi-height-in-tc').val(), 10);

        var curHeight = (curHeightFt*12)+curHeightIn;

        var curBmi = abianBmiRound(((curWeight/(curHeight*curHeight)) * 703), 3);

        var needToLoseVal = '';

        $('#abmi-results-div').show();
        
        if(curBmi > 50) {
            $('#abmi-current-bmi').html(curBmi + " (Super Obese)");
        } else if(curBmi > 40) {
            $('#abmi-current-bmi').html(curBmi + " (Morbidly Obese)");
        } else if(curBmi > 35) {
            $('#abmi-current-bmi').html(curBmi + " (Severely Obese)");
        } else if(curBmi > 30) {
            $('#abmi-current-bmi').html(curBmi + " (Obese)");
        } else if(curBmi > 25) {
            $('#abmi-current-bmi').html(curBmi + " (Overweight)");
        } else if(curBmi > 18.49) {
            $('#abmi-current-bmi').html(curBmi + " (Normal)");
        } else {
            $('#abmi-current-bmi').html(curBmi + " (Underweight)");
        }

        if(curBmi > 50) {
            $('#abmi-super-obese').show();
            $('#abmi-super-obese').find('.abmi-min-weight').html(abianBmiGetWeightForBmi(50, curHeight));
            $('#abmi-super-obese').find('.abmi-max-weight').html('');
            $('#abmi-super-obese').find('.abmi-need-to-lose').html('');            
        } else {
            $('#abmi-super-obese').hide();
        }

        if(curBmi > 40) {
            $('#abmi-morbidly-obese').show();
            $('#abmi-morbidly-obese').find('.abmi-min-weight').html(abianBmiGetWeightForBmi(40, curHeight));
            $('#abmi-morbidly-obese').find('.abmi-max-weight').html(abianBmiGetWeightForBmi(49.99, curHeight));
            if(curBmi >= 50) {
                needToLoseVal = abianBmiRound(curWeight - abianBmiGetWeightForBmi(49.99, curHeight), 2);
            } else {
                needToLoseVal = '';
            }
            $('#abmi-morbidly-obese').find('.abmi-need-to-lose').html(needToLoseVal);
        } else {
            $('#abmi-morbidly-obese').hide();
        }

        if(curBmi > 35) {
            $('#abmi-severly-obese').show();
            $('#abmi-severly-obese').find('.abmi-min-weight').html(abianBmiGetWeightForBmi(35, curHeight));
            $('#abmi-severly-obese').find('.abmi-max-weight').html(abianBmiGetWeightForBmi(39.99, curHeight));
            if(curBmi >= 40) {
                needToLoseVal = abianBmiRound(curWeight - abianBmiGetWeightForBmi(39.99, curHeight), 2);
            } else {
                needToLoseVal = '';
            }
            $('#abmi-severly-obese').find('.abmi-need-to-lose').html(needToLoseVal);
        } else {
            $('#abmi-severly-obese').hide();
        }

        if(curBmi > 30) {
            $('#abmi-obese').show();
            $('#abmi-obese').find('.abmi-min-weight').html(abianBmiGetWeightForBmi(30, curHeight));
            $('#abmi-obese').find('.abmi-max-weight').html(abianBmiGetWeightForBmi(34.99, curHeight));
            if(curBmi >= 35) {
                needToLoseVal = abianBmiRound(curWeight - abianBmiGetWeightForBmi(34.99, curHeight), 2);
            } else {
                needToLoseVal = '';
            }
            $('#abmi-obese').find('.abmi-need-to-lose').html(needToLoseVal);
        } else {
            $('#abmi-obese').hide();
        }

        if(curBmi > 25) {
            $('#abmi-overweight').show();
            $('#abmi-overweight').find('.abmi-min-weight').html(abianBmiGetWeightForBmi(25, curHeight));
            $('#abmi-overweight').find('.abmi-max-weight').html(abianBmiGetWeightForBmi(29.99, curHeight));
            if(curBmi >= 30) {
                needToLoseVal = abianBmiRound(curWeight - abianBmiGetWeightForBmi(29.99, curHeight), 2);                
            } else {
                needToLoseVal = '';
            }
            $('#abmi-overweight').find('.abmi-need-to-lose').html(needToLoseVal);
            $('#abmi-projection-div').show();
        } else {
            $('#abmi-overweight').hide();
            $('#abmi-projection-div').hide();
        }

        $('#abmi-normal').show();
        $('#abmi-normal').find('.abmi-min-weight').html(abianBmiGetWeightForBmi(18.5, curHeight));
        $('#abmi-normal').find('.abmi-max-weight').html(abianBmiGetWeightForBmi(24.99, curHeight));
        if(curBmi >= 25) {
            needToLoseVal = abianBmiRound(curWeight - abianBmiGetWeightForBmi(24.99, curHeight), 2);
            var projDate = new Date();
            projDate = new Date(projDate.getTime() + (needToLoseVal/2)*7*24*60*60*1000);
            $('#abmi-projection-div').html("If you lost 2 pounds a week you would be at a normal BMI in " + (needToLoseVal/2) + " weeks.  [" + projDate.toDateString() + "]");
        } else {
            needToLoseVal = '';
        }
        $('#abmi-normal').find('.abmi-need-to-lose').html(needToLoseVal);

/*
        $('#abmi-underweight').show();
        $('#abmi-underweight').find('.abmi-min-weight').html('-');
        $('#abmi-underweight').find('.abmi-max-weight').html(abianBmiGetWeightForBmi(18.49, curHeight));
        $('#abmi-underweight').find('.abmi-need-to-lose').html('-');
*/
        $('#abmi-underweight').hide();

        $('#abmi-results-table').table("refresh");
    });
});