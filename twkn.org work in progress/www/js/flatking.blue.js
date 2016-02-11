$(document).ready(function() {
	
	/* testimonial ======================================= */
	$('.carousel').carousel();
	
	/* One Page Navigation Setup ======================================= */
	$('#main-nav').singlePageNav({
		offset: 50,
		// filter: ':not(.external)',
		speed: 750,
		currentClass: 'active',
		beforeStart: function() {},
		onComplete: function() {}
	});
	
	/* Bootstrap Affix ======================================= */		
	$('#navbar').affix({
		offset: {
			top: $('#topbar').outerHeight(),
		}
	});
		
	/* Smooth Hash Link Scroll ======================================= */	
	$('.smooth-scroll').click(function() {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html,body').animate({
						scrollTop: target.offset().top
				}, 1000);
				return false;
			}
		}
	});
		
	$('.nav a').on('click', function() {
		if ($('.navbar-toggle').css('display') != 'none') {
			$(".navbar-toggle").click();
		}
	});
	
	/* Menu navigation ======================================= */	
	$(window).scroll(function(){
		if ($(window).scrollTop()<=60){
			var wi5 = $(window).width();
			if (wi5 >= 768){
				$('#main-nav').addClass('mymenu');
			}	
		}
		else{
			$('#main-nav').removeClass('mymenu');    
		}
	});
	$('.navbar-toggle').click(function(){
		if($('#main-nav').hasClass('mymenu')){
			$('#main-nav').removeClass('mymenu');
		}
	});    
	
	/* PieChart ==============================================*/	
	$('.chart').easyPieChart({
		size: 140,
		animate: 2000,
		lineCap: 'butt',
		scaleColor: false,
		barColor: '#2AAFC3',
		trackColor: '#f2f2f2',
		lineWidth: 15
	}); 
	
	/* Filter Projects	==============================================*/
	$('#filter-works a').click(function(e) {
		e.preventDefault();
		$('#filter-works li').removeClass('active');
		$(this).parent('li').addClass('active');
		var category = $(this).attr('data-filter');
		$('.work').each(function() {
			if (category == '*') {
				$(this).removeClass('filtered').removeClass('selected');
				return;
			} else if ($(this).is(category)) {
				$(this).removeClass('filtered').addClass('selected');
			} else {
				$(this).removeClass('selected').addClass('filtered');
			}
		});
	}); 
	/* Project Preview	==============================================*/
	$('.img-box').click(function(e) {
		e.preventDefault();
		var elem = $(this).parent(),
			title = elem.find('.project-title').text(),
			descr = elem.find('.project-description').html(),
			slidesHtml = '<ul class="slides">',
			elemDataCont = elem.find('.project-description');
		slides = elem.find('.project-description').data('images').split(',');
		for (var i = 0; i < slides.length; ++i) {
			slidesHtml = slidesHtml + '<li><img src=' + slides[i] + ' alt></li>';
		}
		slidesHtml = slidesHtml + '</ul>';
		$('#project-modal').on('show.bs.modal', function() {
			$(this).find('#hdr-title').text(title);
			$(this).find('#sdbr-title').text(title);
			$(this).find('#project-content').html(descr);
			$(this).find('.screen').addClass('flexslider').html(slidesHtml);
			if (elemDataCont.data('category')) {
				$(this).find('#sdbr-category').show().text(elemDataCont.data('category'))
			} else {
				$(this).find('#sdbr-category').hide();
			}
			if (elemDataCont.data('date')) {
				$(this).find('#sdbr-date').show().text(elemDataCont.data('date'))
			} else {
				$(this).find('#sdbr-date').hide();
			}
			if (elemDataCont.data('client')) {
				$(this).find('#sdbr-client').show().text(elemDataCont.data('client'))
			} else {
				$(this).find('#sdbr-client').hide();
			}
			if (elemDataCont.data('link')) {
				var extLink = elemDataCont.data('link').split(',');
				$(this).find('#sdbr-link').show().find('a').text(extLink[0]).attr('href', extLink[1]);
			} else {
				$(this).find('#sdbr-link').hide();
			}
			if (elemDataCont.data('descr')) {
				$(this).find('#sdbr-descr').show().text(elemDataCont.data('descr'))
			} else {
				$(this).find('#sdbr-descr').hide();
			}
			setTimeout(function() {
				$('.screen.flexslider').flexslider({
					prevText: '<i class="icon-arrow-left"></i>',
					nextText: '<i class="icon-arrow-right"></i>',
					slideshowSpeed: 3000,
					animation: 'slide',
					controlNav: false,
					pauseOnAction: false,
					pauseOnHover: true,
					start: function() {
						$('#project-modal .screen').addClass('done').prev('.loader').fadeOut();
					}
				});
			}, 1000);
		}).modal();
	});
	$('#project-modal').on('hidden.bs.modal', function() {
		$(this).find('.loader').show();
		$(this).find('.screen').removeClass('flexslider').removeClass('done').html('').flexslider('destroy');
	});

});