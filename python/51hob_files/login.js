function fadeShow(idObjSrc,idShowDivContainer,hotArea){
  this.strTimeOut = "";
  this.bleIsShow = false;
  this.idObjSrc = "";
  
  if(typeof(idObjSrc) == "object"){
    this.idObjSrc = idObjSrc;
  } else if(typeof(idObjSrc) == "string"){
    this.idObjSrc = "#" + idObjSrc;
  }
  
  this.hotArea = hotArea || this.idObjSrc;

  this.idShowDivContainer = "";
  if(typeof(idShowDivContainer) == "object"){
    this.idShowDivContainer = idShowDivContainer;
  } else if(typeof(idShowDivContainer) == "string"){
    this.idShowDivContainer = "#" + idShowDivContainer;
  }
  this.init();
}

fadeShow.prototype.init = function(){
  var thisObj =  this;
  var widthTemp = $(this.idShowDivContainer).outerWidth();
  var objTop = $(this.idObjSrc).offset().top;
  var objLeft = $(this.idObjSrc).offset().left;
  var objWidth = $(this.idObjSrc).width();
  var objHeight = $(this.idObjSrc).height();
  var leftTemp = parseInt(objLeft)+parseInt(objWidth)-parseInt(widthTemp);
  var topTemp = parseInt(objTop)+parseInt(objHeight);
  $(this.idShowDivContainer).css({position:"absolute",top:topTemp + "px",left:leftTemp+"px"}).mouseout(function(e){
    thisObj.hide(e);
  });
  $(this.hotArea).mouseout(function(e){
    thisObj.hide(e);
  });
}

fadeShow.prototype.hide = function(evt){
  evt = (evt)?evt:window.event;
  var toElementObj;
  if($.browser.msie){
    toElementObj = evt.toElement;
  } else if($.browser.mozilla){
    toElementObj = evt.relatedTarget;
  } else {
    toElementObj = evt.relatedTarget;
  }
  var thisObj = this;
  if ($(this.idShowDivContainer)[0].contains(toElementObj) || $(this.hotArea)[0].contains(toElementObj)) {
    this.bleIsShow = false;
  } else {
    this.bleIsShow = true;
    if(this.strTimeOut == ""){
      this.strTimeOut = setTimeout(function(){thisObj.doHide()},1000);
    }
  }
}

fadeShow.prototype.doHide = function(){
  if(this.strTimeOut != ""){
    clearInterval(this.strTimeOut);
    this.strTimeOut = "";
  }
  if(!this.bleIsShow){
    return ;
  }
  $(this.idShowDivContainer).fadeOut("slow");
}

fadeShow.prototype.show = function(){
  $(this.idShowDivContainer).fadeIn("slow");
}

var objLoginDiv = "";

var objAreaDiv = "";


function showLoginDiv(obj){
	var lang = $("#top_login_language").val();
	if(lang == "en"){
		var language = "EN";
	}else{
		var language = "CN";
	}
	var callback = function(){
		if(window.location.host == 'bbs.51job.com'){//bbs ��¼��ˢ��ҳ��
			window.location.href=window.location.href;
		}
	};
	ShowPassportLayer(language,callback);
}

var myDomainMy = "";
function loginInSpeacial(para){
  myDomainMy = para.domain_my;
  myDomainMySSL = para.domain_my_ssl;
  var sucess = para.sucess;
  if(typeof sucess == "function"){
    $("#top_login_form").unbind("submit");
    $("#loginDiv").unbind("");
    $("#top_login_form")[0].onsubmit = "";
    $("#top_login_form").submit(function(){
      return loginIn(myDomainMy,myDomainMySSL,sucess);
    });
  }
}

function showAreaDiv(obj,thisObj){
  if(objAreaDiv == ""){
    objAreaDiv = new fadeShow(obj,"all-channel",thisObj);
  }
  objAreaDiv.show();
}

function hideLoginDiv(){
	if($('#createPassportLoginDiv').length > 0){
		$('#createPassportLoginDiv').remove();
	}
	if(document.getElementById('passportFilterDiv')){
		$('#passportFilterDiv').remove();
	}
	if(document.getElementById('passportFilterIframe')){
		$('#passportFilterIframe').remove();
	}
}

