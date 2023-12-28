var mIdx;

jQuery(function($){
	var $headerObj = $('.GnbBg'),
		$gnbObj = $('.Gnb'),
		$gnbLiObj = $('.Gnb li'),
		$gnbDepth2 = $('#GnbWrap .Gnb .depth2'),
		$gnbDepth2Cont = $('#GnbWrap .Gnb_Visual'),
		min_height = 60,
		max_height = 360;

	$gnbLiObj.bind('mouseenter focusin', gnb_on);
	$headerObj.bind('mouseleave', gnb_off);
	$gnbObj.bind('focusout', gnb_off);

	function gnb_on(){		
		$headerObj.stop().css('background', 'url(/datavoucher/images/dvpms/gnb_menu_bg.png) no-repeat top center #074097').animate({'height' : max_height}, 265);
		$gnbDepth2.show();
		$gnbDepth2Cont.show();
	}
	
	function gnb_off(){ 		
		$headerObj.stop().animate({'height' : min_height}, 500, function(){ 
			$(this).css('background', 'none'); 
			$gnbDepth2.hide();
			$gnbDepth2Cont.hide();
		});
	}
});



function More(){
	document.getElementById("MoreBtn").style.display = "none";
	document.getElementById("SearchArea").style.display = "block";
	//$("#Contents").addClass("Contents_Wide");
}

function Result1(){
	document.getElementById("Contents2").style.display = "none";
	document.getElementById("Contents1").style.display = "block";
	$(".TabType1 a").addClass("On");
	$(".TabType2 a").removeClass("On");
}
function Result2(){
	document.getElementById("Contents2").style.display = "block";
	document.getElementById("Contents1").style.display = "none";
	$(".TabType1 a").removeClass("On");
	$(".Index_Result").removeClass("None");
	$(".TabType2 a").addClass("On");
}



function fnMainItemPop(idx){
	$(".Main_Item_Pop_Bg").show(0);
	$(".Main_Item_Pop").show(500);
	$(".ListBox > h2 > a").removeClass("Select");
	$(".ListBox > h2 > a").eq(idx).addClass("Select");
	
	$(".ListBox > .ListCont").hide();
	$(".ListBox > .ListCont").eq(idx).show();
	//$(".ListBox > .ListCont").eq(idx).find(".NiList ul li:first a").focus();
}

function fnMainMapPop(){
	$(".Main_Map_Pop_Bg").hide(0);
	$(".Main_Map_Pop").hide(500);


}




