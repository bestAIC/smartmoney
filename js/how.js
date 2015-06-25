$(document).ready(function() {
// start
	showHidden();
	registerClickInformation();
// end
});

function showHidden() {
		$('.all-one-container-tariff .one-container-tariff').mouseover(function(){
			var id = $(this).attr('data-id');
			$('.one-container-tariff .container-tariff[data-id="'+id+'"]').css('border', 'none');
			$('.one-container-tariff .container-tariff[data-id="'+id+'"] span.js').css('display', 'block');
			$('.one-container-tariff .container-tariff[data-id="'+id+'"] a.js').css('display', 'block');
		});
		$('.all-one-container-tariff .one-container-tariff').mouseout(function(){
			var id = $(this).attr('data-id');
			$('.one-container-tariff .container-tariff[data-id="'+id+'"]').attr('style', 'border: 3px solid #f2f4f7;');
			$('.one-container-tariff .container-tariff[data-id="'+id+'"] span.js').css('display', 'none');
			$('.one-container-tariff .container-tariff[data-id="'+id+'"] a.js').css('display', 'none');
		});
	}
	
function registerClickInformation(){
	$('.center-container h3.js').click(function(){
		$('.center-container h3.js').addClass('non-active');
		$(this).removeClass('non-active');
		if($(this).attr('data-side')=='left')
		{
			$('section.information div.inline-block span.switch').animate({'left': '2px'}, 500);
			$("section.information .picture-hidden").animate({"width": "0px"}, 800);
		}
		else
		{
			$('section.information div.inline-block span.switch').animate({'left': '48px'}, 500);
			$("section.information .picture-hidden").animate({"width": "950px"}, 800);

		}
	});
	
}