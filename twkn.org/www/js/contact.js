$(document).ready(function() {
	$('#newsletter-form').submit(function() {
		var buttonCopy = $('#newsletter-form button').html(),
		errorMessage = $('#newsletter-form button').data('error-message'),
		sendingMessage = $('#newsletter-form button').data('sending-message'),
		okMessage = $('#newsletter-form button').data('ok-message'),
		hasError = false;
		$('#newsletter-form .error-message').remove();
		$('#newsletter-form .requiredField').each(function() {
			$(this).removeClass('inputError');
			if($.trim($(this).val()) == '') {
				var errorText = $(this).data('error-empty');
				$(this).addClass('inputError');
				hasError = true;
			} else if($(this).is("input[type='email']") || $(this).attr('name')==='email') {
				var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
				if(!emailReg.test($.trim($(this).val()))) {
					var invalidEmail = $(this).data('error-invalid');
					$(this).addClass('inputError');
					hasError = true;
				}
			}			
		});
		
		if(hasError) {
			$('#newsletter-form button').html('<i class="icon-times"></i>'+errorMessage).addClass('btn-error');
			
			setTimeout(function(){
				$('#newsletter-form button').removeClass('btn-error').html(buttonCopy);
				
			},2000);
		} else {
			$('#newsletter-form button').html('<i class="icon-spinner icon-spin"></i>'+sendingMessage);
			var formInput = $(this).serialize();
			$.post($(this).attr('action'),formInput, function(data){
				$('#newsletter-form button').html('<i class="fa fa-check"></i>'+okMessage);
				setTimeout(function(){
					$('#newsletter-form button').html(buttonCopy);
				},2000);
			});
		}
		return false;	
	});

	$('#contact-form').submit(function() {
		var buttonCopy = $('#contact-form button').html(),
			errorMessage = $('#contact-form button').data('error-message'),
			sendingMessage = $('#contact-form button').data('sending-message'),
			okMessage = $('#contact-form button').data('ok-message'),
			hasError = false;
		$('#contact-form .error-message').remove();
		$('#contact-form .requiredField').each(function() {
			$(this).removeClass('inputError');
			if($.trim($(this).val()) == '') {
				var errorText = $(this).data('error-empty');
				$(this).parents('.controls').append('<span class="error-message" style="display:none;">'+errorText+'.</span>').find('.error-message').fadeIn('fast');
				$(this).addClass('inputError');
				hasError = true;
			} else if($(this).is("input[type='email']") || $(this).attr('name')==='email') {
				var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
				if(!emailReg.test($.trim($(this).val()))) {
					var invalidEmail = $(this).data('error-invalid');
					$(this).parents('.controls').append('<span class="error-message" style="display:none;">'+invalidEmail+'.</span>').find('.error-message').fadeIn('fast');
					$(this).addClass('inputError');
					hasError = true;
				}
			}
		});
		if(hasError) {
			$('#contact-form button').html('<i class="fa fa-times"></i>'+errorMessage).addClass('btn-error');
			
			setTimeout(function(){
				$('#contact-form button').removeClass('btn-error').html(buttonCopy);
				
			},2000);
		}
		else {
			$('#contact-form button').html('<i class="icon-spinner icon-spin"></i>'+sendingMessage);
			
			var formInput = $(this).serialize();
			$.post($(this).attr('action'),formInput, function(data){
				$('#contact-form button').html('<i class="fa fa-check"></i>'+okMessage);
				setTimeout(function(){
					$('#contact-form button').html(buttonCopy);
				},2000);
				
			});
		}
		return false;	
	});
});