 
var kwdSearchData = [];

function kwdSearch() 
{
    var url = 'http://kwdsrv.51job.com/KwdSrvByKey/default.aspx?';
    var kwdType = $('#keywordtype').val();
    var arr = new Array("Job", "51jobcompany", "51joball");
    var kwd = escape($('#kwdselectid').val());
    url = url + 'src=' + arr[kwdType] + '&kwd=' + kwd + '&callback=?';
    var str = '';
    var key = kwd + '_' + kwdType;
    if(typeof(kwdSearchData[key]) !== 'undefined') {
        document.getElementById('kwdselectid').setAttribute('preval', kwd);
        kwdSearchShow(kwdSearchData[key]);
    } else {
        if(kwd == '') {
            //关键词删为空时，显示急招
            $('#searchHistory').show().parents('.c,.box,.top_wrap,.wrap,.cup').css("z-index", "4");
            $('#KwdSearchResult').hide();
            return;
        }
        $.getJSON(url,function(data){
            if ('1' == data.message)
            {
                if ('' != data.content)
                {
                    kwdSearchData[key] = unescape(data.content).split("\t");
                }else{
                    kwdSearchData[key] = '';
                }
            }
            document.getElementById('kwdselectid').setAttribute('preval', kwd);
            kwdSearchShow(kwdSearchData[key]);
        });

    }

}

function kwdSearchShow(data) 
{
    var sLang = $("#language").length > 0 ? $("#language").val() : "c";
    if(data.length == 0) {
        //输入中文时防止搜索框消失
        if(document.getElementById('kwdselectid').getAttribute('preval') != $('#kwdselectid').val()) {
            $('#KwdSearchResult').hide();
        }
        return;
    }
    var str = '<span class="tl off"><span class="bg b_key">'+(sLang == "e" ? "Keywords" : "相关关键字")+'</span></span>';
    var tmp = '';
    var reg = new RegExp("'","g");
    //TODO 是否需要截取最大长度
    $.each(data, function(i,result){
        str += '<span class="li" onclick="kwdGoSearch(\''+result.replace(reg, '\\\'')+'\');" >'+ result +'</span>';
    });
    $('#KwdSearchResult').html(str);
    $('#KwdSearchResult').show().parents('.c,.box,.top_wrap,.wrap,.cup').css("z-index", "4");
}



// AJAX搜索结果框按键操作
function kwdSearchOperate(e) 
{
    var obj = $('#kwdselectid');
    var resultObj = $('#KwdSearchResult');
    var resultList = $('#KwdSearchResult span.li');
    var maxIndex = resultList.length - 1;//搜索结果总数
    var i = parseInt(obj.attr('vindex'));
    var k = e.keyCode;
    var text = '';
    this.isUp = function() { return k == 38;}
    this.isDown = function(){ return k == 40;}
    this.isRight = function(){ return k == 39;}
    if(this.isUp() || this.isDown()) {
        //上下键操作
        if(i == -1) {//新的搜索结果未按过上下键选择
            if(this.isUp()) {
                i = maxIndex;
                resultObj.scrollTop(resultList.length * 30);
            } else if(this.isDown()) {
                i = 0;
                resultObj.scrollTop(0);
            }

        } else {
            //设置选中的index i值
            if(this.isDown()) {
                if(i == maxIndex){
                    i = 0;
                    resultObj.scrollTop(0);
                } else {
                    i++;
                    if($(resultList[i]).position().top>180)
                    {
                        resultObj.scrollTop(resultObj.scrollTop() + 27);
                    }
                }
            } else if(this.isUp()) {
                if(i == 0){
                    i = maxIndex;
                    resultObj.scrollTop(resultList.length * 30);
                } else {
                    i--;
                    if($(resultList[i]).position().top<0)
                    {
                        resultObj.scrollTop(resultObj.scrollTop() - 27);
                    }
                }
            }

        }

        $('#KwdSearchResult span.li').removeClass('on');
        $($('#KwdSearchResult span.li')[i]).addClass('on');
        text = $($('#KwdSearchResult span.li')[i]).html();
        obj.val(text);//给keyword赋值
        $('#KwdSearchResult').show().parents('.c,.box,.top_wrap,.wrap,.cup').css("z-index", "4");
        obj.attr('vindex',i);
    } else if(this.isRight()) {
        if(i == -1) {
            return;
        }
        //右键操作
        kwdSearch();
    }
}

