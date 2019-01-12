window.onload=function () {
    search();
    banner();
    downtime();

};
var search = function () {
    /*1.默认固定顶部透明背景*/
    var searchBox = document.querySelector('.jd_search_box');
    var banner = document.querySelector('.jd_banner');
    var height = banner.offsetHeight;
    /*监听页面滚动事件*/
    window.onscroll = function () {
        /*console.log(document.body.scrollTop);
         console.log(document.documentElement.scrollTop);
         console.log(window.pageYOffset);*/
        var scrollTop = document.body.scrollTop;
        //console.log(scrollTop);
        /*默认的透明度*/
        var opacity = 0;
        if (scrollTop < height) {
            /*2.当页面滚动的时候---随着页面卷曲的高度变大透明度变大*/
            opacity = scrollTop / height * 0.85;
        } else {
            /*3.当页面滚动的时候---超过某一个高度的时候透明度不变*/
            opacity = 0.85;
        }
        searchBox.style.background = 'rgba(201,21,35,' + opacity + ')';
    }
};
var banner =function () {
    var banner=  document.querySelector('.jd_banner');
    var width = banner.offsetWidth;
    var imgBox =document.querySelector('ul:first-child');
    var pointBox =document.querySelector('ul:last-child');
    var points =pointBox.querySelectorAll('li');
var addTransition =function () {
    imgBox.style.transition='all 0.2s';
    imgBox.style.webkitTransition='all 0.2s';
};
var removeTransition =function () {
    imgBox.style.transition='none';
    imgBox.style.webkitTransition='none';
};
var setTransform =function (translateX) {
    imgBox.style.transform='translateX('+translateX+'px)';
    imgBox.style.webkitTransform='translateX('+translateX+'px)';
};
    var index =1;
    var timer = setInterval(function () {
        index++;
        addTransition();
setTransform(-index*width);
  },1000);

    imgBox.addEventListener('transitionend',function () {
        if (index>=9){
            index=1;
            removeTransition();
            setTransform(-index*width);


        }
        else if (index<=0) {
            index=8;
       removeTransition();
            setTransform(-index*width);



        }
        setpoint();
    });
var setpoint =function (){

    for (var i=0;i<points.length;i++){
        var obj= points[i];
        obj.classList.remove('now')
    }
    points[index-1].classList.add('now');
}
var startX=0;
var distanceX=0;
var isMove=false;
imgBox.addEventListener('touchstart',function (e) {
	
    clearInterval(timer);
  startX= e.touches[0].clientX;
});
imgBox.addEventListener('touchmove',function (e) {
    var moveX= e.touches[0].clientX;
     distanceX =moveX-startX;
    var translateX =distanceX+(-index*width);
    removeTransition();
    setTransform(translateX);
    isMove=true;

});
imgBox.addEventListener('touchend',function () {
if(isMove){
	if(Math.abs(distanceX)<width/3){
	addTransition();
	setTransform(-index*width);
}else{
	if(distanceX>0){
		index--;
	}else{
		index++;
	}
	addTransition();
	setTransform(-index*width);
}
}
distanceX=0;
startX=0;
isMove=false;
clearInterval(timer);
timer = setInterval(function () {
        index++;
        addTransition();
setTransform(-index*width);
  },1000);

});

};
var downtime =function () {
var time =2*60*60;
var spans =document.querySelector('.time').querySelectorAll('span');
var timer =setInterval(function(){
	time--;
	var h =Math.floor(time/3600);
	var m =Math.floor(time%3600/60);
	var s =time%60;
	spans[0].innerHTML=Math.floor(h/10);
	spans[1].innerHTML=h%10;
	spans[3].innerHTML=Math.floor(m/10);
	spans[4].innerHTML=m%10;
	
	spans[6].innerHTML=Math.floor(s/10);
	spans[7].innerHTML=s%10;
	
	if(time<=0){
		clearInterval(timer);
	}
},1000);

};

