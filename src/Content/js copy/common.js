
$(document).ready(function () {
    $("#buttonlogoutHeader").click(function (e) {
        e.preventDefault();
        logout(this);

    });

    $("#buttonlogoutSideout").click(function (e) {

        e.preventDefault();
        logout(this);

    });
});


function logout(urlparameter) {
    $.ajax({

        url: 'Session/ClearSession',

        success: function () {
            completeIgnore = true;
            window.location.href = $(urlparameter).attr('name');
        }
    });
}