function kwdGoSearch(keyword)
{
    var ind = '00';
    var fun = '0000';
    var jobarea = '000000';
    var specialarea = '00';
    var keywordtype = '2';
    var workyear = '99';
    var cottype = '99';
    var degreefrom = '99';
    var jobterm = '99';
    var companysize = '99';
    var providesalary = '99';
    var postchannel = '0000';
    
    if ($('#indtype_code').length == 1 && $('#indtype_code').val() != '') ind = $('#indtype_code').val();
    if ($('#funtype_code').length == 1 && $('#funtype_code').val() != '') fun = $('#funtype_code').val();
    if ($('#jobarea').length == 1 && $('#jobarea').val() != '') jobarea = $('#jobarea').val();
    if ($('#keywordtype').length == 1 && $('#keywordtype').val() != '') keywordtype = $('#keywordtype').val();
    if (keyword == '') keyword = ' ';
    if ($('#cottype').length == 1 && $('#cottype').val() != '') cottype = $('#cottype').val();
    if ($('#workyear').length == 1 && $('#workyear').val() != '') workyear = $('#workyear').val();
    if ($('#providesalary').length == 1 && $('#providesalary').val() != '') providesalary = $('#providesalary').val();
    if ($('#companysize').length == 1 && $('#companysize').val() != '') companysize = $('#companysize').val();
    if ($('#degreefrom').length == 1 && $('#degreefrom').val() != '') degreefrom = $('#degreefrom').val();
    if ($('#jobterm').length == 1 && $('#jobterm').val() != '') jobterm = $('#jobterm').val();
    if (window.location.pathname == "/default-xs.php") postchannel = '0100';
    
    if($("#includeAround").length > 0 && $("#includeAround").is(":checked"))
    {
        var areaArr = jobarea.split(",");
        firstArea = areaArr[0];
        if(firstArea == "040000")
        {
            if($.inArray("030800", areaArr) == -1 && $.inArray("030000", areaArr) == -1)
            {
                areaArr.push("030800");
            }
            jobarea = areaArr.join(",");
        }
        else
        {
            var newAreaArr = new Array();
            if(firstArea.length == 6)
            {
                checkitem = firstArea.substr(0, 2) + "0000";
            }
            else if(firstArea == "01")
            {
                checkitem = "030000";
            }
            else
            {
                checkitem = "000000";
            }
            
            newAreaArr.push(checkitem);
            $.each(areaArr, function(i, n){
                if(n.length != 6 || (n.substr(0, 2) + "0000") != checkitem)
                {
                    newAreaArr.push(n);
                }
            });
            jobarea = newAreaArr.join(",");
        }
    }
    if("undefined" != typeof manualTrack && (typeof window.cfg !== "undefined" && (window.cfg.fileName == 'default.php' || window.cfg.fileName == 'default-e.php')))
    {
        var trackChangeParams = {
            cusParam: "1" + String.fromCharCode(22) + keywordtype + String.fromCharCode(22) + $.trim(keyword) + String.fromCharCode(22) + (jobarea == "000000" ? "" : jobarea)
        };
        manualTrack("searchOfHome", trackChangeParams);
    }
    var url = 'http://search.51job.com/list/' + encodeURIComponent(encodeURIComponent(jobarea)) + ',000000,' + encodeURIComponent(encodeURIComponent(fun)) + ',' + encodeURIComponent(encodeURIComponent(ind)) + ',9,99,' + encodeURIComponent(encodeURIComponent(keyword)) + ',' + encodeURIComponent(encodeURIComponent(keywordtype)) + ',1.html?lang=c&stype=&postchannel=' + postchannel + '&workyear=' + workyear + '&cotype=' + cottype + '&degreefrom=' + degreefrom + '&jobterm=' + jobterm + '&companysize=' + companysize + '&providesalary=' + providesalary +'&lonlat=0%2C0&radius=-1&ord_field=0&confirmdate=9&fromType=&dibiaoid=0&address=&line=&specialarea='+ specialarea +'&from=&welfare=';
    window.location = url;
}