if(typeof(HTMLElement) != "undefined"){
  HTMLElement.prototype.contains = function(obj) {
  while(obj != null &&  typeof(obj.tagName) != "undefind"){
    if(obj == this)
      return true;
      obj = obj.parentNode;
    }
    return false;
  };
}
//��������
function type_search(districtVal){
 obj = document.forms.type_form;
 var districtVal12 = districtVal.substr( 0 , 2 );
 obj.district.value = districtVal;
 obj.jobarea.value = '99' == districtVal12 || '0302' == districtVal ? '0302' : districtVal12+'00';
 obj.submit();
}



var objOtherAreaDiv = "";
var objOtherCityDiv = "";
function onloadFun(){
  if(window.$){
    $(document).ready(function(){
      /*ȥ�����ӣ�button��image button�ĵ��ʱ���߿�*/
      $("a,input[type='button'],input[type='image'],input[type='submit'],area").bind("focus",function(){
        if(this.blur){
          this.blur();
        }
      })
      var obj = document.getElementById("51job|dev|all-channel1");
      if(obj != null){
        $(obj).mouseover(function(){
          if(objOtherAreaDiv == ""){
            objOtherAreaDiv = new fadeShow(this,"all-channel1");
          }
          objOtherAreaDiv.show();
        }).css({cursor:"pointer"});
      }
      
      var obj = document.getElementById("51job|dev|selectcity");
      if(obj != null){
        $(obj).mouseover(function(){
          if(objOtherCityDiv == ""){
            objOtherCityDiv = new fadeShow(this,"selectcity");
          }
          objOtherCityDiv.show();
        }).css({cursor:"pointer"});
      }
            
		/*��¼����esc�ر�*/
		document.onkeydown = function(event){
			var e = window.event||event;
			if(e.keyCode == 27){
				hideLoginDiv();
			}
		}
      
	    /*��¼��ҳ �û������������ȥ��ʱ��  ��ʾ�������,*/  
	  	var userNameInpuValue = $('#username').attr('value');
		if($.trim(userNameInpuValue) == '����/�û���/�ֻ���' || $.trim(userNameInpuValue) == 'Email/MemberID/Phone')
		{
			$('#username').css('color','#999');
		}
		$("#username").click(function(){
			if($.trim(this.value) == '����/�û���/�ֻ���' || $.trim(this.value) =='Email/MemberID/Phone')
			{
				this.value = '';
			}
			$('#username').css('color','black');
		});//username click end
		
		//��¼����  ��֤���л�  start
		$('.verifyPicChangeClick').click(function(){
		    var objDate = new Date();
		    var strTime = objDate.getTime();
		    url = $('#verifyPic_img').attr('src');
			var type = $('#verifyPic_img').attr('type');
			if(type == '' || type == undefined){
				type=3;
			}
		    if(url.indexOf('?') > 0)
		    {
		    	url = url.replace(/\?.*/g,'?');
		    }else
		    {
		    	url = url + '?';
		    }
		    url = url + 'type=' + type + '&from_domain='+window.location.host+'&t=' + strTime;
		    
		    $('#verifyPic_img').attr('src',url);
		    
		    return false;
		});// ��֤���л�   end
    })
  } else {
    setTimeout("onloadFun()",1000);
  }
}
onloadFun();

function imgover(targetid,key){
    if (document.getElementById){
	target=document.getElementById(targetid);
	target.style.display="inline";
		switch(key){
			case 'A':
				target.style.left = '-18px';
				target.style.top = '-26px';
				break;
			case 'B':
				target.style.left = '-16px';
				target.style.top = '-26px';
				break;
			case 'C':
				target.style.left = '-46px';
				target.style.top = '-26px';
				break;
			case 'D':
				target.style.left = '28px';
				target.style.top = '-26px';
				break;
			case 'E':
				target.style.left = '92px';
				target.style.top = '-26px';
				break;	
			case 'F':
				target.style.left = '104px';
				target.style.top = '-26px';
				break;
			case 'G':
				target.style.left = '134px';
				target.style.top = '-26px';
				break;
			case 'H':
				target.style.left = '-37px';
				target.style.top = '-26px';
				break;
			case 'J':
				target.style.left = '30px';
				target.style.top = '-26px';
				break;
			case 'K':
				target.style.left = '238px';
				target.style.top = '-26px';
				break;
			case 'L':
				target.style.left = '-82px';
				target.style.top = '1px';
				break;
			case 'M':
				target.style.left = '13px';
				target.style.top = '1px';
				break;   
			case 'N':
				target.style.left = '-16px';
				target.style.top = '1px';
				break;    	
			case 'Q':
				target.style.left = '22px';
				target.style.top = '1px';
				break;
			case 'S':
				target.style.left = '-22px';
				target.style.top = '1px';
				break;
			case 'T':
				target.style.left = '59px';
				target.style.top = '1px';
				break;
			case 'W':
				target.style.left = '60px';
				target.style.top = '1px';
				break;
			case 'X':
				target.style.left = '119px';
				target.style.top = '1px';
				break;
			case 'Y':
				target.style.left = '90px';
				target.style.top = '1px';
				break;
			case 'Z':
				target.style.left = '-3px';
				target.style.top = '1px';
				break;
		}
    }
}
function imgout(targetid){
    if (document.getElementById){
	target=document.getElementById(targetid);
	target.style.display="none";
    }
}


