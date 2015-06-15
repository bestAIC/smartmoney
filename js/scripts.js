$(document).ready(function() {
// start
	
	var $custom = $('select, input[type="radio"]:not(.nostyler), input[type="checkbox"]');
	$custom.styler();

	registerClickInformation();


	$(window).on('scroll', function() {
		var $start = $('.start'),
			startHeight = $start.height(),
			top = $(window).scrollTop();

		if(! $('body').hasClass('is-scrolled')) {
			if( top < startHeight  ) {
				$('html, body').animate({
					scrollTop: startHeight
				}, 1000);
			}
		}
		$('body').addClass('is-scrolled');
	});


	$('.profile').hover(
		function() {
			$(this).find('.profile-dropdown').fadeIn();
		},
		function() {
			$(this).find('.profile-dropdown').fadeOut();
		}
	);

	// Копирование ссылки в буфер обмена
	var $yourCode = $('.your-code');
	if($yourCode.length) {
		$yourCode.find('a').zclip({
			path: 'js/ZeroClipboard.swf',
			copy: $yourCode.find('.form-text').val(),
			afterCopy: function() {}
		});
	}

	$('.partner-link').each(function() {
		var $this = $(this);
		$this.find('a').zclip({
			path: 'js/ZeroClipboard.swf',
			copy: $this.find('input').val(),
			afterCopy: function() {}
		})
	});


	function resizeTariff() {
		var w = $(window).width();
		if( w >= 1180 ) {
			$('.tariff-cont').css('margin-left:', 0);
		} else if(w < 1180) {
			$('.all-one-container-tariff').on('click', '.one-container-tariff:not(.current)', function() {
				var $this = $(this),
					index = $this.index(),
					$parent = $this.parents('.tariff-cont');
				$this.addClass('current').siblings().removeClass('current');
				if(index == 0) $parent.animate({'margin-left': 460}, 300);
				if(index == 1) $parent.animate({'margin-left': 0}, 300);
				if(index == 2) $parent.animate({'margin-left': -600}, 300);
			});
		}
	}
	resizeTariff();

	$('.tariff-arrow-prev').on('click', function() {
		var $this = $('.one-container-tariff.current'),
			index = $this.index(),
			$parent = $this.parents('.tariff-cont');
		if(index == 1) {
			$('.one-container-tariff:eq(0)').addClass('current').siblings().removeClass('current');
			$parent.animate({'margin-left': 460}, 300);
		}
		if(index == 2) {
			$('.one-container-tariff:eq(1)').addClass('current').siblings().removeClass('current');
			$parent.animate({'margin-left': 0}, 300);
		}
	});

	$('.tariff-arrow-next').on('click', function() {
		var $this = $('.one-container-tariff.current'),
			index = $this.index(),
			$parent = $this.parents('.tariff-cont');
		if(index == 0) {
			$('.one-container-tariff:eq(1)').addClass('current').siblings().removeClass('current');
			$parent.animate({'margin-left': 0}, 300);
		}
		if(index == 1) {
			$('.one-container-tariff:eq(2)').addClass('current').siblings().removeClass('current');
			$parent.animate({'margin-left': -600}, 300);
		}
	});
	
	

	function resizeSteps() {
		var $this = $('.steps .line');
			width= $this.width(),
			$steps = $this.siblings('.step-part'),
			part = ($(window).width() - width) / 2;
		$steps.width(part + 40);
	}
	resizeSteps();
	initDatepicker();
	resizeTestimonial();

	$('input.toggle-registration').on('change', function() {
		var $this = $(this),
			$reg = $('.form-group-registration');
		if($this.is(':checked')) {
			$reg.slideUp();
		} else {
			$reg.slideDown();
		}
	});

	$('.hint .icon').hover(
		function() {
			var $hint = $(this).siblings('.hint-text');
			if(! $hint.hasClass('visible')) $hint.fadeIn();
		},
		function() {
			var $hint = $(this).siblings('.hint-text');
			if(! $hint.hasClass('visible')) $hint.fadeOut();
		}
	);

	$(document).click(function(event) {
		if ($(event.target).closest('.hint').length) return;
		var $hint =  $('.hint').find('.hint-text');
		if( ! $hint.hasClass('visible') ) $hint.fadeOut();
		event.stopPropagation();
	});

	$('.form-block').each(function() {
		var $this = $(this);
		if( $this.find('.hint').length ) $this.addClass('is-hint');
	});

	var $footer = $('.footer'),
		footerHeight = $footer.height() + parseFloat( $footer.css('margin-top')) + parseFloat( $footer.css('padding-top')) + parseFloat( $footer.css('padding-top'));
	
	$(window).on('scroll', function() {
		var $header = $('.header'),
			top = $(this).scrollTop(),
			start = $('.start').height();
		if(top >= start) {
			$header.addClass('scroll-take');
		} else {
			$header.removeClass('scroll-take');
		}
	});

	function useSticky() {
		var $total = $('.application-form .total'),
			$header = $('.header');
		if( $(window).width() > 1180 ) {
			if( ! $total.hasClass('nosticky') ) {
				if( $total.parents('.sticky-wrapper').length == 0) {
					$total.sticky({
						topSpacing: 115,
						bottomSpacing: footerHeight
					});
				}
				if( $header.parents('.sticky-wrapper').length == 0) {
					$header.sticky({topSpacing: 0});
				}
			}
		} else {
			$total.unstick();
			$header.unstick();
		}
	}
	useSticky();


	$('.component').hover(
		function() {
			var $this = $(this);
			$this.parents('.history-components').addClass( 'history-' + $this.index() );
		},
		function() {
			var $this = $(this);
			$this.parents('.history-components').removeClass( 'history-' + $this.index() );
		}
	);


	$('.news').on('click', '.new-content h4 a', function() {
		var $popup = $('.new-popup');
		$popup.slideDown();
		$('body').append('<div class="overlay"></div>');
		$('html, body').stop().animate({
			scrollTop: 0
		}, 500);
	});

	$('body').on('click', '.overlay', function() {
		closeBurger()
		closeNew();
	});

	$('body').on('click', '.new-popup .new-close', closeNew);

	function closeNew() {
		$('.new-popup').slideUp();
		var $o = $('.overlay');
		$o.css('opacity', 0);
		setTimeout(function() {
			$o.remove();
		}, 300);

	}


	$(window).on('scroll', function() {
		var scroll = $('body').scrollTop(),
			$steps = $('.steps-container');
		if( ! $steps.hasClass('nosticky') ) {
			if(scroll > 0) {
				$steps.addClass('scrolled');
				if( ! $steps.siblings('.steps-fake').length ) $steps.after('<div class="steps-fake"></div>');
			} else {
				$steps.removeClass('scrolled').siblings('.steps-fake').remove();
			}
		}
	});

	$('.total').on('click', '.show-button', function() {
		var $this = $(this),
			$total = $this.parents('.total'),
			$form = $total.find('.total-form'),
			$description = $total.find('.total-description');
		if( $total.hasClass('opened') ) {
			$total.removeClass('opened');
			$form.slideUp();
			$description.slideDown();
		} else {
			$total.addClass('opened');
			$form.slideDown();
			$description.slideUp();
		}
	});


	initRadiobox();
	hasCreditDelay();
	hasCreditClosed();
	selectPaymentType();
	hasSms();

	$('body').find('.has-credit-delay').on('change', 'input[type="radio"]', hasCreditDelay);
	$('.credit-closed').on('change', 'input[type="checkbox"]', hasCreditClosed);
	$('.payment-type-select').on('change', selectPaymentType);
	$('.form-oferta').on('change', 'input[type="checkbox"]', hasSms);

	$('body').on('change', '.radiobox input[type="radio"]', function() {
		changeRadiobox( $(this) );
	});


	$('.section-header-payment').on('change', 'input[type="checkbox"]', function() {
		var $this = $(this),
			type = $this.attr('data-type'),
			$parent = $this.parents('.paym-parent');
			$payment = $parent.find('.paym-type');
		if( $this.is(':checked') || $this.parents('label').siblings('label').find('input[type="checkbox"]').is(':checked') ) {
			$parent.addClass('payment-parent-filtered');
		} else {
			$parent.removeClass('payment-parent-filtered');
		}
		if(type == 'notax') {
			if( $this.is(':checked') ) {
				$parent.addClass('payment-parent-filtered-notax');
			} else {
				$parent.removeClass('payment-parent-filtered-notax');
			}
		}
		if(type == 'online') {
			if( $this.is(':checked') ) {
				$parent.addClass('payment-parent-filtered-online');
			} else {
				$parent.removeClass('payment-parent-filtered-online');
			}
		}
	});


	$('.btn-next, .back-link').on('click', function() {
		var $this = $(this),
			$parent = $this.parents('.step'),
			current = parseFloat( $parent.attr('data-step') ),
			isNext = $this.hasClass('btn-next'),
			next;

		if(isNext) {
			next = current + 1;
		} else {
			next = current - 1;
		}

		if( current == 1) {
			// Находясь на первом шаге начинаем колдовать
			var $sms = $this.parents('.form-submit').siblings('.form-sms');
			if($sms.is(':visible')) {
				$('.step[data-step="1"]').fadeOut(0).siblings('.step[data-step="2"]').fadeIn(500);
				$('.steps').attr('id','step-' + next + '').attr('data-current', next);
			} else {
				$sms.slideDown();
			}
			return false;
		} else {
			if( (isNext && current < 5) || (!isNext && current > 1) ) {
				$('.application').css('overflow', 'hidden');
				setTimeout(function() { $('.application').css('overflow', 'visible'); }, 500);
				$parent.fadeOut(0)
				.siblings('.step[data-step="' + next + '"]').fadeIn(500);
				$('.steps').attr('id','step-' + next + '').attr('data-current', next);
				$('html, body').stop().animate({
					scrollTop: 0
				}, 500);
				return false;
			}
		}
	});


	function mutualChange(first, second) {
		var $first = $(first),
			$second = $(second),
			tag = $first[0].nodeName.toLowerCase();
		$first.on('change', function() {
			var value = $first.val();
			if(tag == 'select') {
				$second.find('option').each(function() {
					var $option = $(this);
					if( $option.val() == value ) $option.prop('selected', true);
				});
				setTimeout(function() {$second.trigger('refresh');}, 1);
			} else {
				$second.val(value);
			}
		});
		$second.on('change', function() {
			var value = $second.val();
			if(tag == 'select') {
				$first.find('option').each(function() {
					var $option = $(this);
					if( $option.val() == value ) $option.prop('selected', true);
				});
				setTimeout(function() {$first.trigger('refresh');}, 1);
			} else {
				$first.val( value );
			}
		});
	}

	if( $('#card-period').length && $('#card-real-period').length) {
		mutualChange($('#card-period'), $('#card-real-period'));
	}
	if($('#card-period-month').length && $('#card-real-period-month').length) {
		mutualChange($('#card-period-month'), $('#card-real-period-month'));
	}
	if($('#card-holder').length && $('#card-real-holder').length) {
		mutualChange($('#card-holder'), $('#card-real-holder'));
	}
	if($('#card-cvv').length && $('#card-real-cvv').length) {
		mutualChange($('#card-cvv'), $('#card-real-cvv'));
	}






	$('.card-number').on('change keyup input click', function(e) {
		var $this = $(this),
			value = $this.val(),
			$number = $('#card-real-number');

		// Обрезаем символы, которые не являются цифрами
		if (value.match(/[^0-9]/g)) $this.val( value.replace(/[^0-9]/g, '') );
		pasteCardNumber();
	});

	function pasteCardNumber() {
		var $fields = $('.card-number'),
			$number = $('#card-real-number'),
			numberVal = '';
		$fields.each(function(i) {
			var $this = $(this),
				value = $this.val();
			if(i <= 3 && i > 0) value += ' ';
			numberVal += value;
		});
		$number.val(numberVal);
	}




	$('.steps-top').on('click', 'li:not(.readonly)', function() {
		var $this = $(this),
			$steps = $this.parents('.steps'),
			current = parseFloat( $steps.attr('data-current') ),
			next = parseFloat($this.index()) + 1;
		if( current > next ) {
			$('.step[data-step="' + current + '"]').fadeOut(0).siblings('.step[data-step="' + next + '"]').fadeIn(500);
			$('html, body').stop().animate({
				scrollTop: 0
			}, 500);
			$steps.attr('id','step-' + next + '').attr('data-current', next);
		}
	});


	$('.various').fancybox({
		maxWidth: 820,
		minWidth: 820,
		height: 'auto',
		fitToView: true,
		autoSize: true,
		closeClick: false,
		padding: 75,
		tpl: {
			closeBtn : '<a title="Закрыть" class="fancybox-item fancybox-close link-image" href="javascript:;"></a>',
		},
		afterClose: function() {
			$form = $('#popup-feedback');
			$form.find('.wpcf7-not-valid-tip').remove();
			$form.find('.wpcf7-response-output').hide();
			$form.find('.wpcf7-not-valid').removeClass('wpcf7-not-valid');
		}
	});


	$('body').on('click', '.add-credit-btn', function() {
		var $this = $(this),
			$parent = $this.parents('.credit'),
			num = parseFloat( $parent.attr('data-credit') ),
			next = num + 1;
		$parent.after('<div class="credit" style="display: none;" data-credit="' + next + '"><h2><span>4.3.' + next + '</span> Информация о кредите №' + next + '</h2><div class="form-block"><select><option>Название банка</option><option>АльфаБанк</option><option>Сбербанк</option></select></div><div class="form-block"><select><option>Цель кредита</option><option>Покупка квартиры</option><option>Покупка машины</option><option>Личные нужды</option></select></div><div class="form-block"><div class="form-label"><label for="form-credit-start-' + next + '">Дата получения кредита</label></div><div class="form-input"><div class="datepicker"><input type="text" id="form-credit-start-' + next + '" class="form-text" placeholder="ДД.ММ.ГГГ"></div></div></div><div class="form-block"><div class="form-label"><label for="form-credit-end-' + next + '">Дата закрытия кредита</label></div><div class="form-input"><div class="datepicker"><input type="text" id="form-credit-end-' + next + '" class="form-text" placeholder="ДД.ММ.ГГГ"></div></div></div><div class="form-block"><div class="form-label"><label for="form-credit-total-' + next + '">Сумма кредита</label></div><div class="form-input form-input-money"><input type="text" id="form-credit-total-' + next + '" class="form-text" placeholder="16 000"><div class="radiobox"><label><input type="radio" id="form-credit-total-radio-' + next + '" class="nostyler" checked><span>RUB</span></label><label><input type="radio" id="form-credit-total-radio" class="nostyler"><span>USD</span></label><label><input type="radio" id="form-credit-total-radio-' + next + '" class="nostyler"><span>EUR</span></label></div></div></div><div class="form-block form-block-checklist_small has-credit-delay radio-select"><div class="form-label form-label_top"><label>Была ли просрочка по кредиту?</label></div><label class="radioblock"><input type="radio" name="form-credit-delay-' + next + '" value="true"><span>Да</span></label><label class="radioblock"><input type="radio" name="form-credit-delay-' + next + '" value="false" checked><span>Нет</span></label><select><option>Да</option><option selected>Нет</option></select></div><div class="form-block credit-delay-select"><select><option>Количество дней просрочки</option><option>Один день</option><option>Два дня</option><option>Три дня</option><option>Больше трех дней</option></select></div><div class="form-block add-credit add-credit-more"><buttton class="button button_delete">Удалить кредит</buttton><buttton class="button add add-credit-btn">Добавить кредит</buttton></div></div></div>');
		setTimeout(function() {
			$('select, input[type="radio"]:not(.nostyler), input[type="checkbox"]').styler();
		}, 1);
		initRadiobox();
		initDatepicker();
		$this.parent().hide(); // Прячем кнопку «Добавить кредит»
		$parent.siblings('.credit').slideDown();
	});


	$('.tabs-list').each(function() {
		var $this = $(this),
			$tab = $this.find('.tab'),
			width = $tab.width(),
			num = $tab.length;
		$this.width( $tab.width() * $tab.length);
	});


	function resizeTabs() {
		$('.tabs-nav .line li.current').each(function() {
			var $this = $(this),
				$parent = $this.parents('.tabs'),
				$tabs = $parent.find('.tabs-list'),
				$tab = $tabs.find('.tab'),
				index = $this.index();
			$this.addClass('current').siblings().removeClass('current');
			$tabs.animate({
				'margin-left': index * $tab.width() * -1
			}, 0);
			$tab.eq(index).addClass('current').siblings().removeClass('current');
		});
	}
	resizeTabs();


	$('.tabs-nav').each(function() {
		var $this = $(this);
		$this.append('<select></select>');
		var $select = $this.find('select');
		$this.find('.line li').each(function() {
			$select.append('<option>' + $(this).find('span').text() + '</option>')
		});
		$select.styler();
	});

	$('.tabs-nav').on('change', 'select', function() {
		var $this = $(this),
			index = $this.find('option:selected').index(),
			$ul = $this.parents('.tabs-nav').find('.line ul'),
			$tabs = $this.parents('.tabs').find('.tabs-list');
		$ul.find('li:eq(' + index + ')').addClass('current').siblings().removeClass('current');
		$tabs.find('.tab:eq(' + index + ')').addClass('current').siblings().removeClass('current');
	});

	$('.tabs-nav .line').on('click', 'li:not(.current)', function() {
		var $this = $(this),
			$parent = $this.parents('.tabs'),
			$tabs = $parent.find('.tabs-list'),
			$tab = $tabs.find('.tab'),
			index = $this.index(),
			$nav = $parent.find('.tabs-nav .line ul'),
			$select = $parent.find('.tabs-nav select');
		$select.find('option:eq(' + index + ')').prop('selected', true);
		setTimeout(function() {
			$select.trigger('refresh');
		}, 1);
		$this.addClass('current').siblings().removeClass('current');
		$tabs.animate({
			'margin-left': index * $tab.width() * -1
		}, 750);
		$tab.eq(index).addClass('current').siblings().removeClass('current');
		function count() {
			var w = 0;
			if(index > 1) {
				for(i=0; i<index; i++) {
					$elem = $nav.find('li:eq(' + i + ')'),
					w += countWidth($elem, true);
				}
			}
			w *= -1;
			return w;
		}
		$nav.animate({
			'margin-left': count()
		});
	});



	function graphBenefit() {
		var winWidth = $(window).width(),
			$slider = $('.graph-benefit ul');
		if($slider.length) {
			$slider.trigger('destroy');
			if(winWidth < 690) {
				$slider.each(function() {
					var $this = $(this);
					$this.carouFredSel({
						circular: false,
						infinite: false,
						responsive: true,
						items: {
							visible: 1
						},
						scroll: {
							items: 1
						},
						auto: {
							play: false
						},
						prev: {
							button: $this.siblings('.graph-benefit-prev')
						},
						next: {
							button: $this.siblings('.graph-benefit-next')
						}
					});
				});
			} 
		}
	}
	graphBenefit();

	function smiSlider() {
		var winWidth = $(window).width(),
			$slider = $('.smi-slider'),
			$a = $slider.find('a');

		if($slider.length) {
			$slider.trigger('destroy');
			$a.width('auto');

			if(winWidth >= 1180) {
				var w = parseFloat( $(window).width() / 4 );
				$a.width(w);
				$slider.carouFredSel({
					circular: false,
					infinite: false,
					responsive: true,
					items: {
						visible: 4,
						minimum: 4,
						width: w
					},
					scroll: {
						items: 2
					},
					auto: {
						play: false
					},
					prev: {
						button: '.smi-prev'
					},
					next: {
						button: '.smi-next'
					},
					pagination: {
						container: '.smi-pagination'
					}
				});
			} else if(winWidth >= 850 && winWidth < 1180) {
				$slider.carouFredSel({
					circular: false,
					infinite: false,
					responsive: true,
					items: {
						visible: 3
					},
					scroll: {
						items: 2
					},
					auto: {
						play: false
					},
					prev: {
						button: '.smi-prev'
					},
					next: {
						button: '.smi-next'
					},
					pagination: {
						container: '.smi-pagination'
					}
				});
			} else if(winWidth >= 690 && winWidth < 850) {
				$slider.carouFredSel({
					circular: false,
					infinite: false,
					responsive: true,
					items: {
						visible: 2
					},
					scroll: {
						items: 2
					},
					auto: {
						play: false
					},
					prev: {
						button: '.smi-prev'
					},
					next: {
						button: '.smi-next'
					},
					pagination: {
						container: '.smi-pagination'
					}
				});
			} else if(winWidth < 690) {
				$slider.carouFredSel({
					circular: false,
					infinite: false,
					responsive: true,
					items: {
						visible: 1
					},
					scroll: {
						items: 1
					},
					auto: {
						play: false
					},
					prev: {
						button: '.smi-prev'
					},
					next: {
						button: '.smi-next'
					},
					pagination: {
						container: '.smi-pagination'
					}
				});
			}
		}
	}
	smiSlider();


	function iconSlider() {
		var winWidth = $(window).width(),
			$slider = $('.icon-slider');

		if($slider.length) {
			if(winWidth <= 690) {
				$slider.carouFredSel({
					circular: false,
					infinite: false,
					responsive: true,
					items: {
						visible: 1
					},
					scroll: {
						items: 1
					},
					auto: {
						play: false
					},
					prev: {
						button: '.icon-slider-prev'
					},
					next: {
						button: '.icon-slider-next'
					}
				});
			} else {
				$slider.trigger('destroy');
			}
		}
	}
	iconSlider();


	$('.new .image a').hover(
		function() {
			$(this).parents('.new').find('.new-content h4 a').addClass('hover');
		},
		function() {
			$(this).parents('.new').find('.new-content h4 a').removeClass('hover');
		}
	);






	$('body').on('click', '.button_delete', function() {
		var $this = $(this),
			$parent = $this.parents('.credit'),
			num = parseFloat( $parent.attr('data-credit') ),
			prev = num - 1;
		$parent.slideUp(500);
		setTimeout(function() {$parent.remove()}, 500)
		$('.credit[data-credit="' + prev + '"]').find('.add-credit').show();
	});


	$('.dropdown-block').children('h3').on('click', function() {
		var $this = $(this),
			$parent = $this.parent(),
			$content = $this.siblings('.content');
		if($content.is(':visible')) {
			$parent.removeClass('open');
			$content.slideUp(300);
		} else {
			$parent.addClass('open');
			$content.slideDown(300);
		}
		setTimeout(function() {
			$parent.removeClass('opened');
		}, 300);
	});

	$('.question', '.faq-item').on('click', function() {
		var $this = $(this),
			$parent = $this.parent(),
			$content = $parent.find('.answer');

		if($content.is(':visible')) {
			$parent.removeClass('open');
			$content.slideUp(300);
		} else {
			$parent.addClass('open');
			$content.slideDown(300);
		}
		setTimeout(function() {
			$parent.removeClass('opened');
		}, 300);
	});


	$('.choose-block').each(function() {
		var $this = $(this),
			min = parseFloat( $this.attr('data-min') ),
			max = parseFloat( $this.attr('data-max') ),
			step = parseFloat( $this.attr('data-step') ),
			value = parseFloat( $this.attr('data-value') ),
			$slider = $this.find('.choose-slider'),
			$form = $this.find('.choose-text'),
			$min = $this.find('.min'),
			$max = $this.find('.max'),
			$parent = $this.parents('form'),
			$footer = $parent.find('footer'),
			$return = $footer.find('.count-first').find('.num'),
			$to = $footer.find('.count-second').find('.num'),
			$month = $footer.find('.count-second').find('big'),
			$bet = $footer.find('.count-third').find('.num'),
			bet = parseFloat( $bet.text() );

		$form.val(value);
		function slideChange(i, elem) {
			var $errors = $this.parents('.chooses').siblings('.errors'),
				choosePrice = $(elem).parent().hasClass('choose-price');
			$form.val(i);
			if(choosePrice) {
				if(i >= 9000) {
					if( ! $errors.find('span').length ) {
						$errors.append('<span style="display: none;">Сумма свыше 9000 рублей доступна для второго займа</span>');
						$errors.find('span').fadeIn(500);
					}
				} else {
					$errors.find('span').remove();
				}
			}
			var price = parseFloat( $parent.find('.choose-price .choose-text').val() ),
				day = parseFloat( $parent.find('.choose-day .choose-text').val() ),
				ret = Math.ceil( price + day * bet ),
				today = new Date();
			today.setDate(today.getDate() + day);
			var days = ['Воскресенье','Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
				months = ['января', 'февраля', 'марта', 'мая','июня', 'июля','августа','сентября','октября','гоября','декабря'],
				m = today.getMonth(),
				d = today.getDate();
			$return.text(ret);
			$to.text(d),
			$month.text(months[m]);
		}

		$slider.slider({
			range: 'min',
			value: min,
			min: min,
			max: max,
			step: step,
			animate: 1100,
			slide: function( event, ui ) {
				slideChange(ui.value, $(this));
			},
			change: function( event, ui ) {
				slideChange(ui.value), $(this);
			},
			create: function( event, ui ) {
				var $this = $(this);
				$this.slider('value', max);
				setTimeout(
					function() {
						var newVal = max / 2;
						$this.slider('value', newVal);
						slideChange(newVal, $this);
					}, 1100
				);
			}
		});
	});

	
	$('.archive-block .btn').on('click', function() {
		var $this = $(this),
			$span = $this.find('span'),
			$li = $this.siblings('.list').find('.full');
		if( $this.hasClass('opened') ) {
			$this.removeClass('opened');
			$li.slideUp();
			$span.text('Подробнее');
		} else {
			$this.addClass('opened');
			$li.slideDown();
			$span.text('Скрыть');
		}
	});

	

	$('.choose-block').on('change', '.choose-text', function() {
		var $this = $(this),
			val = $this.val(),
			$parent = $this.parents('.choose-block');
			$slider = $parent.find('.choose-slider'),
			min = parseFloat( $parent.attr('data-min') ),
			max = parseFloat( $parent.attr('data-max') );
		if(val < min) val = min; $this.val(val);
		if(val > max) val = max; $this.val(val);
		$slider.slider('value', val);

	});




	// Слайдер в партнерах
	$('.partner-slide').each(function() {
		var $this = $(this),
			min = parseFloat( $this.attr('data-min') ),
			max = parseFloat( $this.attr('data-max') ),
			step = parseFloat( $this.attr('data-step') ),
			value = parseFloat( $this.attr('data-value') ),
			$slider = $this.find('.partner-slider'),
			$form = $this.find('.partner-text'),
			$min = $this.find('.min'),
			$max = $this.find('.max');

		$form.val(value);

		$slider.slider({
			range: 'min',
			value: min,
			min: min,
			max: max,
			step: step,
			animate: 1100,
			slide: function( event, ui ) {
				$form.val(ui.value);
			},
			change: function( event, ui ) {
				$form.val(ui.value);
			},
			create: function( event, ui ) {
				var $this = $(this);
				$this.slider('value', max);
				setTimeout(
					function() {
						var newVal = max / 2;
						$this.slider('value', newVal);
						$form.val(newVal);
					}, 1100
				);
			}
		});
	});

	$('.partner-slide').on('change keyup', '.partner-text', function() {
		var $this = $(this),
			val = $this.val(),
			$parent = $this.parents('.partner-slide');
			$slider = $parent.find('.partner-slider'),
			min = parseFloat( $parent.attr('data-min') ),
			max = parseFloat( $parent.attr('data-max') );
		if(val < min) val = min; $this.val(val);
		if(val > max) val = max; $this.val(val);
		$slider.slider('value', val);

	});


	function startHistoryAnimation() {


		$('.history-slider').each(function() {
			var $this = $(this),
				min = parseFloat( $this.attr('data-min') ),
				max = parseFloat( $this.attr('data-max') ),
				step = max / 3,
				value = parseFloat( $this.attr('data-value') ),
				$parent = $this.parents('.history'),
				$creditRating = $parent.find('.credit-rating').find('.rating-content'),
				$creditAvailable = $parent.find('.rating-available'),
				$creditBet = $parent.find('.rating-bet').find('.rating-content'),
				one = 0,
				two = step,
				three = step * 2,
				four = max;
			
			function clearAvailable(i) {
				$creditAvailable.find('li').removeClass('current');
				$creditAvailable.find('li').each(function(n) {
					n++;
					if(n <= i) $(this).addClass('current');
				});
			}

			clearAvailable();

			function changeSlider(i) {
				function startFlipping() {
					var $a = $creditAvailable.find('li');
					$a.hide();
					$a.each(function(i) {
						i++;
						var $el = $(this),
							delay = 150 * i;
						$el.delay(delay).animate({opacity: 'show'}, 150);
					});
					$creditRating.flipping_text({
						tickerTime: 10,
						customRandomChar: "1234567890",
						tickerCount: 15,
						opacityEffect: false,
						resetOnChange: false
					});
					$creditBet.flipping_text({
						tickerTime: 10,
						customRandomChar: "абвгдеёжзгдийклмнопрстуфхцчшщьыъэюя",
						tickerCount: 15,
						opacityEffect: false,
						resetOnChange: false
					});
				}
				if(i >= one && i < two) {
					$parent.find('.rating-bg-2, .rating-bg-3, .rating-bg-4').fadeOut(500);
					$parent.find('.rating-bg-1').fadeIn(500);
					$creditRating.text('0-299');
					clearAvailable(2);
					$creditBet.text('Плохая');
					startFlipping();
				} else if(i >= two && i < three) {
					$parent.find('.rating-bg-1, .rating-bg-3, .rating-bg-4').fadeOut(500);
					$parent.find('.rating-bg-2').fadeIn(500);
					$creditRating.text('200-499');
					clearAvailable(3);
					$creditBet.text('Высокая');
					startFlipping();
				} else if(i >= three && i < four) {
					$parent.find('.rating-bg-1, .rating-bg-2, .rating-bg-4').fadeOut(500);
					$parent.find('.rating-bg-3').fadeIn(500);
					$creditRating.text('500-699');
					clearAvailable(4);
					$creditBet.text('Средняя');
					startFlipping();
				} else if(i >= four && i <= max) {
					$parent.find('.rating-bg-1, .rating-bg-2, .rating-bg-3').fadeOut(500);
					$parent.find('.rating-bg-4').fadeIn(500);
					$creditRating.text('700-900');
					clearAvailable(5);
					$creditBet.text('Низкая');
					startFlipping();
				}
			}

			$this.slider({
				range: 'min',
				value: min,
				min: min,
				max: max,
				step: step,
				animate: 1100,
				create: function( event, ui ) {
					$this.slider('value', max);
					setTimeout(function() {
						$this.slider('value', max / 2);
					},1100);
				},
				change: function( event, ui ) {
					var i = ui.value;
					if(i >= 0 && i <= 199) {
						$parent.find('.rating-bg-1').addClass('visible');
					} else if(i >= 200 && i <= 499) {
						$parent.find('.rating-bg-2').addClass('visible');
					} else if(i >= 500 && i <= 699) {
						$parent.find('.rating-bg-3').addClass('visible');
					} else if(i >= 700 && i <= max) {
						$parent.find('.rating-bg-4').addClass('visible');
					}
					changeSlider(i);
				},
				slide: function( event, ui ) {
					changeSlider(ui.value);
				}
			});
		});
	}

	$(window).on('scroll', function() {
		var $graph = $('.history');
		if($graph.length) {
			var top = $graph.offset().top - $graph.height();
			if( $(this).scrollTop() > top ) {
				if( ! $graph.hasClass('animated') ) startHistoryAnimation();
				$graph.addClass('animated');
			}
		}
	});


	function grapBlocksWidth() {
		$('.graph').each(function() {
			var $this = $(this),
				$bonuses = $this.find('.graph-bonuses'),
				$blocks = $this.find('.graph-blocks'),
				$block = $blocks.find('.graph-tab'),
				num = $block.length,
				width = $block.width();
			$blocks.width(num * width);
		});
	}
	grapBlocksWidth();
	


	var $graphBonuses = $('.graph-bonuses');

	$graphBonuses.each(function() {
		var $this = $(this);
		$this.after('<div class="graph-select"><div class="line"><div class="form-block"><select></select></div></div></div>')
			.find('.graph-bonus').each(function() {
				var $bonus = $(this),
					current = $bonus.hasClass('current'),
					title = $bonus.find('h4').text(),
					description = $bonus.find('span').html(),
					$block = $this.siblings('.graph-select').find('.line'),
					$select = $block.find('select');
				if(current) {
					$select.append('<option selected>' + title + '</option>');
					$block.append('<p class="current">' + description + '</p>');
				} else {
					$select.append('<option>' + title + '</option>');
					$block.append('<p>' + description + '</p>');
				}
			});
		$this.siblings('.graph-select').find('select').styler();
		$('.graph-slider').slider({
			range: 'min',
			value: 1,
			min: 1,
			max: 28,
			step: 1,
			animate: 1100,
			create: function( event, ui ) {
				var $this = $(this);
				$this.slider('value', 28);
				setTimeout(
					function() {
						$this.slider('value', 14);
					}, 1100
				);
			},
			stop: function() {
				$('.graph-calc .text').flipping_text({
					tickerTime: 10,
					customRandomChar: "1234567890",
					tickerCount: 10,
					opacityEffect: false,
					resetOnChange: true
				});
			}
		});
	});

	$graphBonuses.siblings('.graph-select').on('change', 'select', function() {
		var $this = $(this),
			index = $this.find('option:selected').index();
		$this.parents('.form-block').siblings('p:eq(' + index + ')').addClass('current').siblings('p').removeClass('current');
		$this.parents('.graph-select').siblings('.graph-blocks-container').find('.graph-tab:eq(' + index + ')').addClass('current').siblings().removeClass('current');
		graphBenefit();
		
	});

	$graphBonuses.on('click', '.graph-bonus:not(.active)', function() {
		var $this = $(this),
			$parent = $this.parents('.graph'),
			$bonuses = $parent.find('.graph-bonuses'),
			$bonus = $bonuses.find('.graph-bonus'),
			$blocks = $parent.find('.graph-blocks'),
			$block = $blocks.find('.graph-tab'),
			index = $this.index(),
			width = $block.width(),
			$list = $parent.find('.graph-bonus-list'),
			blockWidth = countWidth($bonus, false),
			blockMargin = index  * blockWidth * -1;
			if(blockMargin != 0) blockMargin += 260;
		$blocks.animate({
			'margin-left': index  * width * -1
		});
		$list.animate({
			'margin-left': blockMargin
		});
		$this.addClass('current').siblings().removeClass('current');
		graphBenefit();
	});

	$('.graph-bonus-list').each(function() {
		var $this = $(this),
			$bonus = $this.find('.graph-bonus'),
			width = 0;
		$bonus.each(function() {
			width += countWidth($(this), false);
		});
		$this.width(width);
	});


	$('.oferta-text').each(function() {
		var $this = $(this),
			$scroll = $this.find('.oferta-text-scroll');
		if($this.is(':visible')) $scroll.jScrollPane();
	});

	$('.oferta-link').on('click', function() {
		var $this = $(this),
			$text = $this.parents('.oferta-line').find('.oferta-text'),
			$scroll = $text.find('.oferta-text-scroll');
		console.log($text);
		if( $text.is(':visible') ) {
			$text.slideUp(300);
		} else {
			$text.slideDown(300);
			setTimeout(function() {
				$scroll.jScrollPane();
			}, 300);
		}
		return false;
	});

	$('.btn-next-final').on('click', function() {
		$('.oferta-confirm').slideDown();
		return false;
	});

	$('.toggle-form').on('change', 'input[type="radio"]', function() {
		var $this = $(this),
			link = $this.attr('type-link'),
			id = $this.attr('type-id');
		$this.parents('label').addClass('current')
			.siblings('label').removeClass('current')
			.siblings('.toggler').attr('id', id)
			.parents('form').attr('action', link)
			.find('.btn').attr('href', link);
	});


	$('.oferta-line').on('change', 'input[type="checkbox"]', function() {
		var $this = $(this),
			$parent = $this.parents('.oferta'),
			$checkboxs = $parent.find('input[type="checkbox"]'),
			checked = true,
			$hide = $parent.siblings('.oferta-hide');
		$checkboxs.each(function() {
			if( ! $(this).is(':checked') ) checked = false;
		});
		if(checked == true) {
			$hide.slideDown().find('.form-text').focus();
		} else {
			$hide.slideUp();
		}
	})


	$('.testimonial').hover(
		function() {
			$(this).find('.testimonial-hover').fadeIn();
		},
		function() {
			$(this).find('.testimonial-hover').fadeOut();
		}
	).on('click', function() {
		var $popup = $('.testimonial-popup');
		$popup.fadeIn();
		$popup.jScrollPane();
		$popup.find('.close').remove();
		$popup.append('<div class="close"></div>');
		$popup.siblings('.testimonial__nav').fadeIn();
	});

	$('.testimonial-popup').on('click', '.close', function() {
		$(this).parents('.testimonial-popup').fadeOut().siblings('.testimonial__nav').fadeOut();
	});



	radioSelect();

	$('body').on('change', '.radio-select input[type="radio"]', function(){ 
		var $this = $(this),
			value = $this.parents('.radioblock').children('span').text(),
			$select = $this.parents('.radio-select').find('select');
		$select.find('option').each(function() {
			var $option = $(this);
			if( $option.val() == value ) {
				$option.prop('selected', true);
				setTimeout(function() {
					$select.trigger('refresh');
				}, 1);
			}
			hasCreditDelay();
		});
	});

	$('body').on('change', '.radio-select select', function() {
		var $this = $(this),
			value = $this.val(),
			$parent =  $this.parents('.radio-select');
		$parent.find('input[type="radio"]').each(function() {
			var $input = $(this);
			if( $input.parents('.radioblock').children('span').text() == value ) {
				$input.prop('checked', true);
			} else {
				$input.prop('checked', false);
			}
			setTimeout(function() {
				$input.trigger('refresh');
			}, 1)
		});
		hasCreditDelay();
	});

	


	$('.top-area-link').on('click', function() {
		var $this= $(this),
			id = $this.attr('data-id'),
			$container = $('.top-area-container'),
			$area = $('.top-area[data-id="' + id + '"]'),
			$link = $('.top-area-link[data-id="' + id + '"]'),
			visible = $area.is(':visible');
		if(! $container.is(':visible')) $container.slideDown();
		$('.top-area').css('display', 'none');
		$('.top-area-link').removeClass('current');
		if(visible) {
			closeTopArea();
		} else {
			$area.fadeIn();
			$link.addClass('current');
			$('html, body').stop().animate({scrollTop: 0}, 1000);
		}
		closeBurger(true);
		return false;
	});

	function closeTopArea() {
		$('.top-area-container').slideUp();
		$('.top-area').hide();
		$('.top-area-link').removeClass('current');
	}

	$('.top-area').on('click', '.close', closeTopArea);

	$(document).click(function(event) {
		if ($(event.target).closest('.top-area-container').length) return;
		closeTopArea()
		event.stopPropagation();
	});

	$(window).on('scroll', function() {
		var $container = $('.top-area-container'),
			top = $(window).scrollTop(),
			height = $container.height();
		
		if( $container.is(':visible') ) {
			if(top >= height) closeTopArea();
		}
	});



	function startPageAnimation() {
		var $start = $('.start'),
			$startInner = $start.find('.inner'),
			startInnerBg = $startInner.css('background-image'),
			startHeight = countHeight( $start.find('.app') ) + countHeight( $start.find('.advantages')),
			$h1 = $start.find('h1');

		$startInner.css('background-image', 'none');
		$start.find('.header, h1, .app, .advantages, .start-bg').css('display', 'none');
		$start.find('h1 span, h1 strong, .app, .scroll, .advantage').css('opacity', 0);
		$start.find('h1 span').css('font-size', 54);

		$start.find('.start-bg').fadeIn(800);
		$h1.show(0);
		$start.find('h1 span').delay(400).animate({opacity: 0.7}, 600);
		$start.find('h1 strong').delay(1000).animate({opacity: 1}, 1000);
		$start.find('h1 span').delay(2000).animate({'font-size': 18}, 1000);
		$h1.after('<div class="invisible"></div>');
		$start.find('.header').delay(3600).animate({'height': 'show'}, 390);
		$h1.siblings('.invisible').delay(3000).animate({
			'height': startHeight
		}, 1000)
		setTimeout(
			function() {
				$start.find('.app, .advantages').show();
				$start.find('.invisible').remove();
			}, 4000
		);
		$start.find('.app').delay(4100).animate({'opacity': 1}, 1000);

		$start.find('.advantage:eq(0)').delay(5000).animate({'opacity': 1}, 350);
		$start.find('.advantage:eq(1)').delay(5350).animate({'opacity': 1}, 350);
		$start.find('.advantage:eq(2)').delay(5700).animate({'opacity': 1}, 350);
		$start.find('.scroll').delay(6050).animate({'opacity': 1}, 350);
	}
	//startPageAnimation();


	var $graph = $('.graph');
	
	function graphHeight() {
		$graph.css('height', 'auto');
		//$graph.height( $graph.height() );
	}
	graphHeight();

	$graph.find('.graph-calc h4, .graph-calc span').each(function() {
		$(this).width( $(this).width() );
	});
	$graph.find('.graph-point').addClass('invisible');
	$graph.find('.graph-image, .graph-bottom, .graph-calc h4, .graph-calc .text').hide();

	$('.graph-col').on('click mouseover', function() {
		var $this = $(this),
			first = $this.attr('data-first'),
			second = $this.attr('data-second'),
			third = $this.attr('data-third');
		if( ! $this.hasClass('current') ) {
			$this.addClass('current').siblings().removeClass('current');
		}
		$('.graph-point__first').find('.text').text(first);
		$('.graph-point__second').find('.text').text(second);
		$('.graph-point__third').find('.text').text(third);
		$('.graph-calc .text').flipping_text({
			tickerTime: 10,
			customRandomChar: "1234567890",
			tickerCount: 10,
			opacityEffect: true,
			resetOnChange: true
		});
	});

	


	function startGraphAnimation() {
		var $graph = $('.graph');
		$graph.find('.graph-bottom').fadeIn(500);
		$graph.find('.graph-image').animate({
			'opacity': 'show',
			'margin-left': -50,
		}, 500).animate({
			'margin-left': 0,
		}, 300);

		$graph.find('.graph-calc h4').each(function(i) {
			var $this = $(this);
			$this.fadeIn(300);
		});

		setTimeout(function() {
			$graph.find('.graph-point').removeClass('invisible');
		},1200)

		$graph.find('.graph-calc .text').each(function(i) {
			var $this = $(this),
				delay = 1200 + (i * 500);
			setTimeout(function() {
				$this.show();
				$this.flipping_text({
					tickerTime: 10,
					customRandomChar: "1234567890",
					tickerCount: 10,
					opacityEffect: true,
					resetOnChange: false
				});
			}, delay);
		});
	}

	$('.form-hint-visible').on('focus', function() {
		var $hint = $(this).siblings('.hint').find('.hint-text');
		if(! $hint.hasClass('visible') ) $hint.fadeIn(300);
		setTimeout(function() {
			$hint.addClass('visible');
		}, 300);
	});
	$('.form-hint-visible').on('blur', function() {
		var $hint = $(this).siblings('.hint').find('.hint-text');
		if( $hint.hasClass('visible') ) $hint.fadeOut(300);
		setTimeout(function() {
			$hint.removeClass('visible');
		}, 300);
	})


	$(window).on('scroll', function() {
		var $graph = $('.graph');
		if($graph.length) {
			var top = $graph.find('.graph-blocks-container').offset().top - $graph.height() - 350;
			if( $(this).scrollTop() > top ) {
				if( ! $graph.hasClass('animated') ) startGraphAnimation();
				$graph.addClass('animated');
			}
		}
	});

	$rec = $('.reccomend:first');
	$('.reccomend:first').find('.reccomend-text').css('opacity', 0);

	function startReviewAnimation() {
		$('.reccomend:first').find('.reccomend-text').css('opacity', 1);
	}


	$(window).on('scroll', function() {
		var $graph = $('.recommendations');
		if($graph.length) {
			var top = $graph.offset().top - $graph.height();
			if( $(this).scrollTop() > top ) {
				if( ! $graph.hasClass('animated') ) startReviewAnimation();
				$graph.addClass('animated');
			}
		}
	});

	function alignProfileHeight() {
		var $body = $('body'),
			$block = $body.find('.profile-height');
		$block.css('height', 'auto');
		if($(window).height() > $body.height()) $block.height( $(window).height() - $body.height());
	}
	alignProfileHeight();
	setTimeout(alignProfileHeight, 100);
	setTimeout(alignProfileHeight, 150);
	setTimeout(alignProfileHeight, 200);

	function alignPage() {
		var $body = $('body'),
			$window = $(window),
			hb = $body.height(),
			hw = $window.height();
		if(hb < hw) {
			$('.footer').before('<div class="height-align"></div>');
			$body.find('.height-align').height(hw-hb-91);
		}
	}
	alignPage();


	function resizeProfileContainer() {
		$('.profile-container').each(function() {
			var $this = $(this),
				$rotation = $this.find('.profile-rotation'),
				num = $rotation.length,
				width = $rotation.width();
			$this.height( $('.profile-rotation.current').height() + 12).width(num * width);
		});
	}
	resizeProfileContainer();
	
		


	$('.rotation-nav-btn, .rotation-dots').on('click', function() {
		var $this = $(this),
			$rotation = $('.profile-rotation'),
			current = parseFloat( $('.profile-rotation.current').attr('data-num') ),
			num = $rotation.length - 1;
			type = '',
			next = 0,
			$container = $('.profile-container');
		if($this.hasClass('rotation-left') || $this.hasClass('rotation-dots-left')) {
			type = 'prev';
		} else {
			type = 'next';
		}
		function changeNav(active) {
			var next = active + 1,
				prev = active - 1,
				$prev = $('.rotation-left span'),
				$next = $('.rotation-right span');
			if(next > num) next = 0;
			if(prev < 0) prev = num;
			var nextText = $('.profile-rotation[data-num="' + next + '"]').attr('data-title'),
				prevText = $('.profile-rotation[data-num="' + prev + '"]').attr('data-title');
			$next.text(nextText);
			$prev.text(prevText);
		}
		if(type == 'next') {
			next = current + 1;
			if(next > num) next = 0;
			$('.profile-rotation[data-num="' + next + '"]').addClass('current')
				.siblings('.profile-rotation').removeClass('current');
			$container.height('auto').animate({'left': next * 1170 * -1, height: $('.profile-rotation.current').height()}, 300);
			setTimeout(function() {
				alignProfileHeight();
			}, 300);
			changeNav(next);
		}
		if(type == 'prev') {
			prev = current - 1;
			if(prev < 0) prev = num;
			$('.profile-rotation[data-num="' + prev + '"]').addClass('current')
				.siblings('.profile-rotation').removeClass('current');
			$container.height('auto').animate({'left': prev * 1170 * -1, height: $('.profile-rotation.current').height()}, 300);
			setTimeout(function() {
				alignProfileHeight();
			}, 300);
			changeNav(prev);
		}
		alignProfileHeight();
		setTimeout(function() {
			$rotation.find('select').trigger('refresh');
		}, 1)
 	});


	


	

	function startTestimonialAnimation() {
		$('.testimonials').find('.saver').delay(2000).fadeOut(1000);
	}

	$(window).on('scroll', function() {
		var $graph = $('.testimonials');
		if( $graph.length ) {
			var top = $graph.offset().top - $graph.height() + ($(window).height() / 2);
			if( $(this).scrollTop() > top ) {
				if( ! $graph.hasClass('animated') ) startTestimonialAnimation();
				$graph.addClass('animated');
			}
		}
	});



	
	$('.reccomend-thumb').on('click', function() {
		var $this = $(this),
			num = $this.index();
		$('.recoomends').trigger('slideTo', [num, 0, true]);
	});

	$('.start .scroll').on('click', function() {
		$('html, body').stop().animate({
			scrollTop: $('.start').height()
		}, 1000);
	});


	function paneMenu() {
		var $menu = $('body').find('.dropdown-menu'),
			api = $menu.data('jsp');

		if( $menu.hasClass('opn') ) {
			if( $menu.hasClass('jspScrollable') ) {
				api.reinitialise();
			} else {
				$menu.jScrollPane();
			}
		}
	}
	
	

	$('.nav-link').on('click', function() {
		var $this = $(this),
			$menu = $('.dropdown-menu');
		$menu.animate({left: 0}, 500).addClass('opn');
		$('body').append('<div class="overlay"></div>');
		setTimeout(function() {
			paneMenu();
		}, 500);
		closeTopArea();
	});

	$('.dropdown-close').on('click', closeBurger);
	$('.dropdown-menu').on('click', 'a', closeBurger);

	function closeBurger() {
		var $menu = $('html').find('.dropdown-menu');
		$menu.removeClass('opn').animate({left: -388}, 500);
		paneMenu();		
		var $o = $('body').find('.overlay');
		$o.css('opacity', 0);
		setTimeout(function() {
			$o.remove();
		}, 300);

	}





	function reccomendSlider() {
		var $reccomend = $('.recoomends');
		$reccomend.each(function () {
			var $this = $(this),
				$thumbs = $this.parents('.reccomendations-slider').siblings('.reccomendations-thumbs');
			if ($this.length) {
				// Инициализируем слайдер
				$this.carouFredSel({
					circular: false,
					infinite: false,
					
					onCreate: function() {
						$this.trigger('slideTo', [0, 0, true]);
					},
					items: {
						visible: 1
					},
					auto: {
						play: false
					},
					next: {
						button: '.reccomend-next',
						key: 'right'
					},
					prev: {
						button: '.reccomend-prev',
						key: 'left'
					},
					scroll: {
						onBefore: function () {
							// Двигаем превьюшки
							var i = $(this).triggerHandler('currentPosition');
							$thumbs.find('.reccomend-thumb').removeClass('current');
							$thumbs.find('.reccomend-thumb:eq(' + i + ')').addClass('current');
						}
					}
				});
				$thumbs.find('.reccomend-thumb:first').addClass('current');
			}

		});
	}
	reccomendSlider();

	function resizeReccomendSlider() {
		var $reccomend = $('.recoomends');
		$reccomend.trigger('destroy');
		reccomendSlider();
	}

	$('.profile-edit-menu').on('click', 'li:not(.current) a', function() {
		var $this = $(this).parent('li');
		$this.addClass('current').siblings().removeClass('current')
			.parents('.application-form').find('.profile-edit-tab').eq( $this.index() )
			.slideDown().siblings('.profile-edit-tab').slideUp();
		return false;
	});



	resizeStart();

	


	window.onresize = function() {
		resizeSteps();
		resizeStart();
		resizeTestimonial();
		useSticky();
		graphHeight();
		grapBlocksWidth();
		resizeReccomendSlider();
		alignProfileHeight();
		resizeTabs();
		smiSlider();
		iconSlider();
		resizeTariff();
		graphBenefit();
		paneMenu();
		resizeProfileContainer();
	}

// end
});




function initDatepicker() {
	$('.datepicker .form-text').datepicker({
		changeMonth: false,
		changeYear: false,
		showOtherMonths: true,
		selectOtherMonths: true,
		dateFormat: 'dd.mm.yy',
		showOn: 'both',
		firstDay: 1,
		showOptions: {
			direction: 'up'
		},
		beforeShow: function() {
			$(this).parent().addClass('selected');
		},
		onClose: function() {
			$(this).parent().removeClass('selected');
		}
	});
}


function selectPaymentType() {
	$('.payment-type-select').each(function() {
		var $this = $(this),
			type = $this.val(),
			$parent = $this.parents('.form-block');
		$parent.siblings('.payment-type').each(function() {
			if( $(this).attr('data-payment') == type ) {
				$(this).slideDown().siblings('.payment-type').slideUp();
			}
		});
	});
}

function hasSms() {
	$('.form-oferta').each(function() {
		var $this = $(this),
			$list = $this.siblings('.form-sms');
		if( $this.find('input[type="checkbox"]').is(':checked') ) {
			$list.slideDown();
		} else {
			$list.slideUp();
		}
	});
}


function hasCreditClosed() {
	$('.credit-closed').each(function() {
		var $this = $(this),
			$list = $this.siblings('.form-credit-list');
		if( $this.find('input[type="checkbox"]').is(':checked') ) {
			$list.slideUp();
		} else {
			$list.slideDown();
		}
	});
}


function hasCreditDelay() {
	$('body').find('.has-credit-delay').each(function() {
		var $this = $(this),
			$select = $this.siblings('.credit-delay-select');
		if( $this.find('input[type="radio"]:checked').val() == 'true' ) {
			$select.slideDown();
		} else {
			$select.slideUp();
		}
	});
}


function initRadiobox() {
	$('.radiobox').each(function() {
		var $this = $(this);
		$this.find('input[type="radio"]:checked').parents('label').addClass('checked')
			.siblings().removeClass('checked').find('input[type="radio"]:checked').prop('checked', false);
	});
}
function changeRadiobox( elem ) {
	var $this = $(elem);
	if( $this.is(':checked') ) {
		$this.parents('label').addClass('checked')
			.siblings().removeClass('checked').find('input[type="radio"]:checked').prop('checked', false);
	}
}

function resizeStart() {
	var $all = $('.start, .start .outer, .start .inner');
	if($(window).width() > 1180) {
		var heightAll = countHeight( $('.start') ),
			heightWindow = $(window).height();
		if(heightWindow > heightAll) {
			$all.height(heightWindow);
		} else {
			$all.height(heightAll);
		}
	}
}

function countHeight(elem) {
	var $elem = $(elem),
		height = $elem.height();
	height += parseFloat( $elem.css('padding-top') );
	height += parseFloat( $elem.css('padding-bottom') );
	height += parseFloat( $elem.css('margin-top') );
	height += parseFloat( $elem.css('margin-bottom') );
	return height;
}
function countWidth(elem, padding) {
	var $elem = $(elem),
		width = $elem.width();
	if(padding == true) {
		width += parseFloat( $elem.css('padding-left') );
		width += parseFloat( $elem.css('padding-right') );
	}
	width += parseFloat( $elem.css('margin-left') );
	width += parseFloat( $elem.css('margin-right') );
	return width;
}


function resizeTestimonial() {
	var $item = $('.testimonial'),
		width = $(window).width() / 3;
	$item.width( width );
	$item.height( $(window).height() / 2 );
	$item.find('.testimonial-image').width( width ).height( $(window).height() / 2 );
	$('.saver-column').width(width);
	$('.saver-column__1').css('left', 0);
	$('.saver-column__2').css('left', width);
	$('.saver-column__3').css('left', width*2);
	$('.testimonial-popup').width(width*2);
}


function radioSelect() {
	$('.radio-select').each(function() {
		var $this = $(this);
		$this.append('<select></select>');
		var $select = $this.find('select');
		$this.find('input[type="radio"]').each(function() {
			var $input = $(this),
				value = $input.parents('.radioblock').children('span').text();
			$select.append('<option>' + value + '</option>')
		});
		$select.styler();
		changeRadioSelect( $this );
	});
}

function changeRadioSelect(elem) {
	var $elem = $(elem);

	$elem.find('input[type="radio"]:checked').each(function() {
		var $this = $(this),
			value = $this.parents('.radioblock').children('span').text(),
			$select = $this.parents('.radio-select').find('select');
		$select.find('option').each(function() {
			var $option = $(this);
			if( $option.val() == value ) {
				$option.prop('selected', true);
				setTimeout(function() {
					$select.trigger('refresh');
				}, 1)
			}
		});
	})
}




	
function registerClickInformation(){
	$('.center-container h3.js').on('click', function(){
		var $this = $(this),
			$switch = $('.information .inline-block .switch'),
			$first = $('.instruction-block-first'),
			$second = $('.instruction-block-second');
		$('.center-container h3.js').addClass('non-active');
		$this.removeClass('non-active');
		if($this.attr('data-side')=='left') {
			$switch.animate({'left': '2px'}, 300);
			$first.slideDown();
			$second.slideUp();
		}
		else {
			$switch.animate({'left': '48px'}, 300);
			$first.slideUp();
			$second.slideDown();
		}
	});	
}
