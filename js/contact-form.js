const emailRegex = /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,6}$/i;
const exceptionErrorMessage = "Something when wrong, please try late or contact me on my phone number";
try {
    $("#loading-image").hide();
    $("#contact-form-error").hide();
    $("#contact-form-success").hide();
    // Fire when form is submitted
    $("#contact-form").submit(function(e) {
        e.preventDefault();
        // Extract input values
        $("#loading-image").show();
        const name =  $("#name").val();
        const email =  $("#email").val();
        const message =  $("#message").val();
        // Validation check
        const validName = name.length > 0;
        const validMessage = message.length > 0;
        const validEmail = emailRegex.test(email);
        // Proceed
        if(validEmail && validMessage && validName) {
            // Send mail request to API if form data are correct
            $.ajax({
                url: "https://mail.dmsemergence.com/public/api/send_mail",
                method: "POST",
                data: {
                    to : 'gpetitalex@gmail.com',
                    subject: 'Online resume message',
                    from: email,
                    text: message,
                    html: "message",
                }
            }).then(function() {
                $("#loading-image").hide();
                $("#contact-form-error").hide();
                $("#contact-form-success").show();
            }).catch(function() {
                $("#loading-image").hide();
                $("#contact-form-error").show();
                $("#contact-form-success").hide();
                $("#contact-form-error").html(exceptionErrorMessage)
            });
        } else {
            // Extract error messages
            let errorMassage = "";
            if(!validName) errorMassage += "Please provide your name <br /> ";
            if(!validEmail) errorMassage += "Please provide a valid email address <br /> ";
            if(!validMessage) errorMassage += "Please provide a message";
            // Display error
            $("#loading-image").hide();
            $("#contact-form-error").show();
            $("#contact-form-success").hide();
            $("#contact-form-error").html(errorMassage)
        }
    })
} catch (e) {
    $("#loading-image").hide();
    $("#contact-form-error").show();
    $("#contact-form-success").hide();
    $("#contact-form-error").html(exceptionErrorMessage)
}
