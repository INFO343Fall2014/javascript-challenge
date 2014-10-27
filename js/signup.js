"use strict";
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

