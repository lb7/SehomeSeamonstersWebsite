function validate(inputs) {
	var flag = true; //the actual value to be returned by validate()
	$('#result').text('');
	$.each(inputs, function(key, value) {
		if($(value).val() === "") { //check that all fields have content
			$('#result').text('All fields are required!');
			flag = false;
			return false; //breaks out of the $.each()
		}
	});
	if(flag) { //checks the flag set above for actual return value
		return true;
	} else {
		return false;
	}
}

$(document).ready(function() {
	var inputs = ['#name', '#replyto', '#subject', '#message'];
	$('#form').submit(function(event) {
		event.preventDefault();
		
		if(validate(inputs)) {
			$.ajax({
				type: "POST",
				url: "php/mail.php",
				data: $('#form').serialize(),
				success: function(data) {
					$('#result').text(data);
				},
				error: function (jqXHR, status, error) {
					$('result').text('The request could not be completed for some reason. Please try again soon.')
				}
			});
			$('#result').text('Processing...'); //gets replaced once the request has finished
		}
	});
});