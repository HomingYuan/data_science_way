(function() {
	/*
	 *Author Liyao
	 *Date 2009-3-10
	 *Function Base class
	 */
	
	//check the class name , it will be replaced when existed
	if ( window.Base ) {
		alert( 'variable Base has been used,it will be replaced with _Base!' );
		window._Base = window.Base;
	}

	//constructor
	window.Base = function( param ) {
		param = param instanceof Object ? param : {};
		this.cfg = param.cfg || {};
	}

	//share property & method
	var pt = Base.prototype;
	var ua = navigator.userAgent.toLowerCase();

	//���������
	pt.browser = {
		version: (ua.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],
		safari: /webkit/.test(ua),
		opera: /opera/.test(ua),
		msie: /msie/.test(ua) && !/opera/.test(ua),
		mozilla: /mozilla/.test(ua) && !/(compatible|webkit)/.test(ua)
	}

	//����id name index��ȡDOM����
	pt._ = function( obj ) {
		if ( typeof obj == 'string' ) {
			var tmp;
			return document.getElementById( obj ) || ( ( tmp = document.getElementsByName( obj ) ) ? tmp[0] : null );
		}
		return obj && obj.nodeType ? obj : null;
	}

	//�¼���
	pt.bindEvent = function( a , b , c ) {
		var d = 'on' + b;
		if ( a.addEventListener ) {//ff opera
			a.addEventListener( b , c , false );
		}
		else if ( a.attachEvent ) {//ie
			a.attachEvent( d , c );
		}
		else {
			a[d] = c;
		}
	}

	//����
	pt.attEvt = pt.bindEvent;

	//�¼��Ƴ�
	pt.removeEvent = function( a , b , c ) {
		var d = 'on' + b;
		if ( a.removeEventListener ) {//ff opera
			a.removeEventListener( b , c , false );
		}
		else if ( a.dettachEvent ) {//ie
			a.dettachEvent( d , c );
		}
		else {
			a[d] = null;
		}
	}

	pt.setProps = function( obj , props ) {
		if ( typeof obj == 'object' ) {
			props = typeof props == 'object' ? props : {};
			for (  var prop in props ) {
				try {
					if ( 'style' == prop ) {
						for ( var subProp in props[prop] ) {
							obj[prop][subProp] = props[prop][subProp];
						}
					}
					else {
						obj[prop] = props[prop];
					}
				}
				catch ( e ) {
					
				}
			}
		}
	}

	/********************** DOM ����λ����ط��� start *************************/

	//�ж��Ƿ�Ǳ�̬��λ
	pt.isNonStaticPos = function( obj ) {
		var pos = obj.style.position.toLowerCase();
		return 'relative' == pos || 'absolute' == pos || ( 'fixed' == pos && !( this.browser.msie && this.browser.version < '7.0' ) );
	}

	//��ȡ����ķ�static��λ�ĸ�Ԫ��
	pt.nearestNonStaticPosPareNode = function( obj ) {
		while ( ( obj = obj.offsetParent ) && !this.isNonStaticPos( obj ) ) {}
		return obj;
	}

	//��ȡλ��
	pt.getPos = function( obj , isNonStatic ) {
		var left = 0 , top = 0;
		while ( obj ) {
			left += obj.offsetLeft;
			top += obj.offsetTop;
			obj = obj.offsetParent;
			if ( isNonStatic && this.isNonStaticPos( obj ) ) {
				break;
			}
		}
		return { left: left , top: top };
	}

	//��궨λ
	pt.fallowMouse = function( e , obj , dir ) {
		e = e || window.event;
		if ( !this.isNonStaticPos( obj ) || !e ) {//�Ǿ�̬��λleft top��λ����Ч��,���߲���event����
			return false;
		}
		dir = dir || { left: false , top: false };
		var ex = e.clientX;
		var ey = e.clientY;
		var bl = document.body.scrollLeft || document.documentElement.scrollLeft;
		var bt = document.body.scrollTop || document.documentElement.scrollTop;
		var bw = document.body.offsetWidth || document.documentElement.offsetWidth;
		//var bh = document.body.offsetHeight || document.documentElement.offsetHeight;
		var bh = document.documentElement.clientHeight;
		var ow = obj.offsetWidth;
		var oh = obj.offsetHeight;

		var ol = dir.left ? ( ex - ow < bl ? ex + bl : ex + bl - ow ) : ( ex + ow > bw ? ex + bl - ow : ex + bl );
		ol = Math.max( 0 , bl , ol );
		var ot = dir.top ? ( ey - oh < bt ? ey + bt : ey + bt - oh ) : ( ey + oh > bh ? ey + bt - oh : ey + bt );
		ot = Math.max( 0 , bt , ot );

		var pNode = this.nearestNonStaticPosPareNode( obj );
		if ( pNode ) {
			var pos = this.getPos( pNode );
			ol -= pos.left;
			ot -= pos.top;
		}
		obj.style.left = ol + 'px';
		obj.style.top = ot + 'px';
	}

	//��Ļ���붨λ
	pt.setCenter = function ( obj ) {
		var ocw = obj.offsetWidth;
		var och = obj.offsetHeight;
		var bsl = document.body.scrollLeft || document.documentElement.scrollLeft;
		var bst = document.body.scrollTop || document.documentElement.scrollTop;
		var bcw = document.documentElement.offsetWidth;
		var bch = document.documentElement.offsetHeight;
		var osl = bsl + Math.floor( ( bcw - ocw ) / 2 );
			osl = Math.max( bsl , osl );
		var ost = bst + Math.floor( ( bch - och ) / 2 );
			ost = Math.max( bst , ost );
		obj.style.left	= osl + 'px';
		obj.style.top	= ost + 'px';
	}

	pt.showAutoAdaptText = function ( node , text , pixelWidth , suffix ) {
		if ( node.nodeName ) {
			pixelWidth = pixelWidth || 14/95;
			var len1 = text.getLen();
			if ( typeof text == 'string' ) {
				var len2 = Math.floor( node.clientWidth * pixelWidth );
				var tstr = '';
				suffix = suffix || '...';
				var vstr = len1 > len2 ? text.subStringPro( len2 - suffix.length ) : text;
				if ( text != vstr ) {
					tstr = text;
					vstr += suffix;
				}
				node.title = tstr;
				node.value = vstr;
			}
		}
	}

	pt.getSubCodes = function( data , _code ) {
		if ( data.subCodesCache == undefined ) {
			data.subCodesCache = [];
			for ( var code in data ) {
				if( _code.length == 6 )
				{
					if(/^[\d]{2}(([\d][1-9])|([1-9][\d]))[\d]{2}$/.test(code))
					{
						var str56 = code.substr(4,2);
						if(str56 == '00')
						{
							var pareCode = code.substr( 0 , 2 ) + '0000';
							
						}else
						{
							var pareCode = code.substr( 0 , 4 ) + '00';
						}
						if ( data.subCodesCache[pareCode] == undefined )
						{
							data.subCodesCache[pareCode] = [];
						}
						data.subCodesCache[pareCode].push( code );
					}
				}else if(_code.length == 2)
				{
					data.subCodesCache[_code] = [];
					break;
				}
				else
				{
					if ( /^[\d]{2}(([\d][1-9])|([1-9][\d]))$/.test( code ) ) 
					{
						var pareCode = code.substr( 0 , 2 ) + '00';
						if ( data.subCodesCache[pareCode] == undefined ) 
						{
							data.subCodesCache[pareCode] = [];
						}
						data.subCodesCache[pareCode].push( code );
					}
				}
			}
		}
		return data.subCodesCache[_code] || [];
	}

	/********************** DOM ����λ����ط��� end *************************/

	//modified by ian 2015-05-19 ��ͼ��������landmark,dibiaoid
	pt.urlFields = [ 'jobarea' , 'district' , 'funtype' , 'industrytype' , 'issuedate' , 'providesalary' , 'keyword' , 'keywordtype' , 'curr_page' , 'lang' , 'stype' , 'postchannel' , 'workyear' , 'cotype' , 'degreefrom' , 'jobterm' , 'companysize', 'address' , 'lonlat' , 'radius' , 'ord_field' , 'list_type' , 'fromType', 'from' , 'landmark' , 'dibiaoid', 'confirmdate'];

	pt.getSearchResultHref1 = function( param ) {
		var urlEncode = window.encodeURIComponent || window.escape;
		param = typeof param == 'object' ? param : {};
		var href = this.cfg.domain.search + '/list/';
		var and = '';
		for ( var i = 0 ; i < this.urlFields.length ; i++ ) {
			var val = '';
			if ( param.nodeName && param[this.urlFields[i]] != undefined ) {
				if ( param[this.urlFields[i]].value != undefined ) {//text input
					val = param[this.urlFields[i]].value;
				}
				else if ( param[this.urlFields[i]].length ) {//radio input
					for ( j = 0 ; j < param[this.urlFields[i]].length ; j++ ) {
						if (  param[this.urlFields[i]][j].checked ) {
							val = param[this.urlFields[i]][j].value;
							break;
						}
					}
				}				
			}
			else if ( param[this.urlFields[i]] != undefined ) {
				val =  param[this.urlFields[i]];
			}
			if ( 'lang' == this.urlFields[i] ) {
				val = val || this.cfg.lang;
				href += '.html?fromJs=1';
				and = '&';
			}
			if ( '&' != and ) {
				href += and + urlEncode( urlEncode( '' != val ? val : ' ' ) );
				and = ',';
			}
			else {
				if ( '' != val ) {
					href += and + this.urlFields[i] + '=' + urlEncode( val );
				}
			}

		}
		return href;
	}

	pt.getSearchResultHref = function( param ) {
		var urlEncode = window.encodeURIComponent || window.escape;
		param = typeof param == 'object' ? param : {};
		var href = this.cfg.domain.search + '/jobsearch/search_result.php?fromJs=1';
		for ( var i = 0 ; i < this.urlFields.length ; i++ ) {
			var val = '';
			if ( param.nodeName && param[this.urlFields[i]] != undefined ) {
				if ( param[this.urlFields[i]].value != undefined ) {//text input
					val = param[this.urlFields[i]].value;
				}
				else if ( param[this.urlFields[i]].length ) {//radio input
					for ( j = 0 ; j < param[this.urlFields[i]].length ; j++ ) {
						if (  param[this.urlFields[i]][j].checked ) {
							val = param[this.urlFields[i]][j].value;
							break;
						}
					}
				}				
			}
			else if ( param[this.urlFields[i]] != undefined ) {
				val =  param[this.urlFields[i]];
			}
			if ( 'lang' == this.urlFields[i] ) {
				val = val || this.cfg.lang;
			}
			if ( '' != val ) {
				href += '&' + this.urlFields[i] + '=' + urlEncode( val );
			}

		}
		return href;
	}


})();