/*************************����ͨ�ú���****************************************/
var Sys = (function(ua){ 
	var s = {}; 
	s.IE = ua.match(/msie ([\d.]+)/)?true:false; 
	s.Firefox = ua.match(/firefox\/([\d.]+)/)?true:false; 
	s.Chrome = ua.match(/chrome\/([\d.]+)/)?true:false; 
	s.IE6 = (s.IE&&([/MSIE (\d|1\d)\.0/i.exec(navigator.userAgent)][0][1] == 6))?true:false;
	s.IE7 = (s.IE&&([/MSIE (\d|1\d)\.0/i.exec(navigator.userAgent)][0][1] == 7))?true:false;
	s.IE8 = (s.IE&&([/MSIE (\d|1\d)\.0/i.exec(navigator.userAgent)][0][1] == 8))?true:false;
	return s; 
})(navigator.userAgent.toLowerCase()); 

/**
 *  IE6����ͼƬĬ�ϲ�����
 */
Sys.IE6 && document.execCommand("BackgroundImageCache", false, true); 

var $_ = function (id) { 
	return  "string" == typeof id ? document.getElementById(id) : id; 
};

/**
 *�������Ԫ��ִ��fun����
 * params Array list  ����
 * params Function fun ����Ԫ����Ҫִ�еĺ��� 
 */ 
function Each(list, fun){ 
	for (var i = 0, len = list.length; i < len; i++) {fun(list[i], i); } 
}; 

//��Ԫ�����CSS
var Css = function(e, o){ 
	if(typeof o=="string") 
	{ 
		e.style.cssText = o; 
		return; 
	} 
	for(var i in o) 
		e.style[i] = o[i]; 
}; 
//��Ԫ���������
var Attr = function(e, o){ 
	for(var i in  o) 
		e.setAttribute(i,o[i]); 
}; 

var $$ = function( p, e){ 
	return p.getElementsByTagName(e); 
}; 

/**
 * ����һ��htmlԪ��
 * params String e htmlԪ��
 * params Object p ָ������Ԫ�أ�Ĭ��Ϊdocument
 * params Function fn  �Դ�����Ԫ��ִ��fn����
 * return Object htmlԪ��
 */
function create(e, p, fn){ 
	var element = document.createElement(e); 
	p && p.appendChild(element);
	fn && fn(element);
	return element; 
};
 
function getTarget(e){ 
	e = e||window.event; 
	return e.srcElement||e.target; 
}; 

/**
 * ����һ��tri��,tdi�еı��
 * params int tri ����
 * params int tdi ���� 
 * params Function arisetab �Դ�����tableִ��arisetab����
 * params Function arisetr  ��ÿһ��trִ��arisetr����
 * params Function arisetd  ��ÿһ��tdִ��arisetd����
 * params Object p  	   ���ĸ���Ԫ��
 * return Object ���
 */
function createtab(tri, tdi, arisetab, arisetr, arisetd, p){ 
	var table = p ? p.createElement("table") : create("table"); 
	arisetab && arisetab(table); 
	var tbody = p ? p.createElement("tbody") : create("tbody"); 
	for(var i=0; i<tri; i++) 
	{ 
		var tr = p ? p.createElement("tr") : create("tr"); 
		arisetr && arisetr(i, tr); 
		for(var j=0; j<tdi; j++) 
		{ 
			var td = p ? p.createElement("td") : create("td"); 
			arisetd && arisetd(i, j, td); 
			tr.appendChild(td); 
		} 
		tbody.appendChild(tr); 
	} 
	table.appendChild(tbody); 
	return table; 
}; 