function kwdtypeChangeResult(kwdType)
{
    var sLang = $("#language").length > 0 ? $("#language").val() : "c";
    var typeInfo = {"1":sLang == "e" ? "Company" : "公司","2":sLang == "e" ? "Full Text" : "全文"};
    $('#kwdTypeSelUl').html('');
    $('#kwdTypeSelUl1').html('');
    $('#keywordtype').val(kwdType);
    $('#kwdTypeSelUl').html('<li>' + typeInfo[kwdType] + '<em class="dicon Dm"></em></li>');
    $('#kwdTypeSelUl1').html('<li>' + typeInfo[kwdType] + '<em class="dicon Dm"></em></li>');
    $('#kwdTypeSelUl').click(function(event){event.stopPropagation();});
    $('#kwdTypeSelUl1').click(function(event){event.stopPropagation();});
    var content = '';
    for (type in typeInfo) {
        if(kwdType != type) {
            content = '<li><a href="javascript:void(0);" onclick="kwdtypeChangeResult('+type+');">'+typeInfo[type]+'</a></li>';
            $('#kwdTypeSelUl').append(content);
            $('#kwdTypeSelUl1').append(content);
        }
    }
    $('#kwdTypeSelUl').removeClass('on');
    $('#kwdTypeSelUl1').removeClass('on');

}

function hidearr()
{
    var harray = {keywordtype : $('#keywordtype'), history : $('#searchHistory'), kwdresult : $('#KwdSearchResult')};
    $.each(harray, function(name, obj){
        obj.hide();
    });
}

function closeAllFloatDiv()
{
    var p_oJqueryOn = arguments[0] ? arguments[0] : "";
    var p_oJqueryIndex = arguments[1] ? arguments[1] : "";
    var p_oJqueryAssoInput = arguments[2] ? arguments[2] : "";
    $("div[float-on='true']").not(p_oJqueryOn).each(function(){
        $(this).removeClass("on");
        $(this).attr("float-on", "false");
        $(this).removeClass("focusinput");
        //特殊处理下拉框的placeholder
        var placeholderinput = $(this).children("input");
        if(placeholderinput.attr("input-type") == "selectionlist" && placeholderinput.attr("placeholder") != "" && placeholderinput.val() == "")
        {
            placeholderinput.val(placeholderinput.attr("placeholder")).addClass("placeholder");
        }
    });
    $("div[float-on='false']").not(p_oJqueryOn).each(function(){
        $(this).removeClass("focusinput");
    });
     
    $("div[float-index='true']").not(p_oJqueryIndex).each(function(){
        $(this).css("z-index", "0");
        $(this).attr("float-index", "false");
    });
    $("div[layer_float_on='true']").each(function(){
        $(this).css("display", "none");
        $(this).attr("layer_float_on", "false");
    });
    $("input[pre_value='']").not(p_oJqueryAssoInput).each(function(){
        if($(this).hasClass("placeholder"))
        {
            return;
        }
        else
        {
            $(this).val("");
        }
    });
    $("input[pre_code='']").val("");
    
    $('.flboxwp,.ln,.c,.box').css("z-index", "");
    $('.hpBox').removeClass("on").parents('.c,.box,.top_wrap,.wrap,.cup').css("z-index", "");
}

$("html").click(function(){
    closeAllFloatDiv(null, null);
});

