

$(function (){
	// 切换搜索框
	(function (){
		var aLi = $('#menu li');
		var oText = $('#search').find('.form .text');
		var arrText = [
			'例如：南京',
			'例如：上海',
			'例如：万达',
			'例如：苏州',
			'例如：杭州'
		];
		var iNow = 0;
		
		oText.val(arrText[iNow]);
		
		aLi.each(function ( index ){
			$(this).click(function (){
				aLi.attr('class', 'gradient');
				$(this).attr('class', 'active');
				
				iNow = index;
				
				oText.val(arrText[iNow]);
			});
		});
		
		oText.focus(function (){
			if( $(this).val() == arrText[iNow] ) {
				$(this).val('');
			}
		});
		oText.blur(function (){
			if( $(this).val() == '' ) {
				oText.val(arrText[iNow]);
			}
		});
	})();
	
	// update文字弹性滑动
	(function (){
		var oDiv = $('.update');
		var oUl = oDiv.find('ul');
		var iH = 0;
		var arrData = [
			{ 'name':'小心', 'time':4, 'title':'xxxccc', 'url':'#' },
			{ 'name':'心畅', 'time':5, 'title':'mmmmmmm', 'url':'#' },
			{ 'name':'小萱', 'time':6, 'title':'vvvvvv', 'url':'#' },
			{ 'name':'小畅', 'time':7, 'title':'vvvv', 'url':'#' },
			{ 'name':'信心', 'time':8, 'title':'bbbbbbb', 'url':'#' },
			{ 'name':'心心', 'time':9, 'title':'vvvv', 'url':'http:#' },
			{ 'name':'欣欣', 'time':10, 'title':'rrr', 'url':'http:#' },
			{ 'name':'鑫鑫', 'time':11, 'title':'gggggggggggg', 'url':'#' }
		];
		var str = '';
		var oBtnUp = $('#updateUpBtn');
		var oBtnDown = $('#updateDownBtn');
		var iNow = 0;
		var timer = null;
		
		for ( var i=0; i<arrData.length; i++ ) {
			str += '<li><a href="'+ arrData[i].url +'"><strong>'+ arrData[i].name +'</strong> <span>'+ arrData[i].time +'分钟前</span> 写了一篇新文章：'+ arrData[i].title +'…</a></li>';
		}
		oUl.html( str );
		
		iH = oUl.find('li').height();

		oBtnUp.click(function (){
			doMove(-1);
		});
		oBtnDown.click(function (){
			doMove(1);
		});
		
		oDiv.hover(function (){
			clearInterval( timer );
		}, autoPlay);
		
		function autoPlay() {
			timer = setInterval(function () {
				doMove(-1);
			}, 3500);
		}
		autoPlay();
		
		function doMove( num ) {
			iNow += num;
			if ( Math.abs(iNow) > arrData.length-1 ) {
				iNow = 0;
			}
			if ( iNow > 0 ) {
				iNow = -(arrData.length-1);
			}
			oUl.stop().animate({ 'top': iH*iNow }, 2200, 'elasticOut');
		}
	})();
	
	// options 选项卡切换
	(function (){
		
		fnTab( $('.tabNav1'), $('.tabCon1'), 'click' );
		fnTab( $('.tabNav2'), $('.tabCon2'), 'click' );
		fnTab( $('.tabNav3'), $('.tabCon3'), 'mouseover' );
		fnTab( $('.tabNav4'), $('.tabCon4'), 'mouseover' );
		
		function fnTab( oNav, aCon, sEvent ) {
			var aElem = oNav.children();
			aCon.hide().eq(0).show();
			
			aElem.each(function (index){
				
				$(this).on(sEvent, function (){
					aElem.removeClass('active').addClass('gradient');
					$(this).removeClass('gradient').addClass('active');
					aElem.find('a').attr('class', 'triangle_down_gray');
					$(this).find('a').attr('class', 'triangle_down_red');
					
					aCon.hide().eq( index ).show();
				});
				
			});
		}
	})();
	
	// 自动播放的焦点图
	(function (){
		var oDiv = $('#fade');
		var aUlLi = oDiv.find('ul li');
		var aOlLi = oDiv.find('ol li');
		var oP = oDiv.find('p');
		var arr = [ '这是第一张图', '这是第二张图', '这是第三张图' ];
		var iNow = 0;
		var timer = null;
		
		fnFade();
		
		aOlLi.click(function (){
			iNow = $(this).index();
			fnFade();
		});
		oDiv.hover(function (){ clearInterval(timer); }, autoPlay);
		
		function autoPlay() {
			timer = setInterval(function () {
				iNow++;
				iNow%=arr.length;
				fnFade();
			}, 2000);
		}
		autoPlay();
		
		function fnFade() {
			aUlLi.each(function (i){
				if ( i != iNow ) {
					aUlLi.eq(i).fadeOut().css('zIndex', 1);
					aOlLi.eq(i).removeClass('active');

				} else {
					aUlLi.eq(i).fadeIn().css('zIndex', 2);
					aOlLi.eq(i).addClass('active');
				}
			});
			oP.text(arr[iNow]);
		}
	})();	
});