//�̳����Ժͷ���
var Extend = function(destination, source) { 
	for (var property in source) { 
		destination[property] = source[property]; 
	} 
};
 
//�󶨶��󷽷�
var Bind = function(object, fun) { 
	var args = Array.prototype.slice.call(arguments).slice(2); 
	return function() { 
		return fun.apply(object, args); 
	} 
};
 
//�󶨶����¼�
var BindAsEventListener = function(object, fun, args ) { 
	var args = Array.prototype.slice.call(arguments).slice(2); 
	return function(event) { 
		return fun.apply(object, [event || window.event].concat(args)); 
	} 
}; 

//��ȡ�������ʽ
var CurrentStyle = function(element){ 
	return element.currentStyle || document.defaultView.getComputedStyle(element, null); 
}; 

//��ȡ�����λ��
var Getpos = function(o){ 
	var x = 0, y = 0; 
	do{
		x += o.offsetLeft; y += o.offsetTop; 
	}
	while((o = o.offsetParent)); 
	return {'x':x, 'y':y }; 
}; 
/**
 * Ԫ�ظ����¼����¼�������
 * params Object element  ��Ҫ���¼���������Ԫ��
 * params String e        �¼�
 * params Function fn     �¼�������
 */
function addListener(element, e, fn){ 
	element.addEventListener ? element.addEventListener(e, fn, false) : element.attachEvent("on" + e, fn); 
}; 
/**
 * Ԫ�ظ����¼��Ƴ��¼�������
 * params Object element  ��Ҫ�Ƴ��¼���������Ԫ��
 * params String e        �¼�
 * params Function fn     �¼�������
 */
function removeListener(element, e, fn){ 
	element.removeEventListener ? element.removeEventListener(e, fn, false) : element.detachEvent("on" + e, fn); 
}; 

//usage:  var Editor = new Class(...);
var Class = function(properties) {
	var _class = function(){
		return  ( arguments[0] !== null && this.initialize && typeof(this.initialize) == 'function') ? this.initialize.apply(this, arguments) : this;
	}; 
	_class.prototype = properties; 
	return _class; 
}; 

/*��¼������֤���л�*/
function changeVerifyCode()
{
    var objDate = new Date();
    var strTime = objDate.getTime();
    url = $('#login_yzm_img').attr('src');
    if(url.indexOf('?') > 0)
    {
    	url = url.replace(/\?.*/g,'?');
    }else
    {
    	url = url + '?';
    }
    url = url + 'type=3&t=' + strTime;
    $('#login_yzm_img').attr('src',url);
}

/*��¼�������*/
/*ͳһ��¼ ��¼���㴦��js*/
var IMGPATH = 'http://img01.51jobcdn.com';
var MYPATH = 'http://my.51job.com';
var MYPATHSSL = 'https://mylogin.51job.com';
var THISHOST = window.location.host;

/*���� language = EN/CN*/
function ShowPassportLayer(language)
{
	//createPassPortLayer(language,callback,true);
    var sLang = "c";
    if(language == "EN")
    {
        sLang = "e";
    }
    var sHref = "?lang=" + sLang + "&url=" + encodeURIComponent(window.location.href);

    window.location.href = "http://login.51job.com/login.php" + sHref;
}

/*�л���֤��*/
function changeLoginVerify()
{
    var objDate = new Date();
    var strTime = objDate.getTime();
    url = $('#passport_top_vimg').attr('src');
    if(url.indexOf('?') > 0)
    {
    	url = url.replace(/\?.*/g,'?');
    }else
    {
    	url = url + '?';
    }
    url = url + 'type=3&from_domain=' + THISHOST + '&t=' + strTime;
    
    $('#passport_top_vimg').attr('src',url);
    
    return false;
}

/*��ȡcookie*/
function getCookie(c_name)
{
	var cookieStr 	= unescape(document.cookie);
	if (cookieStr.length>0){
		c_start		= cookieStr.indexOf(c_name + "=");
		if (c_start!= -1){ 
			c_start = c_start + c_name.length+1 ;
			c_end	= cookieStr.indexOf(";",c_start);
			if (c_end==-1)
			{
				c_end=cookieStr.length;				
			} 
			return cookieStr.substring(c_start,c_end);
		} 
	}
	return "";
}