$(document).ready(function(){
    var harray = {keywordtype : $('#keywordtype'), history : $('#searchHistory'), kwdresult : $('#KwdSearchResult')};
    var kwdType = $('#keywordtype').val();
    var sLang = $("#language").length > 0 ? $("#language").val() : "c";
    
    switch(kwdType) {
        case "1":
            $('#kwdType').html(sLang == "e" ? "Company" : "公司");
            kwdtypeChangeResult(1);
            break;
        case "2":
            $('#kwdType').html(sLang == "e" ? "Full Text" : "全文");
            kwdtypeChangeResult(2);
            break;
        default:
            $('#kwdType').html(sLang == "e" ? "Full Text" : "全文");
            kwdtypeChangeResult(2);
            break;
    }
    
    $('#kwdTypeSelUl').hover(function(e){
        $('#kwdTypeSelUl').addClass('on').parents('.c,.box,.top_wrap,.wrap,.cup').css("z-index", "4");
    },function(e){
        $('#kwdTypeSelUl').removeClass('on');
    });

    $('#kwdTypeSelUl1').hover(function(e){
        $('#kwdTypeSelUl1').addClass('on').parents('.c,.box,.top_wrap,.wrap,.cup').css("z-index", "4");
    },function(e){
        $('#kwdTypeSelUl1').removeClass('on');
    });

    $('#kwdselectid').keyup(function(e){
        if(e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) {
            return;
        }
        $('#searchHistory').hide();
        kwdSearch();
        // 每次搜索后重置kwdsearchresult选中index值
        document.getElementById('kwdselectid').setAttribute('vindex','-1');
    })

    $('#kwdselectid').keydown(function(e){
        if (e.keyCode == 13) {
            var i = parseInt($('#kwdselectid').attr('vindex'));
            if (i == -1) return;
            kwdGoSearch($($('#KwdSearchResult span.li')[i]).html());
            return;
        }
        if(e.keyCode != 38 && e.keyCode != 39 && e.keyCode != 40) {
            return;
        }
        var evt = window.event || arguments.callee.caller.arguments[0]; // 获取event对象
        var src = evt.srcElement || evt.target; // 获取触发事件的源对象
        if(src.id == 'kwdselectid' && $('#KwdSearchResult').html() != '' && $('#kwdselectid').val() != '') {
            //输入框时候键盘操作，有搜索结果，未上下选择过时右键无效
            kwdSearchOperate(e);
        }
    });
    
    $('#kwdselectid1').keyup(function(e){
        if(e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) {
            return;
        }
        kwdSearch();
        // 每次搜索后重置kwdsearchresult选中index值
        document.getElementById('kwdselectid1').setAttribute('vindex','-1');
    })

    $('#kwdselectid1').keydown(function(e){
        if (e.keyCode == 13) {
            kwdGoSearch($("#kwdselectid1").val());
            return;
        }
    });
    
    //地点
    $("#work_position_click").areaLayer({
        'id'                        : 'work_position_click',
        'code_id'                   : 'jobarea',
        'layer_id'                  : 'work_position_layer',
        'text_id'                   : 'work_position_input',
        'data_multiple'             : true,
        'special_type'              : '2',
        'save_type'                 : '1',
        'data_map'                  : {},
        'layer_after_close'         : function(){
            if($("#work_position_input").val() == "")
            {
                $("#work_position_input").val(sLang == "e" ? "Location" : "工作地点");
            }
            if($("#work_position_input1").length > 0)
            {
                $("#work_position_input1").val($("#work_position_input").val());
            }
        },
        'language'                  : sLang
    });
    if(typeof window.cfg != "undefined" && (window.cfg.fileName == 'default.php' || window.cfg.fileName == 'default-e.php'))
    {
        $("#work_position_click1").areaLayer({
            'id'                        : 'work_position_click1',
            'code_id'                   : 'jobarea',
            'layer_id'                  : 'work_position_layer1',
            'text_id'                   : 'work_position_input1',
            'data_multiple'             : true,
            'special_type'              : '2',
            'save_type'                 : '1',
            'data_map'                  : {},
            'layer_after_close'         : function(){
                if($("#work_position_input1").val() == "")
                {
                    $("#work_position_input1").val(sLang == "e" ? "Location" : "工作地点");
                }
                $("#work_position_input").val($("#work_position_input1").val());
            },
            'language'                  : sLang
        });
    }
    
    if (typeof window.cfg === "undefined" || (window.cfg.fileName != 'default.php' && window.cfg.fileName != 'default-e.php'))
    {
        //职能
        $('#funtype_click').funtypeLayer({
            'id'                        : 'funtype_click',
            'code_id'                   : 'funtype_code',
            'layer_id'                  : 'funtype_layer',
            'text_id'                   : 'funtype_input',
            'save_type'                 : '1',
            'data_multiple'             : true,
            'language'                  : sLang
        });
        
        //行业
        $('#indtype_click').indtypeLayer({
            'id'                        : 'indtype_click',
            'code_id'                   : 'indtype_code',
            'layer_id'                  : 'indtype_layer',
            'text_id'                   : 'indtype_input',
            'save_type'                 : '1',
            'data_multiple'             : true,
            'language'                  : sLang
        });
        if(typeof window.cfg == "undefined" || window.cfg.fileName != 'search_result.php')
        {
            $('#funtype_input').funtypeAssociation({
                'id'                      : 'funtype_input',
                'text_id'                 : 'funtype_input',
                'code_id'                 : 'funtype_code',
                'association_id'          : 'funtype_list',
                'float_on_id'             : 'funtype_div',
                'data_length'             : '1',
                'data_parent_click'       : true,
                'save_type'               : '1',
                'data_multiple'           : true,
                'language'                : sLang
            });
            
            $('#indtype_input').indtypeAssociation({
                'id'                      : 'indtype_input',
                'text_id'                 : 'indtype_input',
                'code_id'                 : 'indtype_code',
                'association_id'          : 'indtype_list',
                'float_on_id'             : 'indtype_div',
                'save_type'               : '1',
                'data_multiple'           : true,
                'language'                : sLang
            });
        }
    }
    
    if (typeof window.cfg != "undefined" && window.cfg.fileName == 'advance_search.php')
    {
        $("#cottype_list").selectionlist({
            'id'                        :'cottype_list',
            'hidden_id'                 :'cottype',
            'data'                      :d_search_cottype
        });
        $("#workyear_list").selectionlist({
            'id'                        :'workyear_list',
            'hidden_id'                 :'workyear',
            'data'                      :d_search_workyear
        });
        $("#providesalary_list").selectionlist({
            'id'                        :'providesalary_list',
            'hidden_id'                 :'providesalary',
            'data'                      :d_search_providesalary
        });
        $("#companysize_list").selectionlist({
            'id'                        :'companysize_list',
            'hidden_id'                 :'companysize',
            'data'                      :d_search_companysize
        });
        $("#degreefrom_list").selectionlist({
            'id'                        :'degreefrom_list',
            'hidden_id'                 :'degreefrom',
            'data'                      :d_search_degreefrom
        });
        $("#jobterm_list").selectionlist({
            'id'                        :'jobterm_list',
            'hidden_id'                 :'jobterm',
            'data'                      :d_search_jobterm
        });
    }
    
    $(document).click(function(e){
        var evt = window.event || arguments.callee.caller.arguments[0]; // 获取event对象
        var src = evt.srcElement || evt.target; // 获取触发事件的源对象
        $.each(harray, function(name, obj){
            obj.hide();
        });

        if(src.id == 'kwdselectid' && $('#kwdselectid').val() == '') {
            $('#searchHistory').show().parents('.c,.box,.top_wrap,.wrap,.cup').css("z-index", "4");
        } else if(src.id == 'kwdselectid' && $('#kwdselectid').val() != '') {
            kwdSearch();
            // 每次搜索后重置kwdsearchresult选中index值
            document.getElementById('kwdselectid').setAttribute('vindex','-1');
            if ($('#KwdSearchResult').children().length > 0)
            {
                $('#KwdSearchResult').show().parents('.c,.box,.top_wrap,.wrap,.cup').css("z-index", "4");
            }
        }else if(src.id == 'kwdselectid1' && $('#kwdselectid1').val() != '') {
            kwdSearch();
            // 每次搜索后重置kwdsearchresult选中index值
            document.getElementById('kwdselectid1').setAttribute('vindex','-1');
            if ($('#KwdSearchResult').children().length > 0)
            {
                $('#KwdSearchResult').show().parents('.c,.box,.top_wrap,.wrap,.cup').css("z-index", "4");
            }
        }
    });
    
    $("#searchHistory").hide();
    $("#KwdSearchResult").hide();
});