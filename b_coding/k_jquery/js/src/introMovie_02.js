//introMovie_02.js
//일정시간 지나면 여러개 이미지 변하게 만들기

//슬쩍 지나가는 이야기
//내가 쓴 js파일을 인터넷에 노출시키고 싶지 않으면, 아래와 같이 한다.
//단, ie에서는 아예 동작  안함
// @import * as jQuery from "../js/base/jquery-3.5.1.min.js";
// @import * as jQuery from "../js/base/jquery-ui.min.js";


(function($){
	// jQuery 시작 

$('#wrap').height('10000px');
var imgArea = $('.img_area');
var imgLen = 112;
var imgUrl;


for(var i = 0; i < imgLen ; i++){
	imgUrl = '../img/introMovie/introMovie_' + ( i + 1 );
	imgArea.append('<img src="' + imgUrl + '.png" alt="내용입력"></img>');
}

imgArea.find('img').css({display:'none', width: '100%', position:'relative', top: '50%', transform:'translateY(-50%)'})
imgArea.find('img').eq(0).show();
imgArea.css({overflow:'hidden'});

var j = 0, intervalImg;
var setIntervalImg = function(){
	intervalImg = setInterval(function(){
		j+=1;
		// console.log(j);
		imgArea.find('img').eq(j).show();
		imgArea.find('img').eq(j).siblings().hide();

		if( j >= imgLen ){
			clearInterval( intervalImg );
		}
	},25);
};

// setIntervalImg();
$(window).on('scroll',function(){
	var st = $(this).scrollTop();
	if(st > 50){
		setIntervalImg();
	}
});



// 글자 애니메이션

var win = $(window);
var winH = win.outerHeight();
var splitText_01 = $('.split_text_01');
var stT01_Img = splitText_01.find('img');
var spT01Offset = splitText_01.offset().top;

stT01_Img.css({position:'absolute',top:0, left:0, width:'100%', height:'auto'});
	var imgP = [];
	for(var k=0; k < 42; k++){		imgP[k] = -378 * k;	}
	var l=0;
	var Go= {};
	var Got = true;
	function SetI(){
		if(Got){
			Got = false;
			Go = setInterval(function(){
						l += 1;
						stT01_Img.css({top:imgP[l]});
						if(l > 42) { clearInterval(Go); }
							// console.log(l)
						}, 30);				
		}
	};

	win.on('scroll', function(e){
		var st = $(this).scrollTop();
		if(st + (winH/2) >= spT01Offset){
			SetI();
		}else if(st < winH/2){
			clearInterval(Go);
			l=0;
			stT01_Img.css({top:imgP[l]});
			Got = true;
		}
	});



// 행/열 방식으로 이미지를 배치한 경우

// x,y값에 따른 배치
var arr2 = [ [], [] ];  
// x값 위치(가로 429px 간격)
for(var i=0; i<4; i++){	arr2[0][i] = 429 * -i;  }

// y값 위치(세로 378px 간격)
for(var j=0; j<11; j++){ arr2[1][j] = 378 * -j;  }

var split_text_02 = $('.split_text_02');
var splitText02Img = split_text_02.find('img');

var splitText02_offset = split_text_02.offset().top;

var s2 = (arr2[0].length * arr2[1].length) -2;

var count = 0;
 
var scroll2Bool = true;
var scroll2Go;

var Set2Interval = function(){
	if(scroll2Bool){
		scroll2Bool = false;
		scroll2Go = setInterval(function(){
			var l = parseInt(count / 4);
			var l2 = parseInt(count % 4);
			count += 1;
			// 나누기 4를 통해 몫과, 나머지값을 구하고, 
			// 나머지값을 이용하여 x값의 위치를 처리 후
			// 몫의 값을 이용하여  y값의 위치를 처리
			// console.log(l2, l);
			splitText02Img.css({left:arr2[0][l2] + 'px', top:arr2[1][l] + 'px'});
			if(count >= s2){	clearInterval(scroll2Go);		}
		}, 30);
	}
};



win.on('scroll', function(){
	var thisScroll = win.scrollTop();
	var thisScrollPlus = thisScroll + (winH/3*2);
	if(thisScrollPlus > splitText02_offset){

		Set2Interval();

	}else if( (thisScroll-1000) < splitText02_offset ){

		clearInterval(scroll2Go);
		count = 0;
		splitText02Img.css({
			left: arr2[0][0] + 'px',
			top: arr2[1][0] + 'px'
		});
		scroll2Bool = true;

	}

});








	// jQuery 종료
})(jQuery);