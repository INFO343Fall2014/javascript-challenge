//The purpose of "use strict" is to indicate that the code should be executed in "strict mode".

With strict mode, you cannot, for example, use undeclared variables.
"use strict";

/* function onReady()
This function create a dropdown menu for all the States in US. */
function onReady() {
    var signup = document.getElementById('signup');
    var state = signup.elements['state'];
    var idx;
    var option;
    var statename;
    for (idx = 0; idx < usStates.length; idx++) {
        option = document.createElement('option');
        statename = usStates[idx];
        option.value = statename.code;
        option.innerHTML = statename.name;
        state.appendChild(option);
    }
    signup.addEventListener('submit', onSubmit);
} //onReady()

document.addEventListener('DOMContentLoaded', onReady);

//Dom is loaded and ready to be manipulated. The if statement to check the occupation of other. If id is occupationOther, else for id that is not occupationOther.
function show() {
    document.addEventListener('change', function() {
        if (document.getElementById('occupation').value	== 'other') {
            document.getElementById('occupationOther').style.display = 'block';
        } else {
            document.getElementById('occupationOther').style.display = 'none';
        }
    });
}
document.addEventListener('DOMContentLoaded', show);

/*The DOM is loaded and ready to be manipulated. function click for no thank, that navigate the user to leave the website.
Winddow should pop up asking for confirm from user. */
function click () {
    var cancelButton = document.getElementById('cancelButton');
    cancelButton.addEventListener('click', function() {
        if (window.confirm('Please out yo!!')) {
            window.location = "http://www.hasbro.com/mylittlepony/en_US/";
        }
    });
}
document.addEventListener('DOMContentLoaded', click);

/* This function is called when user submit the sign up form. */
function onSubmit(evt) {
    var valid = validateForm(this);
    if (!valid) {
        var errMsg = document.getElementById('error-message');
        errMsg.innerHTML = 'Please provide values for the required fields!';
        errMsg.style.display = 'block';
    }
    if (!valid && evt.preventDefault) {
        evt.preventDefault();
    }
    evt.returnValue = valid;
    return valid;
} 

function validateForm(form) {
    var requiredFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate'];
    var idx;
    var valid = true;
    for (idx = 0; idx < requiredFields.length; idx++) {
        valid &= validateRequiredField(form.elements[requiredFields[idx]]);
    }
    if (document.getElementById('occupation').value	== 'other') {
        var otherOccuptationInput = document.getElementById('occupationOther').value;
        if (otherOccuptationInput.trim().length > 0) {
            document.getElementById('occupationOther').className = 'form-control';
        } else {
            document.getElementById('occupationOther').className = 'form-control invalid-field';
            valid = false;
        }
    }
    return valid;
} 

/* The function checks if the required field by looking at its value, which is zip code. If the value is empty
or doesn't match a specific required field's requirements, then it will return false in this case. */

function validateRequiredField(field) {
    var value = field.value;
    value = value.trim();
    var valid = value.length > 0;
    if (valid) {
        if (field.name == 'zip') {
            var zipRegExp = new RegExp('^\\d{5}$');
            var zipValid = zipRegExp.test(field.value);
            if (!zipValid) {
                field.className = 'form-control invalid-field'
                return !valid;
            }
        }
/* This function checks if the required field by looking at its value, which is birthdate. If the value if empty
or doesn't match a specific required field's requirements, then it will return false. */
        if (field.name == 'birthdate') {
            var today = new Date();
            var birthdate = new Date(field.value);
            var yearsDiff = today.getFullYear() - birthdate.getUTCFullYear();
            var monthsDiff = today.getMonth() - birthdate.getUTCMonth();
            var daysDiff = today.getDate() - birthdate.getUTCDate();
            if (monthsDiff < 0 || (0 == monthsDiff && daysDiff < 0)) {
                yearsDiff--;
            }
            if (yearsDiff < 13) {
                field.className = 'form-control invalid-field';
                var birthdateMessage = document.getElementById('birthdateMessage');
                birthdateMessage.innerHTML = 'Must be 13 years old to signup.';
                return !valid;
            }
        }
        field.className = 'form-control';
    }
    else {
        field.className = 'form-control invalid-field';
    }
    return valid;
}