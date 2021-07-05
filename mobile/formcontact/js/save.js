$(document).ready(function(){
var datalog = 0;

$.validate({
	lang: 'fr',
	submitHandler: function(form) {
		// soumission du form
		form.submit();
	},
	onError : function() {
		console.log('Une erreur s’est produite lors de la transmission de vos informations, veuillez-nous <a href="/contact/">contacter</a> afin que nous traitions votre demande.');
	},
	onElementValidate : function(valid, $el, $form, errorMess) {
		if(valid) {
			var form_id = $("#form_id").val();
			var data_form_id = $("#data_form_id").val();
			//Get Valus and fileds id
			var valuefiled = $el.val();
			var filed = $el.attr('id');
			var idfieldarray = filed.split("-");
			var idfiled = idfieldarray[1];
			// Returns successful data submission message when the entered information is stored in database.
			var dataStringFocusout = 'valuefiled1=' + valuefiled + '&idfiled1=' + idfiled + '&datalog1=' + datalog + '&formid1=' + form_id + '&dataformid1=' + data_form_id;
			// AJAX Code To Submit Form.
			$.ajax({
				type: "POST",
				url: "save-focusout.php",
				data: dataStringFocusout,
				cache: false,
				success: function(response){
					datalog = 1;
					if( data_form_id == '' || data_form_id == undefined) {
						$("#data_form_id").val(response);
					}
				}
			});
		}
	},
	onSuccess : function($form) {
		// save text & hidden fields
		$('input[type=text], input[type=hidden]').each(function () {
			var form_id = $("#form_id").val();
			var data_form_id = $("#data_form_id").val();
			//Get Valus and fileds id
			var valuefiled = $(this).val();
			if(valuefiled !== '' && valuefiled != undefined) {
				var filed = $(this).attr('id');
				var idfieldarray = filed.split("-");
				var idfiled = idfieldarray[1];
				var dataStringFocusout = 'valuefiled1=' + valuefiled + '&idfiled1=' + idfiled + '&datalog1=' + datalog + '&formid1=' + form_id + '&dataformid1=' + data_form_id;
				$.ajax({
					type: "POST",
					url: "save-focusout.php",
					data: dataStringFocusout,
					cache: false,
					success: function(response){
						datalog = 1;
						if(data_form_id == '' || data_form_id == undefined) {
							$("#data_form_id").val(response);
						}
					}
				});
			}
		});
		
		// control & save radio & checkbox fields
		$('input[type=radio], input[type=checkbox]').each(function () {
			var form_id = $("#form_id").val();
			var data_form_id = $("#data_form_id").val();
			//Get Values
			if ($(this).is(":checked") && $(this).attr('type') == 'checkbox') {
			  var valuefiled = 1;
			  console.log('checkox select');
			}else if ($(this).attr('type') == 'checkbox') {
			  var valuefiled = 0;
			  console.log('checkox unselect with value:'+valuefiled);
			}
			if($(this).is(':checked') && $(this).attr('type') == 'radio') { 
			  var valuefiled = this.value;
			}	
			
			if(valuefiled !== '' && valuefiled != undefined) {
				var filed = $(this).attr('id');
				var idfieldarray = filed.split("-");
				var idfiled = idfieldarray[1];
				var dataStringFocusout = 'valuefiled1=' + valuefiled + '&idfiled1=' + idfiled + '&datalog1=' + datalog + '&formid1=' + form_id + '&dataformid1=' + data_form_id;
				console.log(dataStringFocusout);
				$.ajax({
					type: "POST",
					url: "save-focusout.php",
					data: dataStringFocusout,
					cache: false,
					success: function(response){
						datalog = 1;
						if(data_form_id == '' || data_form_id == undefined) {
							$("#data_form_id").val(response);
						}
					}
				});
			}
		});
	}
});

$(':checkbox').checkboxpicker({
	offLabel: 'NON',
	onLabel: 'OUI'
});

	$(':checkbox').checkboxpicker().on('change', function(e) {
		//Get Valus and fileds id
		var form_id = $("#form_id").val();
		var data_form_id = $("#data_form_id").val();
		
		if ($(':checkbox').is(":checked"))
		{
		  var valuefiled = 1;
		}else{
		  var valuefiled = 0;
		}
		
		var filed = e.target.id;
		var idfieldarray = filed.split("-");
		var idfiled = idfieldarray[1];
		// Returns successful data submission message when the entered information is stored in database.
		var dataStringFocusout = 'valuefiled1=' + valuefiled + '&idfiled1=' + idfiled + '&datalog1=' + datalog + '&formid1=' + form_id + '&dataformid1=' + data_form_id;
		
		// AJAX Code To Submit Form.
		$.ajax({
			type: "POST",
			url: "save-focusout.php",
			data: dataStringFocusout,
			cache: false,
			success: function(response){
				datalog = 1;
				if(data_form_id == '' || data_form_id == undefined) {
					$("#data_form_id").val(response);
				}
			}
		});

		
	});
	
	
    $(':radio').change(function(e) {
		var form_id = $("#form_id").val();
		var data_form_id = $("#data_form_id").val();
		
        var nameradio = this.name;
		if($('input[name='+nameradio+']').is(':checked')) { 
		var valuefiled = this.value; 
		
		var filed = e.target.id;
		var idfieldarray = filed.split("-");
		var idfiled = idfieldarray[1];
		var dataStringFocusout = 'valuefiled1=' + valuefiled + '&idfiled1=' + idfiled + '&datalog1=' + datalog + '&formid1=' + form_id + '&dataformid1=' + data_form_id;
		
		// AJAX Code To Submit Form.
		$.ajax({
			type: "POST",
			url: "save-focusout.php",
			data: dataStringFocusout,
			cache: false,
			success: function(response){
				datalog = 1;
				if(data_form_id == '' || data_form_id == undefined) {
					$("#data_form_id").val(response);
				}
			}
		});

		}
    });
	


    $('select').change(function(e) {
		var form_id = $("#form_id").val();
		var data_form_id = $("#data_form_id").val();
        var nameselect = this.name;
		if(this.value != '') { 
			var valuefiled = this.value;
			var filed = e.target.id;
			var idfieldarray = filed.split("-");
			var idfiled = idfieldarray[1];
			var dataStringFocusout = 'valuefiled1=' + valuefiled + '&idfiled1=' + idfiled + '&datalog1=' + datalog + '&formid1=' + form_id + '&dataformid1=' + data_form_id;
			
			// AJAX Code To Submit Form.
			$.ajax({
				type: "POST",
				url: "save-focusout.php",
				data: dataStringFocusout,
				cache: false,
				success: function(response){
					datalog = 1;
					if(data_form_id == '' || data_form_id == undefined) {
						$("#data_form_id").val(response);
					}
				}
			});
		}
    });
});