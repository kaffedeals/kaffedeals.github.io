$(function() {

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();

            var m = new mandrill.Mandrill('bSzECez1dCpbl6OZWFVKHw');

            name = "kaffedeals"
            phone = "kaffedeals"
            message = "kaffedeals"

            var params = {
              "message": {
                "from_email": email,
                "from_name": name,
                "to": [{
                  "email":"patorn.u@gmail.com",
                  "name": "Patorn"
                }],
                "subject": "kaffedeals.com Contact Form - Mandrill API:" + email,
                "html": email + "interested in kaffedeals"
              }
            };



            m.messages.send(params, function(res) {
              // Success message
              $form.find('.success').html("Thank you for registration. You will get notified once we launch the deals");

              //clear all fields
              $('.form-register').trigger("reset");
            }, function(err) {
              // Fail message
              $('#success').html("<div class='alert alert-danger'>");
              $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                  .append("</button>");
              $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
              $('#success > .alert-danger').append('</div>');
              //clear all fields
              $('.form-register').trigger("reset");
            });
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});
