(function() {
	/*
	 *Author Liyao
	 *Date 2009-4-7
	 *Function Search class extends Base class
	 */

	//check the class name , it will be replaced when existed
	if ( window.Search ) {
		alert( 'variable Search has been used,it will be replaced with _Search!' );
		window._Search = window.Search;
	}

	//constructor
	window.Search = function( param ) {
		param = param instanceof Object ? param : {};

		Base.apply( this , [param] );

		for ( var prop in param ) {
			this[prop] = param[prop];
		}
	}.$extends( Base );

	//share property & method
	var pt = Search.prototype;

	pt.searchForm = null;

	pt.getChgKwdTypeFunc = function( thisObj , valKey ) {
		return function() {
			thisObj.chgKwdType( valKey );
		}
	}

	pt.chgKwdType = function( valKey ) {
		var e  = 'e' == this.cfg.lang ? 'e' : '';
		if ( valKey < '0' || valKey > '2' ) {
			valKey = '2';
		}
		var ul = this._( 'kwdTypeSel' );
		var k = 2 , n = 1;
		for ( var i = 0 ; i < ul.childNodes.length  ; i++ ) {
			var iValKey = ul.childNodes[i].getAttribute( 'valKey' );
			if ( iValKey == valKey ) {
				n = 2;
				k = i;
			}
			else {
				n = i < k ? 1 : 3;
			}
			ul.childNodes[i].className = e + 'kt_bg' + n;
		}
		this.searchForm.keywordtype.value = valKey;
	}


	pt.initKwdInputEvt = function() {
		this.searchForm.keyword.setAttribute('id','kwdselectid');
		var zzSearchObj = this;
		this.bindEvent( this.searchForm.keyword , 'focus' , function(){ zzSearchObj.delQsrgjz(); } );
		this.bindEvent( this.searchForm.keyword , 'click' , function(){ zzSearchObj.delQsrgjz();
            //����ȡ��
            //zzSearchObj.kwdSearchContent();
			} );

	}

	pt.delQsrgjz = function() {
		var kwd = this.searchForm.keyword;
		if ( this.cfg.langs.qsrgjz == kwd.value ) {
			kwd.value = '';
			kwd.style.color = '#000000';
		}

	}

    //add by ian 2015-08-05����
    pt.kwdSearchContentData;

    pt.kwdSearchContent = function() {
        var url='http://my.51job.com/in/KwdSearchContent.php?';
        var check = '';
        url = url + 'check=' + check + '&jsoncallback=?';
        if(typeof(zzSearch.kwdSearchContentData) !== 'undefined') {
            $('#KwdSearchContent').show();
        } else {
            $.getJSON(url,
                function(data){
                    zzSearch.kwdSearchContentData = data;
                    zzSearch.kwdSearchContentAdd(data);
                });
        }
    }

    pt.kwdSearchContentAdd = function(data) {
        var obj = $('#KwdSearchContent');
        //�����ɡ��鿴���м��С�
        $.each(data, function(i,n){
            if(n.type == 1) {
                n.name = n.name.replace(/\+/g, ' ');
                var a = '<a href="' + n.href + '" style="color:#ff7300;" target="_blank">' + unescape(decodeURIComponent(n.name)) + '</a>';
                obj.append(a);
            }
        });
        //��������
        $.each(data, function(i,n){
            if(n.type == 0) {
            n.name = n.name.replace(/\+/g, ' ');
            var a = '<a href="' + n.href + '" target="_blank">' + unescape(decodeURIComponent(n.name)) + '</a>';
                obj.append(a);
            }
        });
        obj.show();
    }

  var timer;

	pt.Mout = function(o){
		timer=setTimeout(function(){o.style.display="none";},300)

	}


	pt.initSearchInResult = function() {//�ڽ��������
		var zzSearchObj = this;
		this.bindEvent( this._( 'btnSearchInResult' ) , 'click' , function(){ zzSearchObj.searchInResult(); } );
		this._( 'btnSearchInResult' ).style.cursor = 'pointer';
	}

	pt.searchInResult = function() {
		this.delQsrgjz();
		this.pageForm.fromType.value = 2;
		this.pageForm.keyword.value += ' ' + this.searchForm.keyword.value;
		this.pageFormSub( {} , true );
	}

	pt.pageFormSub = function( fieldValue , isReSearch ) {
		for ( var field in fieldValue ) {
			if ( this.pageForm[field] ) {
				this.pageForm[field].value = fieldValue[field];
			}
		}
		if ( isReSearch ) {
			this.pageForm.curr_page.value = 1;
			this.pageForm.jobid_count.value = 0;
			this.pageForm.jobid_list.value = '';
		}
		else {
		}
		if ( this.pageForm.keyword.value.getLen() > 200 ) {
			this.pageForm.keyword.value = this.pageForm.keyword.value.subStringPro( 200 );
		}
		this.formSub( this.pageForm );
	}

	pt.getSelectedJobids = function( frm ) {
		var jobids = [];
		var chxs = this._( 'resultList' ).getElementsByTagName( 'input' );
		for ( var i = 0 ; i < chxs.length ; i++ ) {
			if ( /^delivery_jobid/.test( chxs[i].name ) && chxs[i].checked ) {
				jobids.push( chxs[i].value );
			}
		}
		return jobids.unique().join( ',' );
	}

	pt.selectAllJobs = function( checked ){
		var chxs = this._( 'resultList' ).getElementsByTagName( 'input' );
		var jobids = [];
		for ( var i = 0 ; i < chxs.length ; i++ ) {
			if ( /^delivery_jobid/.test( chxs[i].name ) ) {
				chxs[i].checked = checked;
			}
		}
		if(arguments.length == 2)
		{
			var tmpobj;
			if(arguments[1] == "quanxuan_top")
			{
				tmpobj = window.document.getElementById('quanxuan_bottom');
			}else if(arguments[1] == "quanxuan_bottom")
			{
				tmpobj = window.document.getElementById('quanxuan_top');
			}
			if(tmpobj)
			{
				tmpobj.checked = checked;
			}
		}
	}

	pt.delSrpcgjz = function() {
		var kwd = this.excludeForm.keyword;
		if ( this.cfg.langs.srpcgjz == kwd.value ) {
			kwd.value = '';
			kwd.style.color = '#000000';
		}
	}

	pt.initExcludeSearch = function() {
		var zzSearchObj = this;
		this.excludeForm.onsubmit = function() { zzSearchObj.excludeSearch(); return false; };
		this.bindEvent( this.excludeForm.keyword , 'click' , function(){ zzSearchObj.delSrpcgjz(); } );
		this.bindEvent( this.excludeForm.keyword , 'focus' , function(){ zzSearchObj.delSrpcgjz(); } );
	}

	pt.excludeSearch = function() {
		this.delSrpcgjz();
		var val = this.excludeForm.keyword.value.replace( /[^\u3040-\u318f\u3100-\u312f\u3040-\u309F\u30A0-\u30FF\u31F0-\u31FF\u3300-\u337f\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff65-\uff9fa-zA-Z0-9@#$%&+']+/g , ' ' ).trim();
		if ( val ) {
			this.pageForm.keyword.value += ( ' ' + val ).replace( / +/g , ' -' );
		}
		this.pageFormSub( { keyword : this.pageForm.keyword.value , fromType : 9 } , true );
	}

    pt.isCheckedURL = false;
    pt.checkURL = function(url,obj) {
        var querystr = url.split('?')[1];
        if(querystr == undefined) {
            return ;
        } else {
            var tmpstr = querystr.split('jobarea=');
            var jobarea = tmpstr[1].split('&')[0];
            if(jobarea == "") {
                //δ���ó���
                $(obj).parents('.specialtyList').parent().hide();
                var goSearch = function(u){
                    var ja = document.getElementById('jobarea').value;
                    var url = 'search_result.php?' + u[0] + 'jobarea=' + ja + u[1];
                    window.location.href = url;
                };
                if(!zzSearch.isCheckedURL) {
                    $('#forJobarea').areaLayer({'id': 'forJobarea', 'code_id': 'jobarea','after_close': function(){goSearch(tmpstr)}});
                    zzSearch.isCheckedURL = true;
                }
                $('#forJobarea').click();
            } else {
                window.location.href = url;
            }
        }
    }

    pt.showSubFuntypeLayerNew = function (event, thisObj, funtype) {
        var jobarea = document.getElementById('jobarea').value;
        if(jobarea == '') {
            //δ�鵽����
        }
        jobarea = jobarea.split(',');
        var jobareastr = '';
        if(jobarea.length == 1) {
            jobareastr = jobarea[0];
        } else if (jobarea.length > 1){
            jobareastr = jobarea[0];
            for(var i=1; i<jobarea.length; i++) {
               jobareastr = jobareastr + ',' +jobarea[i];
            }
        }
		var url = 'search_result.php?lang=c&industrytype=00&fromType=18&issuedate=1&jobarea=' + jobareastr;
		url = /\?/.test( url ) ? url : url + '?';


		var data = data || ft;
        var subFuntypes = ft_map[funtype].split(',');
        subFuntypes.splice( 0 , 0 , funtype );

        var maxlength = 0;
		var tbllist = '';
        var tblStr = '';
        for ( var k = 0 ; k < subFuntypes.length ; k++ ) {
			var funtypeName = ( '00' == subFuntypes[k].substr( 2 ) ? '(' + this.cfg.langs.quanbu + ')' : '' ) + data[subFuntypes[k]];
			tbllist += '<tr><td><a href="javascript:void(0);" onclick="zzSearch.checkURL(\'' + url + '&funtype=' + subFuntypes[k] + '\',this);">' + funtypeName + '</a></td></tr>';
            maxlength = funtypeName.length > maxlength ? funtypeName.length : maxlength;
		}
        subFuntypes.splice(0,1);
        var title = thisObj.innerHTML.replace(/<i.*<\/i>/,'');
        //����IE
        title = title.replace(/<I.*<\/I>/,'');
        var tblStr = '<div class="specialtyList" style="display:block;width:'+ maxlength * 12 + 'px;"><h4>' + title + '</h4><table cellpadding="0" cellspacing="0"><tbody>';
		tblStr += tbllist + '</tbody></table></div>';

		var zlParam = {
			content:  tblStr,
			openType: 1 , //��궨λ
			MOutCloseNode : thisObj
		}
		var zl = new ExtZzLayer( zlParam );
		thisObj.zlObj = zl;
		zl.open( event );
	}

    pt.getIndtypeUrl = function (indtype) {
        var jobarea = document.getElementById('jobarea').value;
        if(jobarea == '') {
            //δ�鵽����
        }
        jobarea = jobarea.split(',');
        var jobareastr = '';
        if(jobarea.length == 1) {
            jobareastr = jobarea[0];
        } else {
            jobareastr = jobarea[0];
            for(var i=1; i<jobarea.length; i++) {
               jobareastr = jobareastr + ',' +jobarea[i];
            }
        }
		var url = 'search_result.php?lang=c&funtype=0000&fromType=18&issuedate=1&jobarea=' + jobareastr;
		url = url + '&industrytype=' + indtype;
        zzSearch.checkURL(url);
	}


	pt.formSub = function( frm ) {
		if ( frm.searchname && frm.searchname.isSub ) {

			frm.action = this.cfg.domain.my + '/sc/' + ( 'e' == this.cfg.lang ? 'esc/' : '' ) + 'my_se.php?save=save';
		}
		else {

			if ( this.searchForm == frm ) {
				this.delQsrgjz();
					var pekf = '������ؼ���,����ѡ��ְ�����/��ҵ���/�����ص�!';
					var kwBool = frm.keyword.value.trim() != '';
					var jaBool = frm.jobarea.value && (frm.jobarea.value != '000000,00');
					var ftBool = frm.funtype.value && frm.funtype.value != '0000';
					var itBool = frm.industrytype.value && frm.industrytype.value != '00';
					if ( !kwBool && !jaBool && !ftBool && !itBool ) {
						// alert( pekf );
						// frm.keyword.focus();
						// return false;
					}
			}
			frm.action = this.getSearchResultHref( frm );
		}

		frm.submit();
	}



	pt.jumpPage = function( pageHref ) {
		if ( 'search_result.php' == this.cfg.fileName ) {
			var tmp;
			if( tmp = /([\d]+)\.html/.exec( pageHref ) ) {
				this.pageFormSub( { curr_page : tmp[1] , fromType : 14 } );
			}
			else
			{
				window.location.href = pageHref;
			}
		}
		else {
			this.selJobPageFormSub( pageHref );
		}

	}

	pt.selJobPageFormSub = function( href ) {
		this.selJobPageForm.target = '_self';
		this.selJobPageForm.action = href;
		this.selJobPageForm.submit();
	}

	//���ְλ����
	pt.relatedJobsSearch = function(keyword){
		this.delQsrgjz();
		this.searchForm.fromType.value = 72;
		this.searchForm.keyword.value = keyword;
		this.formSub( this.searchForm );
	}

	pt.hotKeywordSearch = function( keyword ) {
		this.delQsrgjz();
		this.searchForm.fromType.value = 3;
		this.searchForm.keyword.value = keyword;
		this.formSub( this.searchForm );
	}
    /**/
	pt.hotDibiaoSearch = function( jobarea , address , line ) {
		this.delSrdz();
		for ( var i = 0 ; i < this.searchForm.jobarea.length ; i++ ) {
			this.searchForm.jobarea[i].checked = jobarea == this.searchForm.jobarea[i].value ? true : false;
		}
		this.searchForm.fromType.value = 20;
		this.searchForm.address.value = address.replace(/<\/?B[^>]*>/gi,'');
		this.searchForm.radius.value = '0.03';
		if(line)
		{
			this.searchForm.line.value = line;
		}
		document.getElementsByName('landmark')[1].checked = true;
		this.searchRadiusChange();
		this.formSub( this.searchForm );
	}

	pt.delSrdz = function() {
		var kwd = this.searchForm.address;
		if ( '�������ַ' == kwd.value ) {
			kwd.value = '';
			kwd.style.color = '#000000';
		}
	}


	pt.applySelectedJobs = function() {
		this.operateSelectedJobs( {
			url : this.cfg.domain.my + '/sc/' + this.cfg.langs.sqzwml + '/applyjob.php' ,
			prefix : '(' ,
			suffix : ')' ,
			isJobview : true
		} );
	}

	pt.putInMyJobFolder = function( event ) {
		this.operateSelectedJobs( { event : event } );
	}

	pt.operateSelectedJobs = function(param) {
		var jobiduni = this.getSelectedJobids(this.pageForm);
		if ( '' == jobiduni ) {
			alert( this.cfg.langs.qzzwqdg );
			return false;
		}
		if ( param.isJobview ) {
			this.jobview( jobiduni );
		}

		jobiduni = ( param.prefix || '' ) + jobiduni + ( param.suffix || '' );
		if ( param.event ) {
			if ( jobiduni.split( ',' ).length > 100 ) {
				alert( '�Բ���ÿ������ղ�100��ְλ��������ѡ��' );
				return false;
			}
			this.saveJobClk( jobiduni , param.event );
		}
		else {
			if ( /applyjob.php$/.test( param.url ) && jobiduni.split( ',' ).length > 45 ) {
				alert( '�Բ���ÿ�����Ͷ��45��ְλ��������ѡ��' );
				return false;
			}
			this.pageJumpForm.jobiduni.value = jobiduni;
			this.pageJumpForm.action = param.url;
			this.pageJumpForm.submit();
		}
	}


  pt.initNewMajorLayer = function() {
		var param = { cfg : this.cfg , openNodes : this.searchForm.btnSubMajor , _textNodes : this.searchForm.btnSubMajor , _valueNodes : this.searchForm.SubMajor , selValues : this.searchForm.SubMajor.value , shouldInit : false };
		this.maLayer = new NewMajorLayer( param );
	}

	pt.initNewMajorLayer2 = function() {
		var param = { cfg : this.cfg , openNodes : this.searchForm.inputTopMajor , _textNodes : this.searchForm.inputTopMajor , _valueNodes : this.searchForm.TopMajor , selValues : this.searchForm.TopMajor.value , shouldInit : false };
		this.maLayer = new NewMajorLayer( param );
	}

	pt.initNewMajorLayerInteraction = function() {
		var param = { cfg : this.cfg , openNodes : this.searchForm.selectMajor , _textNodes : this.searchForm.selectMajor , _valueNodes : this.searchForm.major , selValues : [this.searchForm.major.value] , shouldInit : true };
		this.maLayer = new NewMajorLayer( param );
	}

	pt.initIndtypeLayer = function() {
		var param = { cfg : this.cfg , openNodes : this.searchForm.btnIndustrytype , _textNodes : this.searchForm.btnIndustrytype, _valueNodes : this.searchForm.industrytype , selValues : this.searchForm.industrytype.value , shouldInit : false };
		this.itLayer = new IndtypeLayer( param );
	}

	pt.openRelatedSearchLayer = function( field ) {
		var thisObj = this;
		if ( !this.relatedSearchLayer ) {
			var param = {
				cfg : cfg ,
				isMulty : false ,
				data : fk ,
				headTitle: '' ,
				colNum : 3 ,
				getSubValues : function(){ return []; } ,
				isHasNolimit : false ,
				confirmFunc : function( _values ) {
					var param = {};
					param.jobarea = _values[0].substr( 0 , 6 );
					param[this.field] = _values[0].substr( 6 );
					param['curr_page'] = 1;
					thisObj.pageFormSub( param , true );
				}
			};
			this.relatedSearchLayer = new JobLayer( param );
			this.relatedSearchLayer.field = field;
		}
		this.relatedSearchLayer.open();
	}

	pt.switchRefineMenu = function( obj ) {
		if ( 'refineNavOn' == obj.className ) {
			obj.className = 'refineNavOff';
			obj.nextSibling.style.display = 'none';
		}
		else {
			obj.className = 'refineNavOn';
			obj.nextSibling.style.display = '';
		}
	}

	pt.switchListType = function( img , trbgcolor ) {
		var tr0 = img.parentNode.parentNode;
		var tbl = tr0.parentNode.parentNode;
		var tr1 = tbl.rows[tr0.rowIndex + 1];
		var tr2 = tbl.rows[tr0.rowIndex + 2];
		if ( 'none' == tr1.style.display ) {
			var suf = 'up';
			var disp = '';
			var overOut = true;
		}
		else {
			var suf = 'down';
			var disp = 'none';
			var overOut = false;
		}
		img.src = img.src.replace( /((down)|(up))\.gif$/ , suf + '.gif'  );
		tr1.style.display = tr2.style.display = disp;
		this.switchListBg( tr0 , trbgcolor , overOut );
	}

	pt.switchListBg = function( tr , trbgcolor , overOut ) {
		var tbl = tr.parentNode.parentNode;
		var i = tr.className.charAt( 2 );
		var k = tr.rowIndex;
		var tr0 = tbl.rows[k - i] , tr0bg;
		var tr1 = tbl.rows[k - i + 1] , tr1bg;
		var tr2 = tbl.rows[k - i + 2] , tr2bg;
		var ljsqGif , disp;
		if ( overOut && '' == tr1.style.display ) {//���������չ��
			tr0bg = 'url(' + this.cfg.url.image_search + '/jggl.gif)';
			tr1bg = '';
			tr2bg = '';
			ljsqGif = 'ljsq.gif';
			disp = '';
		}
		else {
			tr0bg = tr1bg = tr2bg = trbgcolor;
			ljsqGif = 'ljsq1.gif';
			disp = 'none';
		}
		tr0.style.background = tr0bg;
		tr1.style.background = tr1bg;
		tr2.style.background = tr2bg;
		var imgs = tr1.getElementsByTagName( 'img' );
		imgs[imgs.length - 1].src = this.cfg.url.image_search + '/' + ljsqGif;
		var p = tr2.getElementsByTagName( 'p' );
		p[0].style.display = disp;
	}

	pt.switchListBgNew = function( tr , trbgcolor , overOut ) {
		var tbl = tr.parentNode.parentNode;
		var i = tr.className.charAt( 2 );
		var k = tr.rowIndex;
		var tr0 = tbl.rows[k - i] , tr0bg;
		var tr1 = tbl.rows[k - i + 1] , tr1bg;
		var tr2 = tbl.rows[k - i + 2] , tr2bg;
		var ljsqGif , disp, fontcolor;
		if ( overOut && '' == tr1.style.display ) {//���������չ��
			tr0bg = 'url(' + this.cfg.url.image_search + '/jggl.gif)';
			tr1bg = '';
			tr2bg = '';
			ljsqGif = 'ljsq.gif';
			disp = '';
			fontcolor = '#0265C2';
		}
		else {
			tr0bg = tr1bg = tr2bg = trbgcolor;
			ljsqGif = 'ljsq1.gif';
			disp = '';
			fontcolor = '#FF7300';
		}
		tr0.style.background = tr0bg;
		tr1.style.background = tr1bg;
		tr2.style.background = tr2bg;
		var imgs = tr1.getElementsByTagName( 'img' );
		imgs[imgs.length - 1].src = this.cfg.url.image_search + '/' + ljsqGif;
		var p = tr2.getElementsByTagName( 'p' );
		var s = p[0].getElementsByTagName( 'span' );
		s[0].style.color = fontcolor;
		s[1].style.color = fontcolor;
	}

	pt.initListTrOverOut = function() {
		var tbl = this._( 'resultList' );
		var thisObj = this;
		for ( var i = 0 ; i < tbl.rows.length ; i++ ) {
			if ( /^tr[012].*$/.test( tbl.rows[i].className ) ) {
				tbl.rows[i].trbgcolor = tbl.rows[i].bgColor;
				tbl.rows[i].onmouseover = function() { thisObj.switchListBgNew( this , this.trbgcolor , true ); };
				tbl.rows[i].onmouseout = function() { thisObj.switchListBgNew( this , this.trbgcolor , false ); };
			}
		}
	}

	pt.encodeUrl = function (city, address, lonlat, opentype, coid) {
		var addparam = '';
		if (city.indexOf('��') < 0){
			city=city+'��';
		}
		// ������������coid���� add by solomon 2010.04.07
		if(opentype == '2' && coid){
			addparam = 'coid='+coid+'&';

		}
		if (opentype=='1'){
			window.open('http://api.map.baidu.com/marker?output=html&title=' + encodeURIComponent( city ) + '&content=' + encodeURIComponent( address ) + '&location=' + lonlat, 'ShowMap');
		}else{
			window.open( this.cfg.url.root + '/tranToMap.php?'+addparam+'opentype='+opentype+'&city=' + encodeURIComponent( city ) + '&address=' + encodeURIComponent( address ) + '&lonlat=' + lonlat, 'ShowMap' , 'width=740,height=525,top=50,left=50,resizable=yes' );
		}
	}


	//add 2015-05-08 ����������ʾ���������������ر�
	pt.showcondmore = function( id ) {
		var id = id + '_text';
		document.getElementById(id).style.overflowy = '';
		document.getElementById(id).style.height = 'auto';
		document.getElementById(id+"_more").style.display = 'none';
		document.getElementById(id+"_close").style.display = '';
	};
	pt.showcondclose = function( id ) {
		var id = id + '_text';
		document.getElementById(id).style.overflowy = 'hidden';
		document.getElementById(id).style.height = '24px';
		document.getElementById(id+"_close").style.display = 'none';
		document.getElementById(id+"_more").style.display = '';
	};
	pt.showdistrict = function( cityid , districtid , total ) {
		var id = 'district'+cityid;
		var distid = 'districtdibiao'+cityid;
		for(var i = 0; i < total; i++) {
			$('#'+id+i).removeClass('active');
			$('#'+distid+i).css('display','none');
		}
		$("#"+id+districtid).addClass('active');
		$('#'+distid+districtid).css('display','');

	};


	pt.ShowLine = function( Line ) {
		var maxLineNum=100;
		this._( 'LineFont0' ).style.color = Line == 0 ? '#ff7300' : '#266EBA';
		this._( 'LineFont0' ).style.fontWeight = Line == 0 ? 'bold' : 'normal';
		//mod by ian 2015-05-11-10
		if( Line != 0){
			// this._( 'line_text' ).style.height = 'auto';
			// this._( 'line_text' ).style.overflowy = '';
		}else {

		}


		//maxLineNum ��ֵ�� in/js/2009/line.js���屣��ͬ��
		for(var i = 1; i <= maxLineNum; i++ )
		{
			if(!this._( 'Line' + i )) break;
			this._( 'Line' + i ).style.display = Line == i ? '' : 'none';
			this._( 'LineFont' + i ).style.color = Line == i ? '#ff7300' : '#266EBA';
			this._( 'LineFont' + i ).style.fontWeight = Line == i ? 'bold' : 'normal';
		}
	}

	//var myUrl = this.cfg.root + '/saveJob.php?' + Math.random()+'&jsoncallback=?';
	//modify by robin 2009-11-10
	pt.saveJobAreaCookie = function( jobarea ) {
		var thisObj = this;
		var myUrl = this.cfg.domain.search + '/jobsearch/mapbar/SaveJobAreaCookie.php?type=1&jobarea='+jobarea+'&ran=' +  Math.random();
		$.ajax( {
				type: 'get' ,
				url: myUrl ,//һ������������ֹ����
				data: { } ,
				error: function () {
					} ,
				success: function ( data ) {
				}
			}
		);
	}


	/*********ְλ�ղ� start**********/
	pt.saveJobClk = function( jobiduni , event  ) {
		event = event || window.event;
		var thisObj = this;
		var e = { clientX : event.clientX , clientY : event.clientY };
		var sUrl = 'http://login.51job.com/ajax/islogin.php?jsoncallback=?';
		$.getJSON(sUrl , {} ,function(status){
			thisObj.saveJobClkBack( status.result , jobiduni , e );
		});
	}

	pt.saveJobClkBack = function( status , jobiduni , event ) {
		var thisObj = this;
		if ( status != 1 )
		{
			var lang = $("#top_login_language").val();
			if(lang == "en"){
				var language = "EN";
			}else{
				var language = "CN";
			}
			var callback = function(){
									zzSearch.saveJob( jobiduni , event );
								};

				ShowPassportLayer(language,callback);
		}
		else {
			this.saveJob( jobiduni , event );
		}
	}

	//var myUrl = this.cfg.root + '/saveJob.php?' + Math.random()+'&jsoncallback=?';
	pt.saveJob = function( jobiduni , event ) {
		var thisObj = this;
		var myUrl = this.cfg.domain.my + '/AjaxAction/my/JobFoAction.php?type=add&jobiduni=(' + jobiduni + ')&ran=' +  Math.random() + '&jsoncallback=?';
		var jobids = jobiduni.split( ',' );
		//prompt( 1 , myUrl );
		//alert( myUrl );
		try {
			$.getJSON( myUrl , {} , function( data ) {
				if ( data && data.status == true ) {
					if ( data.jobarr.length ) {//�����Ѵ���
						if ( 1 == jobids.length ) {
							var sugg = '��ְλ֮ǰ���������ղؼ��ڣ������ٴ��ղأ���л����ʹ�ã�';
						}
						else {
							if ( data.jobarr.length < jobids.length ) {
								var sugg = '����ְλ���ղسɹ�������ְλ֮ǰ���������ղؼ��ڣ������ٴ��ղأ���л����ʹ�ã�';
							}
							else {
								var sugg = '��ѡ�е�ְλ֮ǰ���������ղؼ��ڣ������ٴ��ղأ���л����ʹ�ã�';
							}
						}
					}
					else {//ȫ���ɹ�
						thisObj.showMemo( jobiduni , event );
					}
				}
				else {//ȫ��ʧ��
					var sugg = '�Բ��������ղ�ʧ��!';
				}
				if ( sugg ) {
					alert( sugg );
				}
			});
		}
		catch ( e ) {
			alert( e );
		}

	}

	pt.showMemo = function( jobiduni , event ) {
		var thisObj = this;
		if ( !this.memoLayer ) {
			var content = '<div class="panel_lnp panel_py"><h2><p>��ʾ</p><a id="memoLayerClose" href="javascript:void(0);"><i></i></a></h2><div class="pannel_body"><p class="p center title"><strong class="tstrong">��ϲ���ղسɹ���</strong></p><div class="tagbox"><div class="e"><label>���ñ�ǩ��</label><p class="tags"><span><a href="javascript:void(0);" name="saveJobslabelBtn">��ϲ��</a></span><span><a href="javascript:void(0);" name="saveJobslabelBtn">����Ȥ</a></span><span><a href="javascript:void(0);" name="saveJobslabelBtn">���ῴ</a></span></p></div><div class="e"><label class="l2">ְλ��ע��</label><textarea class="input" style="width:280px; height:80px;"></textarea></div></div><center><a id="saveJobBtn" align="absmiddle" href="javascript:void(0);"  class="panel_btn_s">����</a></center></div></div>';

			this.memoLayer = new ExtZzLayer( { content : content , openType : 2 , closeNode : 'memoLayerClose' } );
			this.memoLayer.memoTextarea = this.memoLayer.div.getElementsByTagName( 'textarea' )[0];

			var btns = document.getElementsByName('saveJobslabelBtn');

			for ( var i = 0 ; i < btns.length ; i++ ) {
				btns[i].onclick = function() {
					thisObj.memoLayer.memoTextarea.value = this.innerHTML;
				}
			}
			this._( 'saveJobBtn' ).onclick = function() {
				if ( thisObj.memoLayer.memoTextarea.value.getLen() > 30 ) {
					alert( '��ע���ܳ���15�����֡�' );
					thisObj.memoLayer.memoTextarea.focus();
					return false;
				}
				var myUrl = thisObj.cfg.domain.my + '/AjaxAction/my/JobFoAction.php?type=memo&jobiduni=(' + thisObj.memoLayer.jobiduni + ')&memo=' + thisObj.memoLayer.memoTextarea.value + '&ran=' +  Math.random() + '&jsoncallback=?';
				//prompt( 1 , myUrl );
				//alert( myUrl );
				$.getJSON( myUrl , {} , function( data ) {
				});
				thisObj.memoLayer.close();
			}
			this._( 'saveJobBtn' ).style.cursor = 'pointer';
		}

		//�����Զ����ش���
		if ( this.showMemoTimtout ) {
			clearTimeout( this.showMemoTimtout );
		}
		this.showMemoTimtout = setTimeout( function() {
			thisObj.memoLayer.close();
		} , 3000 );
		this.bindEvent( this.memoLayer.div , 'click' , function() { clearTimeout( thisObj.showMemoTimtout ); } );

		this.memoLayer.memoTextarea.value = '';
		this.memoLayer.jobiduni = jobiduni;
		this.memoLayer.open( event );
	}
	/*********ְλ�ղ� end**********/

	pt.openAdviceLayer = function() {
		var thisObj = this;
		if (!this.adviceLayer) {
			var content = '<div class="panel_lnp panel_fb"><h2><p id="advice_drag">�û�����</p><a href="javascript:void(0)" id="advice_close"><i></i></a></h2><div class="pannel_body"><form name="subAdvice" method="post" action=""><div class="el"><label>�������<span class="dw_c_alert">*</span></label><textarea name="content" rows="4" placeholder="���ÿһ����������Ƕ�����Ҫ��ƪ�����ޣ��������200�����ڣ�"></textarea><p class="" id="advice_alert" style="color:#000;line-height:22px;display:none;">�����뷴������</p></div><div class="el"><label>��ϵ��ʽ</label><input class="intxt" type="text" maxlength="50" name="contact" placeholder="ѡ��Ա����ǻظ���" value="'+ $('#advice_email').val() +'"></input><p class="" id="contact_alert" style="color:#000;line-height:22px;display:none;"></p></div><center><a class="panel_btn_s" id="advice_submit" href="javascript:void(0);">�ύ</a></center></form></div></div>';

			this.adviceLayer = new ExtZzLayer({ content : content, openType : 2, filterParam : {}, closeNode : 'adviceLayerClose' });
			this.adviceLayer.setDragNode('advice_drag');
			this.adviceLayer.setCloseNode('advice_close');

			function subAdvice() {
				if('' == document.subAdvice.content.value.trim()) {
                    document.subAdvice.content.focus();
                    $('#advice_alert').html('�����뷴������');
                    $('#advice_alert').show();
                    $('#advice_alert').addClass('note dw_c_alert');
					return false;
				}
				len = document.subAdvice.content.value.length;
                contact_len = document.subAdvice.contact.value.length;
				if(len > 200){
                    $('#advice_alert').html('����д�����ݳ����������ƣ��������200������');
                    $('#advice_alert').show();
                    $('#advice_alert').addClass('note dw_c_alert');
					return false;
				}
                if(contact_len > 50){
                    $('#contact_alert').html('����д�����ݳ����������ƣ��������200������');
                    $('#contact_alert').show();
                    $('#contact_alert').addClass('note dw_c_alert');
					return false;
				}

				$.ajax({
					url: thisObj.cfg.url.root + '/ajax/save_advice.php?' + Math.random(),
					type: 'POST',
                    dataType: 'text',
					data: {'content' : document.subAdvice.content.value, 'contact' : document.subAdvice.contact.value},
                    success: function($data) {
                        if ($data == 1) {
                            alert('����ύ�ɹ���лл����֧��');
                            thisObj.adviceLayer.close();
                        } else {
                            alert('�Բ�������ύʧ�ܣ����Ժ����ԣ�лл��');
                        }
                    },
                    error: function() {
                            alert('�Բ�������ύʧ�ܣ����Ժ����ԣ�лл��');
                        }
                    });
				return false;
			}

			document.subAdvice.onsubmit = function(){return false;};
            document.subAdvice.content.onkeydown = function(){
                if (document.subAdvice.content.value.length + 1) {
                    $('#advice_alert').removeClass("note dw_c_alert");
                    $('#advice_alert').hide();
                }
            }

			this._('advice_submit').onclick = subAdvice;

		}

		this.adviceLayer.open();
        document.subAdvice.content.value = '';
        document.subAdvice.contact.value = $('#advice_email').val();
        $('input').placeholder();
        $('textarea').placeholder();
        $('#advice_alert').removeClass("note dw_c_alert");
        $('#advice_alert').hide();
	}

	pt.switchFunIndBtnDisp = function( img ) {
		var obj = img.parentNode;
		if ( 'none' == obj.firstChild.style.display ) {
			var kwdAdvDisp1 = '';
			var kwdAdvDisp2 = 'none';
			var stype = 2;
		}
		else {
			var kwdAdvDisp1 = 'none';
			var kwdAdvDisp2 = '';
			var stype = 1;
		}
		var kwdAdvDispPot = this._( 'kwdAdvDispPot' );
		kwdAdvDispPot.style.display = kwdAdvDispPot.nextSibling.style.display = obj.firstChild.style.display = kwdAdvDisp1;
		obj.childNodes[1].style.display = kwdAdvDisp2;
		this.searchForm.stype.value = stype;
		if ( !this.funIndPClked && '' == obj.firstChild.style.display ) {
			this.ftLayer.onFunc();
			this.itLayer.onFunc();
			if(this.maLayer){
				this.maLayer.onFunc();
			}
		}
		this.funIndPClked = true;
	}



    //
    pt.kwdSearchData = [];
    /*
     *add by ian 2015-08-06
     *�ؼ�������ajax
    */

    pt.kwdSearch = function() {
        var url = 'http://kwdsrv.51job.com/KwdSrvByKey/default.aspx?';
        var kwdType = zzSearch.searchForm.keywordtype.value;
        var arr = new Array("Job", "51jobcompany", "51joball");
        var kwd = escape(zzSearch.searchForm.keyword.value);
        url = url + 'src=' + arr[kwdType] + '&kwd=' + kwd + '&callback=?';
        var str = '';
        var key = kwd + '_' + kwdType;
        if(typeof(zzSearch.kwdSearchData[key]) !== 'undefined') {
            document.getElementById('kwdselectid').setAttribute('preval', kwd);
            zzSearch.kwdSearchShow(zzSearch.kwdSearchData[key]);
        } else {
            if(kwd == '') {
                //�ؼ���ɾΪ��ʱ����ʾ����
                $('#searchHistory').show();
                $('#KwdSearchResult').hide();
                return;
            }
            $.getJSON(url,function(data){
                if ('1' == data.message)
                {
                    if ('' != data.content)
                    {
                        zzSearch.kwdSearchData[key] = unescape(data.content).split("\t");
                    }else{
                        zzSearch.kwdSearchData[key] = '';
                    }
                }
                document.getElementById('kwdselectid').setAttribute('preval', kwd);
                zzSearch.kwdSearchShow(zzSearch.kwdSearchData[key]);
            });

        }

    }

    pt.kwdSearchShow = function(data) {
        if(data.length == 0) {
            //��������ʱ��ֹ��������ʧ
            if(document.getElementById('kwdselectid').getAttribute('preval') != zzSearch.searchForm.keyword.value) {
                $('#KwdSearchResult').hide();
            }
            return;
        }
        var str = '<span class="type key">��عؼ���</span>';
        var tmp = '';
        //TODO �Ƿ���Ҫ��ȡ��󳤶�
        $.each(data, function(i,result){
            str += '<a href="javascript:void(0);" onclick="zzSearch.kwdGoSearch(\''+result+'\');" >'+ result +'</a>';
        });
        $('#KwdSearchResult').html(str);
        $('#KwdSearchResult').show();
    }

    pt.kwdGoSearch = function(data) {
        document.getElementById('kwdselectid').value = data;
        zzSearch.formSub(zzSearch.searchForm);
    }

    //add by ian 2015-08-07
    // AJAX��������򰴼�����
    pt.kwdSearchOperate = function(e) {
        var obj = $('#kwdselectid');
        var resultObj = $('#KwdSearchResult');
        var resultList = $('#KwdSearchResult a');
        var maxIndex = resultList.length - 1;//�����������
        var i = parseInt(obj.attr('vindex'));
        var k = e.keyCode;
        var text = '';
        this.isUp = function() { return k == 38;}
        this.isDown = function(){ return k == 40;}
        this.isRight = function(){ return k == 39;}
        if(this.isUp() || this.isDown()) {
            //���¼�����
            if(i == -1) {//�µ��������δ�������¼�ѡ��
                if(this.isUp()) {
                    i = maxIndex;
                } else if(this.isDown()) {
                    i = 0;
                }

            } else {
                //����ѡ�е�index iֵ
                if(this.isDown()) {
                    if(i == maxIndex){
                        i = 0;
                    } else {
                        i++;
                    }
                } else if(this.isUp()) {
                    if(i == 0){
                        i = maxIndex;
                    } else {
                        i--;
                    }
                }

            }

            $(resultObj).children().removeClass('active');
            $(resultList[i]).addClass('active');
            text = $(resultList[i]).html();
            text = text != '' ? text.replace(/<span.*<\/span>/,''): '';
            //����IE
            text = text != '' ? text.replace(/<SPAN.*<\/SPAN>/,''): '';
            obj.val(text);//��keyword��ֵ
            $('#KwdSearchResult').show();
            obj.attr('vindex',i);
        } else if(this.isRight()) {
            if(i == -1) {
                return;
            }
            //�Ҽ�����
            zzSearch.kwdSearch();
        }
    }



	//ְλ�����ͳ��
	pt.jobview = function( jobiduni ) {
		if ( !this.cfg.isJobview ) {
			return false;
		}
		if ( !this.jobviewImgs ) {
			this.jobviewImgs = [];
			for ( var i = 0 ; i < 3 ; i++ ) {
				var _img=document.createElement('img');
				_img.width = _img.height = 0;
				_img.style.display = 'none';
				document.body.appendChild( _img );
				this.jobviewImgs.push( _img );
			}
			this.currJobviewImgIndex = 0;
		}
		this.currJobviewImgIndex = ( this.currJobviewImgIndex + 1 ) % this.jobviewImgs.length;
		this.jobviewImgs[this.currJobviewImgIndex].src = this.cfg.url.root + '/jobview.php?jobiduni=' + jobiduni + '&' + Math.random();
	}



	//����ְλ��ʾ����
	pt.relatedJobMore = function(more){
		if(more){
			this._('relatedJobMoreShowBtn').style.display = 'none';
			this._('relatedJobs').style.display = '';
		}else{
			this._('relatedJobMoreShowBtn').style.display = '';
			this._('relatedJobs').style.display = 'none';
		}
	}


	pt.DisttictShow = function(show,num){
		var more = 'more'+num;
		var dnum = 'moreDistrict'+num;
		if(show)
		{
			this._(more).style.display = 'none';
			this._(dnum).style.display = '';
		}else
		{
			this._(more).style.display = '';
			this._(dnum).style.display = 'none';
		}
	}

	//�رյ���������ʾ����
	pt.closeTips = function () {
		$.ajax( {
			url: this.cfg.url.root + '/closeTip.php?' + Math.random() ,
			error: function () {} ,
			success: function () {}
		} );
		this._('tips').style.display = 'none';
	}

	pt.showTips = function () {
		var obj = this._('Lineline');
		if(this._('tips'))
		{
			var t=obj.offsetTop;
		    var l=obj.offsetLeft;
		    while( obj=obj.offsetParent ){
				l += obj.offsetLeft;
				t += obj.offsetTop;
			}
			this._('tips').style.top = (t - 100) + 'px';
			this._('tips').style.left = (l + 47) + 'px';
			this._('tips').style.display = '';
		}
	}

	pt.initAutoGrassrootsCom = function() {
		if ( !/51job\.com$/.test( document.domain ) ) {//�ж�����,ֻ�ж���������ͬ�ŷ���������ajax
			return false;
		}
		//����iframe����
		window.ajaxIfr = document.createElement( 'iframe' );
		ajaxIfr.style.display = 'none';
		ajaxIfr.src = 'http://kwdsrv.51job.com/kwdAjaxIframe.html';
		document.body.appendChild( ajaxIfr );
		window.ajaxIfr = ajaxIfr;

		var kwdProVideUrl = 'http://kwdsrv.51job.com/Default.aspx?kwdType=3';

		window.iDp = [];

        iDp[0] = new DataProvide( kwdProVideUrl , this.cfg.lang );

		var kwdObj = [this.searchForm.keyword];
		var thisSearchObj = this;
		var clkFunc = [function() { thisSearchObj.formSub( thisSearchObj.searchForm ); }];
		var onSetVal = [function() { thisSearchObj.searchForm.fromType.value = 41; }];
		var inpKeydown = function( event ) {
			event = event || window.event;
			var input = event.srcElement || event.target;
			input.iLastValue = input.value;
		};
		var inpKeyup = function( event ) {
			event = event || window.event;
			var input = event.srcElement || event.target;
			if ( input.value != input.iLastValue  ) {
				if ( event.keyCode < 37 || event.keyCode > 40 ) {
					thisSearchObj.searchForm.fromType.value = 41;
				}
			}
		};
		var kwdLen = kwdObj.length;
		for ( var i = 0 ; i < kwdLen ; i++ ) {
			iPush( [kwdObj[i] , iDp[0] , clkFunc[i] , onSetVal[i]] );
		}
	}
	pt.showMapIframe = function(url,title) {
		var iframeinfo = "<div class=\"showMapLayer\" ><p  id= 'mapdrag' class=\"showMapLayer_title\"><span class='showMapLayer_title_info'>"+title+"</span><span class=\"showMapLayer_title_close\" id=\"map_window_close\"><img src=\"http://img01.51jobcdn.com/im/2009/emy/folder/icon_close.gif\" align=\"absmiddle\" /></span></p><div  class='showMapIframe' > \
		<iframe frameborder='no' border='0' src='"+url+"'></iframe>\
		</div></div>";

		var maplayer = {
			content:  iframeinfo,
			openType: 2 ,
			filterParam : {}
		}
		if(!window.mapiframelayer){
			window.mapiframelayer = new ExtZzLayer( maplayer );
			mapiframelayer.setCloseNode('map_window_close');
			mapiframelayer.setDragNode('mapdrag');
		}
		mapiframelayer.open();
	}



})();
