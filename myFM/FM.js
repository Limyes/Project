var EventCenter={
	on:function(type,handler){
		$(document).on(type,handler)
	},
	fire:function(type,data){
		$(document).trigger(type,data)
	}
}



var Footer={
	init:function(){
		this.$footer=$('footer')
		this.$box=this.$footer.find('.box')
		this.$ul=this.$footer.find('ul')
		this.$leftbtn=this.$footer.find('.icon-left')
		this.$rightbtn=this.$footer.find('.icon-right')
		this.isToEnd=false
		this.isToStart=true
		this.bindEvents()
		this.render()
	},
	bindEvents:function(){
		var _this=this
		this.$rightbtn.on('click',function(){
			var itemWidth=_this.$box.find('li').outerWidth(true)
			var rowCount=Math.floor(_this.$box.width()/itemWidth)
			if(!_this.isToEnd){
				_this.$ul.animate({
					left:'-='+rowCount*itemWidth
				},400,function(){
					_this.isToStart=false
					if(parseFloat(_this.$box.width())-parseFloat(_this.$ul.css('left'))>=parseFloat(_this.$ul.css('width'))){
						_this.isToEnd=true
					}
				})
			}	
		})
		this.$leftbtn.on('click',function(){
			var itemWidth=_this.$box.find('li').outerWidth(true)
			var rowCount=Math.floor(_this.$box.width()/itemWidth)
			if(!_this.isToStart){
				_this.$ul.animate({
					left:'+='+rowCount*itemWidth
				},400,function(){
					_this.isToEnd=false
					if(parseFloat(_this.$ul.css('left'))>=0){
						_this.isToStart=true
					}
				})
			}	
		})
		this.$footer.on('click',function(){
			$(this).addClass('active').siblings().removeClass('active')
			EventCenter.fire('select-albumn',$(this).attr('data-channel-id'))
		})
	},
	render:function(){
		var _this=this
		$.getJSON('http://api.jirengu.com/fm/getChannels.php')
			.done(function(ret){
				_this.renderFooter(ret.channels)
			}).fail(function(){
				console.log('error')
			})
	},
	renderFooter:function(channels){
		var html=''
		channels.forEach(function(channel){
			html+='<li data-channel-id='+channel.channel_id+'>'
				+'<div class="cover" style="background:url('+channel.cover_small+') center center no-repeat;background-size:cover;"></div>'
				+'<h3>'+channel.name+'</h3>'+'</li>'
		})
		this.$ul.html(html)
		this.setStyle();
	},
	setStyle:function(){
		var count=this.$footer.find('li').length
		var width=this.$footer.find('li').outerWidth(true)
		this.$ul.css({'width':count*width+'px'})
	}
}
var App={
	init:function(){
		this.bindEvents()
	},
	bingEvents:function(){
		EventCenter.on('select-albumn',function(e,data){
			console.log('select',data)
		})
	}
}

Footer.init()