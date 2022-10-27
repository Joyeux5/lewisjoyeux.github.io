$(document).ready(function(){


	/***************************************************************
		Move Elements
	***************************************************************/

		moveElements();

		function moveElements() {
			if ( window.innerWidth < 992 ) {
				if ( $("#elementOldPlace1 > div").length ) { $("#elementOldPlace1 > div").appendTo( $("#elementNewPlace1") ); }
				if ( $("#elementOldPlace2 > div").length ) { $("#elementOldPlace2 > div").appendTo( $("#elementNewPlace2") ); }
				if ( $("#elementOldPlace3 > div").length ) { $("#elementOldPlace3 > div").appendTo( $("#elementNewPlace3") ); }
			} else {
				if ( $("#elementNewPlace1 > div").length ) { $("#elementNewPlace1 > div").appendTo( $("#elementOldPlace1") ); }
				if ( $("#elementNewPlace2 > div").length ) { $("#elementNewPlace2 > div").appendTo( $("#elementOldPlace2") ); }
				if ( $("#elementNewPlace3 > div").length ) { $("#elementNewPlace3 > div").appendTo( $("#elementOldPlace3") ); }
			}
		}

		$(window).resize(moveElements);



	/***************************************************************
		Parallax
	***************************************************************/

		parallax();
		window.addEventListener("scroll", parallax);

		function parallax() {
			var scrollTop = $(window).scrollTop();
			var windowHeight = window.innerHeight;
			var theSize = 0;
			var newHeight = 0;

			// Brand Logo
			if ( $(".brand-logo-wrapper").length ) {
				var newTop = Math.max(scrollTop * -0.15, -60);
				$(".brand-logo-wrapper").css("top", newTop);
			}

			// About Line 1
			if ( $(".about-showroom-lines").length ) {
				if ( window.innerWidth >= 1200 ) {
					theHeight = 110;
				} else {
					theHeight = 50;
				}
				var lineFromTop1 = $(".about-showroom-lines span:first-of-type").offset().top - 100;
				theSize = ( (scrollTop + (windowHeight/2)) - lineFromTop1 ) * 0.5;
				newHeight = Math.min( Math.max(theSize, 0), theHeight);
				$(".about-showroom-lines span:first-of-type").css("height", newHeight)

				// About Line 2
				var lineFromTop2 = $(".about-showroom-lines span:last-of-type").offset().top - 50;
				theSize = ( (scrollTop + (windowHeight/2)) - lineFromTop2 ) * 0.5;
				newHeight = Math.min( Math.max(theSize, 0), theHeight);
				$(".about-showroom-lines span:last-of-type").css("height", newHeight)

				// About Line 3
				var lineFromTop3 = $(".about-innovation-bigimage-lines span:first-of-type").offset().top - 100;
				theSize = ( (scrollTop + (windowHeight/2)) - lineFromTop3 ) * 0.5;
				newHeight = Math.min( Math.max(theSize, 0), theHeight);
				$(".about-innovation-bigimage-lines span:first-of-type").css("height", newHeight)

				// About Line 3
				var lineFromTop4 = $(".about-innovation-bigimage-lines span:last-of-type").offset().top - 50;
				theSize = ( (scrollTop + (windowHeight/2)) - lineFromTop4 ) * 0.5;
				newHeight = Math.min( Math.max(theSize, 0), theHeight);
				$(".about-innovation-bigimage-lines span:last-of-type").css("height", newHeight)
			}

			// Grid
			if ( $(".gridParallaxItem").length ) {
				$(".gridParallaxItem").each(function(index){
					if ( $(this).parent().hasClass("about-innovation-twoimages-overflow") || $(this).parent().hasClass("about-innovation-oneimage") || $(this).parent().hasClass("about-innovation-smallimage") ) {
						var factor = 20;
					} else {
						var factor = 15;
					}
					var itemFromTop = $(this).parent().offset().top;
					var itemStart = itemFromTop - windowHeight;
					var itemEnd = itemFromTop + $(this).parent().height();
					var precentage = ( scrollTop - itemStart ) / ( itemEnd - itemStart ) * 100;
					if ( precentage < 0 ) {
						precentage = 0;
					} else if ( precentage > 100 ) {
						precentage = 100;
					}
					precentage = precentage * factor / 100;
					$(this).css("top", ("-" + precentage + "%"));
				});
			}
		}



	/***************************************************************
		Parallax - About
	***************************************************************/

		if ( $(".about").length ) {
			parallaxAbout();
			window.addEventListener("scroll", parallaxAbout);

			aboutParallax();
			$(window).scroll(aboutParallax);
		}

		function parallaxAbout() {
			var scrollTop = $(window).scrollTop();
			var windowHeight = window.innerHeight;

			var title1FromTop = $(".about-showroom .supertitle").offset().top;
			var title2FromTop = $(".about-innovation-title").offset().top;

			if ( scrollTop+windowHeight-100 >= title1FromTop ) {
				$(".about-showroom .supertitle").addClass("active");
			}

			if ( scrollTop+windowHeight-100 >= title2FromTop ) {
				$(".about-innovation-title span").addClass("active");
			}
		}


		function aboutParallax() {
			var fromTop = $(window).scrollTop();
			var windowHeight = $(window).height();
			var aboutFromTop = $(".about-showroom-background-wrapper").offset().top;
			var aboutHeight = $(".about-showroom-background-wrapper").innerHeight();

			if ( (fromTop+windowHeight) >= (aboutFromTop+(aboutHeight/2)) ) {
				var newTop = fromTop * -0.15;
				newTop = -100 - newTop;
				$(".about-showroom-background").css("transform", "translateY(" + newTop + "px)");
			}
		}

	/***************************************************************
		Homepage Gallery Scroll
	***************************************************************/

		if ( $(".homepage-gallery-navigator").length ) {

			var homepageGallerySlider = $(".homepage-gallery-navigator")[0];
			var homepageGallerySliderAnimationAllow = true;
			var homepageGallerySliderAnimationQueue = 0;
			var homepageGallerySliderAnimationTimeout;

			noUiSlider.create(homepageGallerySlider, {
				start: 0,
				range: {
					'min': 0,
					'max': 100
				}
			});

			homepageGallerySlider.noUiSlider.on('update', function( values ) {
				var percentage = parseFloat( values[0] );

				var lastItemLeft = $(".homepage-gallery-slider-item:last-of-type").offset().left;
				var lastItemWidth = $(".homepage-gallery-slider-item:last-of-type").width();
				var alreadyMoveLeft = $(".homepage-gallery-slider-inside").scrollLeft();
				var galleryWidth = lastItemLeft+alreadyMoveLeft+lastItemWidth;

				var scroll = ( galleryWidth - window.innerWidth ) * percentage / 100;

				$(".homepage-gallery-slider-inside").scrollLeft( scroll );
			});

			homepageGallerySlider.noUiSlider.on('slide', function( values ) {
				var percentage = parseFloat( values[0] );

				if ( percentage < 100 ) {
					$(".homepage-gallery-title").fadeIn();
					homepageGallerySliderAnimationAllow = false;
					homepageGallerySliderAnimationQueue = 0;
					clearTimeout( homepageGallerySliderAnimationTimeout );
					homepageGallerySliderAnimationTimeout = setTimeout(function(){
						if ( !homepageGallerySliderAnimationAllow ) {
							homepageGallerySliderAnimationAllow = true;
							homepageGallerySliderAnimationQueue++;
							playProjects(homepageGallerySliderAnimationQueue);
							setTimeout(function(){
								if ( homepageGallerySliderAnimationAllow ) {
								}
							}, 2000);
						}
					}, 3000);
				}
			});
		}



	/***************************************************************
		Projects - Play
	***************************************************************/

		function playProjects(loop) {
			if ( homepageGallerySliderAnimationAllow && loop == 1 && window.innerWidth >= 992 ) {
				setTimeout(function(){
					if ( homepageGallerySliderAnimationAllow ) {
						var lastItemLeft = $(".homepage-gallery-slider-item:last-of-type").offset().left;
						var lastItemWidth = $(".homepage-gallery-slider-item:last-of-type").width();
						var alreadyMoveLeft = $(".homepage-gallery-slider-inside").scrollLeft();
						var galleryWidth = lastItemLeft+alreadyMoveLeft+lastItemWidth;

						var step = 150/galleryWidth;
						if ( step < 0.01 ) {
							step = 0.01;
						}
						var current = parseFloat( homepageGallerySlider.noUiSlider.get() );
						current = current+step;

						if ( current < 100 ) {
							homepageGallerySlider.noUiSlider.set(current);
							if ( homepageGallerySliderAnimationAllow ) {
								playProjects(loop);
							}
						} else {
							homepageGallerySliderAnimationAllow = false;
						}
					}
				}, 10);
			}
		}


	/***************************************************************
		Homepage Gallery Hover
	***************************************************************/

		$(".homepage-gallery-slider-item > div > a").mouseenter(function(){
			$(this).parents(".homepage-gallery-slider-item").addClass("active");
			homepageGallerySliderAnimationAllow = false;
			homepageGallerySliderAnimationQueue = 0;
			clearTimeout( homepageGallerySliderAnimationTimeout );
		});

		$(".homepage-gallery-slider-item").mouseleave(function(){
			if ( $(this).hasClass("active") ) {
				$(".homepage-gallery-slider-item").removeClass("active");
				homepageGallerySliderAnimationAllow = true;
				homepageGallerySliderAnimationQueue++;
				homepageGallerySliderAnimationTimeout = setTimeout(function(){
					playProjects(homepageGallerySliderAnimationQueue);
				}, 3000);
			}
		});



	/***************************************************************
		Scroll Events
	***************************************************************/

		if ( $("#homepage").length ) {
			makeFullpage();
		}

		function makeFullpage() {
			if ( window.innerWidth >= 992 ) {
				new fullpage('#homepage', {
					licenseKey: 'DC10BE3A-47B0430E-8A57A501-CF40DA11',
					scrollingSpeed: 1200,
					responsiveWidth: 700,
					easingcss3: 'cubic-bezier(0.694, 0, 0.335, 1)',
					fitToSection: false,
					parallax: true,
					parallaxKey: 'aW50ZXJpb3ItZGVmaW5lLmNvbV9POEtjR0Z5WVd4c1lYZz14Mmo=',
					parallaxOptions: {type: 'reveal', percentage: 60, property: 'translate'},

					onLeave: function(origin, destination, direction){
						if ( direction == "down" ) {
							setTimeout(function(){
								$("#homepage > div:nth-of-type(" + (destination.index+1) + ") .titleFadeIn").addClass("active");
							}, 700);
						}
					},

					afterLoad: function(origin, destination, direction){
						if ( destination.index == 3 ) {
							homepageGallerySliderAnimationAllow = true;
							if ( homepageGallerySliderAnimationAllow ) {
								clearTimeout( homepageGallerySliderAnimationTimeout );
								homepageGallerySliderAnimationTimeout = setTimeout(function(){
									homepageGallerySliderAnimationQueue++;
									playProjects(homepageGallerySliderAnimationQueue);
									setTimeout(function(){
										if ( homepageGallerySliderAnimationAllow ) {
										}
									}, 2000);
								}, 3000);
							}
						} else if ( destination.index == 2 || destination.index == 4 ) {
							homepageGallerySliderAnimationAllow = false;
							homepageGallerySliderAnimationQueue = 0;
							homepageGallerySlider.noUiSlider.set(0);
							$(".homepage-gallery-title").fadeIn();
						}
					}
				});
			} else {
				if ( $("#homepage").hasClass("fullpage-wrapper") ) {
					fullpage_api.destroy("all");
				}
			}
		}

		$(window).resize(function(){
			if ( $("#homepage").length ) {
				makeFullpage();
			}
		});

	/***************************************************************
		Title Effect
	***************************************************************/

		if ( $(".titleFadeIn").length ) {
			if ( $("#homepage").length ) {
				if ( $(".loader").length ) {
					setTimeout(function(){
						$("#homepage .firstsection .titleFadeIn").addClass("active");
					}, 5200);
				} else {
					setTimeout(function(){
						$("#homepage .firstsection .titleFadeIn").addClass("active");
					}, 300);
				}
			} else {
				setTimeout(function(){
					$(".titleFadeIn").addClass("active");
				}, 500);
			}
		}

	/***************************************************************
		Homepage Slider
	***************************************************************/

		if ( $(".homepage-slider-background").length ) {
			var homepageSliderItemsNumber = $(".homepage-slider-background-item").length;

			homepageSliderRotation();
			function homepageSliderRotation() {

				// Get Index
				var activeIndex = $(".homepage-slider-background-item.active").index() + 1;
				if ( activeIndex == 1 ) {
					var previousIndex = homepageSliderItemsNumber;
				} else {
					var previousIndex = activeIndex-1;
				}
				if ( activeIndex == homepageSliderItemsNumber ) {
					var nextIndex = 1;
				} else {
					var nextIndex = activeIndex+1;
				}

				// Remove Active
				$(".homepage-slider-background-item:nth-of-type("+ previousIndex + ")").removeClass("activeNew");

				// Set Next Direction
				var direction = $(".homepage-slider-background-item:nth-of-type("+ activeIndex + ")").attr("data-direction");
				switch ( direction ) {
					case "right":
						$(".homepage-slider-background-item:nth-of-type("+ nextIndex + ")").attr("data-direction", "bottom");
					break;
					case "bottom":
						$(".homepage-slider-background-item:nth-of-type("+ nextIndex + ")").attr("data-direction", "left");
					break;
					case "left":
						$(".homepage-slider-background-item:nth-of-type("+ nextIndex + ")").attr("data-direction", "top");
					break;
					case "top":
						$(".homepage-slider-background-item:nth-of-type("+ nextIndex + ")").attr("data-direction", "right");
					break;
				}

				// Make Next Active
				setTimeout(function(){
					$(".homepage-slider-background-item:nth-of-type("+ nextIndex + ")").addClass("active activeNew");
					$(".homepage-slider-background-item:nth-of-type("+ activeIndex + ")").removeClass("activeNew");
					setTimeout(function(){
							$(".homepage-slider-background-item:nth-of-type("+ activeIndex + ")").removeClass("active").attr("data-direction", "");
								homepageSliderRotation();
					}, 3500);
				}, 100);
			}
		}



	/***************************************************************
		Homepage Catalogue
	***************************************************************/

		$(".homepage-catalogue-links-item").hover(function(){
			var itemIndex = $(this).index() + 1;
			var backgroundImage = $(".homepage-catalogue-background-divided div:nth-of-type(" + itemIndex + ") div").css("background-image");
			$(".homepage-catalogue-background-divided").hide();
			$(".homepage-catalogue-background-big div").css("background-image", backgroundImage);
			$(".homepage-catalogue-background").addClass("active");
			$(".homepage-catalogue-title").addClass("active");
		}, function(){
			$(".homepage-catalogue-background-divided").show();
			$(".homepage-catalogue-background").removeClass("active");
			$(".homepage-catalogue-title").removeClass("active");
		});


	/***************************************************************
		Homepage Contact Input
	***************************************************************/

		$(".homepage-contact-form input, .homepage-contact-form textarea").focusout(function(){
			if ( $(this).val() == "" ) {
				$(this).parents(".input-wrapper, .textarea-wrapper").removeClass("active");
			} else {
				$(this).parents(".input-wrapper, .textarea-wrapper").addClass("active");
			}
		});

		$(".homepage-contact-form textarea").trigger("keyup");
		$(".homepage-contact-form textarea").keyup(function(){
			$(this).css("height", "32px");
			var height = $(this)[0].scrollHeight;
			$(this).css("height", height+"px");
			if ( height > 81 ) {
				$(this).css("overflow", "auto");
			} else {
				$(this).css("overflow", "hidden");
			}
		});



	/***************************************************************
		Open/Close Catalogue
	***************************************************************/

		if ( $(".catalogue-item").length && window.innerWidth < 992 ) {
			$(".catalogue-item").each(function(){
				var titleHeight = $(this).find(".catalogue-item-content-title").outerHeight();
				var listHeight = $(this).find(".catalogue-item-content-list").outerHeight();
				var theHeight = titleHeight+listHeight;
				$(this).find(".catalogue-item-background").css("height", theHeight);
			});
		}

		$(".catalogue-item-content-title").on("click", function(){
			if ( window.innerWidth < 992 ) {
				if ( $(this).hasClass("active") ) {

					$(this).removeClass("active");
					var pointer = $(this).parents(".catalogue-item").find(".catalogue-item-content-list");
					var theHeight = $(pointer).outerHeight();
					$(pointer).css("height", theHeight).addClass("transition");
					setTimeout(function(){
						$(pointer).css("height", "0");
						setTimeout(function(){
							$(pointer).removeClass("active transition").attr("style", "");
						}, 500);
					}, 10);

				} else {

					$(".catalogue-item-content-title.active").trigger("click");
					$(this).addClass("active");
					var pointer = $(this).parents(".catalogue-item").find(".catalogue-item-content-list");
					var theHeight = $(pointer).outerHeight();
					$(pointer).css("height", "0").addClass("active transition");
					setTimeout(function(){
						$(pointer).css("height", theHeight);
						setTimeout(function(){
							$(pointer).css("height", "auto").removeClass("transition");
						}, 500);
					}, 10);

				}
			}
		});

	/***************************************************************
		Form Validation Functions
	***************************************************************/

		function removeDashed(number) {
			return number.replace(/-/g, "");
		}

		function onlyDigits(number) {
			var reg = new RegExp('^[0-9]+$');
			return reg.test(number);
		}

		function checkPhone(number) {
			if ( onlyDigits(number) ) {

						return true;
					}
			else {
				return false;
			}
		}

		function checkEmail(email) {
			var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(email);
		}

    if (!String.prototype.startsWith) {
			String.prototype.startsWith = function(searchString, position){
				position = position || 0;
				return this.substr(position, searchString.length) === searchString;
			};
		}



	/***************************************************************
		Jump On Submit Fix
	***************************************************************/

		var scrollFromTop = $(window).scrollTop();

		$(window).scroll(function(){
			scrollFromTop = $(window).scrollTop();
		});



  /***************************************************************
		Form Validation
	***************************************************************/

		$("form#homepageContactForm").on("submit", function(event){
			event.preventDefault();

			var alertMessage = "";
			var contactValidationFlag = true;

			$(this).find(".input-wrapper.check").each(function(index){
				// if empty
				if ( $.trim( $(this).find("input").val() ) == "" ) {
					contactValidationFlag = false;
					if ( index == 0 ) {
						alertMessage = "";
					} else if ( index == 1 ) {
						alertMessage = "";
					} else if ( index == 2 ) {
						alertMessage = "";
					}
					$(this).find("span").text( alertMessage );
					$(this).addClass("error");

				} else {
					// phone validation
					if ( $(this).hasClass("checkPhone") ) {
						var newNumber = removeDashed( $(this).find("input").val() );
						if ( !checkPhone( newNumber ) ) {
							contactValidationFlag = false;
							$(this).find("span").text("Phone Number");
							$(this).addClass("error");
						} else {
							$(this).find("span").text("");
							$(this).removeClass("error");
						}

					// email validation
					} else if ( $(this).hasClass("checkEmail") ) {
						if ( !checkEmail( $(this).find("input").val() ) ) {
							contactValidationFlag = false;
							$(this).find("span").text("Email");
							$(this).addClass("error");
						} else {
							$(this).find("span").text("");
							$(this).removeClass("error");
						}

					} else {
						$(this).removeClass("error");
					}
				}
			});

			if ( contactValidationFlag ) {
				$("#homepageContactForm button").prop("disabled", true);
				sendForm();
			}
		});



	/***************************************************************
		Send Form Function
	***************************************************************/

			function sendForm() {
				$.ajax( "i_define_files/sendform.php", {
					method: "POST",
					data: {
						action: 'sendmail',
						mydata: $("form").serializeArray()
					},
					success: function(response){
						if (response == 1) {
							$("#homepageContactForm").fadeOut(function(){
								$("#successMessage").fadeIn();
								gtag('event', 'conversion', { 'send_to': 'AW-730423096/E50nCN6e5dsBELi-pdwC' });
							});
						} else {
							$("#homepageContactForm button").prop("disabled", false);
						}
					}
				});
			}

});

