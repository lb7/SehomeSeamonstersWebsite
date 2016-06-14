<?php
	/*
		<label for='itemName'>Item Name: </label><input name='itemName' id='itemName' type='text'><br>
		<label for='price'>Price: </label><input name='price' id='price' type='text'><br>
		<input name='type' type='hidden' value='submission'>
		<input id='submit' type='submit' value='Submit'>
	*/

	$post = $_POST;
	$type = $post['type'];
	$itemForm = "<label for='itemName'>Item Name: </label><input name='itemName' id='itemName' type='text'><br>
				<label for='price'>Price: </label><input name='price' id='price' type='text'><br>
				<label for='where'>Where to buy: </label><input name='where' id='where' type='text'><br>
				<label for='description'>Description: </label><input name='description' id='description' type='text'><br>
				<input id='selector' name='type' type='hidden' value='wishlist'>
				<input id='submit' type='button' value='Submit'><input type='submit' id='save' value='Save Changes'><input type='button' id='del' value='Delete Selected'>";
	
	define('PASSWORD', 'seamonsters2605');
	//$submittedPassword = $post["password"];

	switch ($type) {
		case 'password':
			$submittedPassword = $post["password"];

			if($submittedPassword == PASSWORD) {
				if(file_exists('../js/wishlist.json')) {
					$file = file_get_contents('../js/wishlist.json');
				}

				$response = array('type' => 'password', 'form' => $itemForm, 'current' => $file);
				$response_json = json_encode($response);
				echo $response_json;
			} else {
				$response = array('type' => 'password', 'form' => 'false');
				$response_json = json_encode($response);
				echo $response_json;
			}
			break;

		case 'read':
			if(file_exists('../js/wishlist.json')) {
					$file = file_get_contents('../js/wishlist.json');
				}

				$response = array('type' => 'password', 'form' => $itemForm, 'current' => $file);
				$response_json = json_encode($response);
				echo $response_json;
			break;

		case 'wishlist':
				file_put_contents('../js/wishlist.json', $post['current']);
				
				$response = array('type' => 'wishlist', 'msg' => 'success');
				echo json_encode($response);
			break;
		
		default:
			# code...
			break;
	}
?>