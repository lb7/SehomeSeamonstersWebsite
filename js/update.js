var currentForm, isModified = false;

function getList(data) {
	var list = JSON.parse(data.current);

	$.each(list.items, function(key, value) {
		$('#wishlist > ul').append("<li><input class='checkbox' type='checkbox'><div class='liContainer'><div class='item'>" + list.items[key].itemName 
			+ "</div><div class='where'>" + list.items[key].where 
			+ "</div><div class='description'>" + list.items[key].description 
			+ "</div><div class='price'>" + list.items[key].price 
			+ "</div></div></li>");
	});
}

function getChecked() {
	var checked = new Array();
	$.each($('input:checked').siblings('.liContainer').children('.item'), function(key, value) {
		checked.push($(this));
	});

	return checked;
}

function delItems(currItemArr, checkedItems) {
	//First section deletes the selected elements in the HTML
	$.each(checkedItems, function(key, value) {
		value.parent().parent().remove();
	});

	//Now deletes the selected items in currentForm
	$.each(checkedItems, function(key, value) {
		itemName = value.html();

		$.each(currItemArr, function(key, value) {
			if(value.itemName === itemName) {
				currItemArr.splice(key, 1);
				return false;
			}
		});
	});

}

$(document).ready(function() {	//updates the list locally, can be submitted to server after
	$(document).on('click', '#submit', function() {
		currentForm.items.push({
			itemName: $('#itemName').val(), 
			price: $('#price').val(),
			where: $('#where').val(),
			description: $('#description').val()
		});
		console.log(currentForm);
		
		$('#wishlist > ul').append("<li><input class='checkbox' type='checkbox'><div class='liContainer'><div class='item'>" + $('#itemName').val() + "</div><div class='where'>" + $('#where').val() + "</div><div class='description'>" + $('#description').val() + "</div><div class='price'>" + $('#price').val() + "</div></div></li>");

		$('#itemName').val('');
		$('#price').val('');
		$('#where').val('');
		$('#description').val('');

		isModified = true;
	});
});

$(document).ready(function() { 		//submits the data to the server. for password and updating the form.
	$('#updateForm').submit(function(event) {
		event.preventDefault();

		$.ajax({
			type: 'POST',
			url: '../php/update.php',
			datatype: 'json',
			data: (function () {
				switch($('#selector').val()) {
					case 'password':
						return $('#updateForm').serialize();
						break;
					case 'wishlist':
						return {type: 'wishlist', current: JSON.stringify(currentForm)};
						break;
				}
			})(),
			success: function(data) {
				//console.log(data);
				var parsedData = JSON.parse(data);
				
				switch(parsedData.type) {
					case 'password':
						if(parsedData.form === 'false') {
							console.log('incorrect');
						} else {
							currentForm = JSON.parse(parsedData.current); //stores the form as it came from the server
							$('#updateForm').html(parsedData.form);
							getList(parsedData);
							$('#headerContainer').css('display', 'block');
						}
						break;
				}
				isModified = false;
				$('#statusText').html('');
			}
		});
		$('#statusText').html('Processing...');

		$('#itemName').val('');
		$('#price').val('');
	});
});

$(document).ready(function() { 				//deletes all checked elements from html and list
	$(document).on('click', '#del', function() {
		checked = getChecked();
		delItems(currentForm.items, checked);
		
		isModified = true;
	});
});

$(window).on('beforeunload', function() {
	if(isModified) {
		return 'You have made changes to the wishlist. If you leave now all unsave changes will be lost.';
	}
});