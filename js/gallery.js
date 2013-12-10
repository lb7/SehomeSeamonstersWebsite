$(document).ready(function() {
	console.log("executing");
	var imgUrls;
	$.ajax({
		url: './js/gallery.json',
		dataType: 'json',
		success: function(data, textStatus, jqXHR) {
			console.log(textStatus);
			imgUrls = data;
			$.each(imgUrls, function(key, value) {
				//Use this way to access image url: 		console.log(imgUrls[key].url);

				$('#carousel').append('<li><img src="' + imgUrls[key].url + '"></li>');
			});
			$("#carousel").carouFredSel({
				items: 2,
				scroll: 1,
				next: {
					button: $('#rightArrow'),
					key: 'right'
				},
				prev: {
					button: $('#leftArrow'),
					key: 'left'
				},
				cookie: true
			});
		}
	});
	//if($.browser.msie) alert('webkit');
});
