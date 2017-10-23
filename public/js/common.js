$(function () {
/*通用部分 start*/
	
	navScroll();
	$(window).scroll(function () {
		navScroll()
	})
	
	/*返回顶部*/
	$('.u-backTop').click(function () {
		$('body,html').stop().animate({scrollTop:0},500);
	})
	
	/*最新交易无缝滚动*/
	var $this = $('.m-hotNews-table-container');
	var scrollTimer;
	$this.hover(function() {
		clearInterval(scrollTimer);
	}, function() {
		scrollTimer = setInterval(function() {
			scrollNews($this);
		}, 1000);
	}).trigger("mouseout");
	function scrollNews(obj) {
		var $self = obj.find(".m-hotNews-table-2:first");
		var lineHeight = $self.find("tr:first").height();
		$self.animate({
			"margin-top": -lineHeight + "px"
		}, 1000,'linear', function() {
			$self.css({
				"margin-top": "0px"
			}).find("tr:first").appendTo($self);
		})
	}
/*通用部分 end*/
	
/*首页 start*/
	
	/*搜索栏点击关键字*/
	
	$('.u-keyword li').click(function () {
		var oKeyword = $(this).text();
		$('.u-search-text').val(oKeyword);
	})
	
	/*搜索下拉框 开始*/
	
	/*下拉选择框鼠标移入移除添加删除class*/
	$('.u-search-option li').hover(function () {
		$(this).parent('.u-search-option').find('li').removeClass('active')
		$(this).addClass('active')
	},function () {
		$(this).removeClass('active')
	})
	var optionIndex=0; //定义包含active的li的索引
	var optionIndex2=0;
	$('.u-search-option-1').mouseleave(function () {
		$(this).find('li').eq(optionIndex).addClass('active') //鼠标移除select后恢复原来的class
	})
	
	$('.u-search-option-2').mouseleave(function () {
		$(this).find('li').eq(optionIndex2).addClass('active') //鼠标移除select后恢复原来的class
	})
	
	$('.u-search-select,.m-menu').click(function (e) {
		if (e.stopPropagation) 
	      e.stopPropagation();//停止冒泡  非ie
	    else 
	      e.cancelBubble = true;//停止冒泡 ie
	})
	
	$('body').click(function () {
		$('.u-search-option').stop().slideUp(200,function () {			
			iSelect=0;
			iSelect_2=0;
		})
//		console.log(window.location.pathname)
		if (window.location.pathname!=='/') {
			$('.m-leftNav-container').fadeOut()
		}
	})
	
	/*点击显示隐藏select start*/
	var iSelect=0
	var iSelect_2=0
	$('.u-search-select-1').click(function () {
		if (iSelect==0) {
			$(this).find('.u-search-option').slideDown(200)
		}else if (iSelect==1) {
			$(this).find('.u-search-option').slideUp(200)
		}
	})
	
	$('.u-search-select-2').click(function () {
		if (iSelect_2==0) {
			$(this).find('.u-search-option').slideDown(200,function () {			
				iSelect_2=1
			})
		}else if (iSelect_2==1) {
			$(this).find('.u-search-option').slideUp(200,function () {			
				iSelect_2=0
			})
		}
	})
	
	$('.u-search-option-1 li').click(function () {
		$(this).parents('.u-search-select').find('.u-search-select-active').text($(this).text())
		optionIndex = $('.u-search-option-1 li.active').index(); //获取包含active的li的索引
		$(this).parent('.u-search-option').hide()
		iSelect=0
		return false;
	})
	$('.u-search-option-2 li').click(function () {
		$(this).parents('.u-search-select').find('.u-search-select-active').text($(this).text())
		optionIndex2 = $('.u-search-option-2 li.active').index(); //获取包含active的li的索引
		$(this).parent('.u-search-option').hide()
		iSelect_2=0
		return false;
	})
	/*点击显示隐藏select end*/
	
	/*搜索下拉框 结束*/
	
	/*导航菜单鼠标移入移除*/
	$('.m-nav li').hover(function () {
		$('.m-nav li').removeClass('active1');
		$(this).addClass('active1');
	},function () {
		$(this).removeClass('active1');
	})
	
	$('.m-nav li').eq(nav).addClass('active')
	
	/*热门服务二级导航鼠标移入移除*/
	$('.u-leftNav-li1').hover(function () {
		$(this).find('.u-icon,.u-icon2').hide()
		$(this).find('.u-icon-active,.u-icon2-active').css({
			display: 'inline-block',
		})
		$(this).addClass('active')
		$(this).find('.m-leftNav-three').show() //显示三级菜单
	},function () {
		$(this).find('.u-icon-active,.u-icon2-active').hide()
		$(this).find('.u-icon,.u-icon2').css({
			display: 'inline-block',
		})
		$(this).removeClass('active')
		$(this).find('.m-leftNav-three').hide() ////隐藏三级菜单
	})
	
	/*热门服务点击显示隐藏*/
	$('#u-btn-hot').click(function () {
		$('.m-leftNav-container').fadeToggle()
	})
	
	/*最新交易隐藏人名*/
	$('.m-hotNews-table tr').each(function () {
		var nameLength=$(this).find('td').eq(0).text().length; //获取姓名的长度
		var newName=''; //定义*
		for (var i = 0; i < nameLength-1; i++) { //循环累加出**次数
			newName += '*'
		}
		$(this).find('td').eq(0).text(
			$(this).find('td').eq(0).text().substr(0, 1)+newName
		) //设置隐藏后的姓名
	})
	
/*首页 end*/
	
/* 求购资源 start */
	
	/*禁止用户点击已经成交的按钮*/
	$('.m-stateRight-off').find('.u-supplyBtn').attr('disabled','disabled')
	
	/*剩余时间*/
	$('.m-br-list-li').each(function () {
		var _this=$(this)
		var a=parseInt($(this).attr('data-deliveryTime'))
		var starttime = new Date(a);
		setInterval(function() {
			var nowtime = new Date();
			var time = starttime - nowtime;
			if (time<0) {
				_this.find('.u-countDown').html('已过期');
				return false;
			}
			var day = parseInt(time / 1000 / 60 / 60 / 24);
			var hour = parseInt(time / 1000 / 60 / 60 % 24);
			var minute = parseInt(time / 1000 / 60 % 60);
			var seconds = parseInt(time / 1000 % 60);
			_this.find('.u-countDown').html('剩余 ' + day + '<span class="u-unit">天</span>' + hour + '<span class="u-unit">时</span>' + minute + '<span class="u-unit">分</span>' + seconds + '<span class="u-unit">秒</span>');
		}, 1000);
	})
	
/* 求购资源 end */
	
/* 现货资源 start */
	
	/*发布时间的时间戳转变成正常时间*/
	$('.m-sgList-li1').each(function () {
		var time = parseInt(this.getAttribute('data-timeSort'));
		var   time= new Date(time);   
		var   year=time.getFullYear();     
	    var   month=time.getMonth()+1;     
	    var   date=time.getDate();     
	    var   hour=time.getHours();
	    var   minute=time.getMinutes();     
		var oTime=year+"-"+fixZero(month,2)+"-"+fixZero(date,2)+"  "+fixZero(hour,2)+":"+fixZero(minute,2);
		$(this).find('.u-time').html(oTime) //发布时间添加进dom
	})
	//时间如果为单位数补0 
	function fixZero(num,length){     
	    var str=""+num;
	    var len=str.length;
	    var s="";
	    for(var i=length;i-->len;){         
	        s+="0";
	    }
	    return s+str;
	}
	var sgList=$('.m-sgList').children('ul').html() //储存默认的列表
	/*价格升序函数*/
	function priceSortAsc(){
	 	var arr = $('.m-sgList-li1');
		arr.remove().sort(function (a, b) {
			return a.textContent.match(/\d.*\d+(?=元\/立方米)/) - b.textContent.match(/\d.*\d+(?=元\/立方米)/); //对li进行排序，这里按照从小到大排序
		}).each(function (i, e) {
			$('.m-sgList').children('ul').append(e); //添加排序后内容。
		})
	}
	/*时间升序函数*/
	function timeSortAsc(){
	 	var arr = $('.m-sgList-li1');
		arr.remove().sort(function (a, b) {
			return a.getAttribute('data-timeSort') - b.getAttribute('data-timeSort'); //对li进行排序，这里按照从小到大排序
		}).each(function (i, e) {
			$('.m-sgList').children('ul').append(e); //添加排序后内容。
		})
	}
	/*状态的样式改变*/
	$('.m-condition-group li').click(function () {
		$('.m-condition-group li').removeClass('active')
		$(this).addClass('active')
	})
	/*按时间升序*/
	$('.m-condition-group li.z-time').click(function () {		
		timeSortAsc() //排序
		onPage() //重置分页
	})
	/*按价格升序*/
	$('.m-condition-group li.z-price').click(function () {		
		priceSortAsc() //排序
		onPage() //重置分页
	})
	/*恢复默认*/
	$('.m-condition-group li.z-default').click(function () {		
		$('.m-sgList').children('ul').empty().append(sgList) //恢复默认
		onPage() //重置分页
	})
	
/* 现货资源 end */

/* 查看详情页面 start */
	/*简介和参数选项卡*/
	$(".m-deatilMain-left .u-tab li").click(function(){
        $(".m-deatilMain-left .u-tab li").eq($(this).index()).addClass("cur").siblings().removeClass('cur');
		$(".m-deatilMain-left-body").hide().eq($(this).index()).show();
	});
	
	/*加减购物车*/
	$('.m-shopBtns .u-add').click(function () {
		$('#productNum').val(parseInt($('#productNum').val())+1)
		$('.m-shopBtns .u-minus').removeClass('disabled')
	})
	$('.m-shopBtns .u-minus').click(function () {
		if (parseInt($('#productNum').val())>1) {
			$('#productNum').val(parseInt($('#productNum').val())-1)
		}
		if (parseInt($('#productNum').val())==1) {
			$('.m-shopBtns .u-minus').addClass('disabled')
		}
	})
	$('#productNum').keyup(function () {
		if (parseInt($('#productNum').val())>1) {
			$('.m-shopBtns .u-minus').removeClass('disabled')
		}
		if (parseInt($('#productNum').val())==1) {
			$('.m-shopBtns .u-minus').addClass('disabled')
		}
	})
/* 查看详情页面 end */
	
	
})




