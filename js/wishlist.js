function getList(data) {
	var list = JSON.parse(data.current);

	$.each(list.items, function(key, value) {
		$('#wishlist > ul').append("<li><div class='liContainer'><div class='item'>" + list.items[key].itemName 
			+ "</div><div class='where'>" + list.items[key].where 
			+ "</div><div class='description'>" + list.items[key].description 
			+ "</div><div class='price'>" + list.items[key].price 
			+ "</div></div></li>");
	});
}

$(document).ready(function() {
	$.ajax({
		type: 'POST',
		url: '../php/update.php',
		datatype: 'json',
		data: {type: 'read'},
		success: function(data) {
			var parsedData = JSON.parse(data);
			getList(parsedData);
		}
	});
});