window.bs = new Base();
window._ = bs._;

String.prototype.trim = function() {
	return this.replace( /(^\s*)|(\s*$)/g , '' );
}

String.prototype.getLen = function() {
	return this.replace( /[^\x00-\xff]/g , "aa" ).length;
}

String.prototype.subStringPro = function( length ) {
	var stri = '';
	for ( var i = 0 , j = 0 ; j < length ; ) {
		if ( this.charCodeAt( i ) >= 0 && this.charCodeAt( i ) <= 255 ) {
			stri += this.charAt( i );
			j++;
		}
		else if ( ( j += 2 ) <= length ) {
			stri += this.charAt( i );
		}
		i++;
	}
	return stri;
}

String.prototype.getRootDomain = function () {
	var res = /^([^:]*:\/\/)?([^\/\.]+\.([^\/]+))/.exec( this );
	return res && res[3] != undefined ? res[3] + '' : '';
}

Array.prototype.unique = function() {  
	var hash = {};
	for ( var i = 0 , j = 0 ; i < this.length ; i++ ) {
		if ( this[i] != undefined ) {
			if ( !hash[this[i]] ) {
				this[j++] = this[i];
				hash[this[i]] = true;
			}
		}
	}
	this.length = j;
	return this;
}  

Array.prototype.clone = function() {
	var arr = [];
	for ( var p in this ) {
		if ( arr[p] == undefined && typeof this[p] == 'string' ) {
			arr[p] = this[p];
		}
	}
	return arr;
}


Function.prototype.$extends = function( $super ) {
	if ( $super instanceof Function ) {
		this.$super = $super;
		for ( var prop in $super.prototype ) {
			if ( this.prototype[prop] == undefined ) {
				this.prototype[prop] = $super.prototype[prop];
			}
		}
	}
	return this;
}

/*
Object.prototype.$extends = function( $super ) {
	if ( $super && $super.apply ) {
		var arg = [];
		for ( var i = 1 ; i < arguments.length ; i++ ) {
			arg.push( arguments[i] );
		}
		$super.apply( this , arg );
		return this;
	}
}
*/