/*右边策兰显示隐藏函数*/
function navScroll() {
	if ($(window).scrollTop()>200) {
		$('.m-navRight-ul1').stop().animate({
			'top': '50%',
			'margin-top': -$('.m-navRight-ul1').outerHeight()/2
		},200)
		$('.m-navRight-ul2').show()
		$('.m-navRight-ul2').stop().animate({
			'bottom': '0',
		},200)
		$('.m-floatingSearch').stop().slideDown()
	}else {
		$('.m-navRight-ul1').stop().animate({
			'top': '70%',
			'margin-top': 0
		},200)
		$('.m-navRight-ul2').stop().animate({
			'bottom': '-10%',
		},200)
		$('.m-floatingSearch').stop().slideUp()
	}
}


/* 分页插件 start */

	/*翻页按钮变色函数*/
	function  pageChange() {
		if (parseInt($('.m-co-option-right .u-nowPage').text())>=pageCount) {
			$('.u-next').css('color','#ccc')
		} else{
			$('.u-next').css('color','#666')
		}
		if (parseInt($('.m-co-option-right .u-nowPage').text())<=1) {
			$('.u-prev').css('color','#ccc')
		} else{
			$('.u-prev').css('color','#666')
		}
	}
	function onPage (count) {
		pageCount = count; //总页码
		$('.page').createPage(function(n){
//			console.log(n); //n是跳转的页码
		},{
			pageCount:pageCount,//总页码,默认10
			showPrev:true,//是否显示上一页按钮
			showNext:true,//是否显示下一页按钮
			showTurn:true,//是否显示跳转,默认可以
			showNear:2,//显示当前页码前多少页和后多少页，默认2
			showSumNum:true//是否显示总页码
		},{
			"color":"#333333",//字体颜色
			"borderColor":"#e3e3e3",//边线颜色
			"currentColor":"#fff",//当前页码的字体颜色
			"fontSize":12,//字体大小
			"pagesMargin":0,//每个页码或按钮之间的间隔
			"disableColor":"#999999",//不可点击按钮的字体颜色
			"disableBackColor":"#ffffff",//不可点击按钮的背景色
			"prevNextWidth":72,//上页下页的宽度
			"trunWidth":137,//跳转模块宽度
			"pageWidth":(function(){
				$('.u-sumPage').text(pageCount)
				$('.m-co-option-right .u-next').click(function () {
					$('.nextPage').trigger("click"); //模拟分页点击事件
					pageChange() //调用翻页按钮颜色改变
				})
				$('.m-co-option-right .u-prev').click(function () {
					$('.prevPage').trigger("click");
					pageChange()
				})
			})()//根据当前所有因素计算出来的最适合宽度。也可自己设定成固定值
		});
	}
	
/* 分页插件 end */


