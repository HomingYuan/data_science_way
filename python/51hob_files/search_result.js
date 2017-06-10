$(document).ready(function() {

    $(window).scroll(function(){
        var offsetTop = 0;
        if($('.dw_choice').eq(0).hasClass('fix')){
            offsetTop = $('#dw_choice_mk').offset().top;
        }else{
            offsetTop = $('.dw_choice').eq(0).offset().top;
        }

        if($(this).scrollTop() > offsetTop){
            $('#dw_choice_mk').height($('.dw_choice').eq(0).height()+2);
            $('.dw_choice').eq(0).addClass('fix');
        }else{
            $('#dw_choice_mk').height(0);
            $('.dw_choice').eq(0).removeClass('fix');
        }
    });

    $('.dw_filter .el .more').click(function(){//展示更多选项
        var $parent = $(this).parents('.el');
        if($parent.hasClass('on')){
            $parent.removeClass('on');
        }else{
            $parent.addClass('on');
        }
    });
    
    function searchInit() {
        if ( window.Search ) {
            clearInterval( intVal );
            window.zzSearch = new Search( {
                searchForm : document.searchForm ,
                pageForm : document.pageForm ,
                excludeForm : document.excludeForm ,
                pageJumpForm : document.pageJumpForm ,
                selJobPageForm : document.selJobPageForm ,
                cfg : cfg
            } );
            zzSearch.searchForm.onsubmit = function() { zzSearch.formSub( this ); return false; };
            zzSearch.initKwdInputEvt();
            if (window.cfg.fileName == 'search_result.php') {
                zzSearch.initExcludeSearch();
            }
        }
    }
    var intVal = window.setInterval(searchInit , 50);

});

$(document).mouseup(function() {
    $('.tSearch_select_list').find('.intPopbox').hide();
});


function collapseExpansionJobareaLine(id, element) {
    var config = {
        'show': {
            'add': 'show_line',
            'remove': 'hide_line',
            'html': '收起'
        },
        'hide': {
            'add': 'hide_line',
            'remove': 'show_line',
            'html': '更多'
        }
    }

    if ($('#' + id).hasClass(config.show.add)) {
        $('#' + id).addClass(config.hide.add);
        $('#' + id).removeClass(config.hide.remove);
        $(element).html(config.hide.html);
    } else {
        $('#' + id).addClass(config.show.add);
        $('#' + id).removeClass(config.show.remove);
        $(element).html(config.show.html);
    }
}


function showLine(DOMAIN_SEARCH, lineNum, element) {

    var urlEncode = window.encodeURIComponent || window.escape;


    if (0 == $('#station_' + lineNum).length) {
        var list = {
            'jobarea': '',
            'district': '',
            'funtype': '',
            'industrytype': '',
            'issuedate': '',
            'providesalary': '',
            'keyword': '',
            'keywordtype': '',
            'postchannel': '',
            'workyear': '',
            'cotype': '',
            'degreefrom': '',
            'jobterm': '',
            'companysize': '',
            'address': '',
            'line': '',
            'ord_field': '',
            'from': '',
            'line_now': '',//当前line,用与get_line.php判断
            'welfare': ''
        };

        $.each(list, function (i, value) {
            var formValue = $('[name="pageForm"] [name="' + i + '"]').val();

            switch (i) {
                case 'jobarea':
                    var formAreaList = jobarea = '';
                    if (-1 != formValue.indexOf(',')) {
                        formAreaList = formValue.split(',');
                        jobarea      = formAreaList[0];
                    } else {
                        jobarea      = formArea;
                    }

                    list[i] = jobarea;
                    break;

                case 'line':
                    list[i] = $(element).html();
                    break;

                case 'line_now':
                    list[i] = $('[name="pageForm"] [name="line"]').val();
                    break;

                default:
                    list[i] = formValue;
                    break;
            }
        });

        var actionUrl = DOMAIN_SEARCH + '/jobsearch/ajax/get_line.php?rand='+ Math.random() + '&jsoncallback=?';

        $.getJSON(actionUrl, list, function (data) {
            if ('' != data.data) {
                $('.nk').hide();
                $(element).addClass('dw_c_orange');

                $.each($(element).siblings(), function () {
                    $(this).removeClass('dw_c_orange');
                });

                $('#filter_p_line').after(data.data);
            }
        });
    }


    if ($('#station_' + lineNum).is(':hidden')) {
        $.each($('.nk'), function () {
            $(this).hide();
        });
        $('#station_' + lineNum).show();
        $(element).addClass('dw_c_orange');

        $.each($(element).siblings(), function () {
            $(this).removeClass('dw_c_orange');
        });
    }
}

function showDibiao(DOMAIN_SEARCH, districtNum, element) {

    var urlEncode = window.encodeURIComponent || window.escape;

    if (0 == $('#hotdibiao_' + $('[name="pageForm"] [name="jobarea"]').val().substr(0, 6) + '_' + districtNum).length) {
        var list = {
            'jobarea': '',
            'district': '',
            'funtype': '',
            'industrytype': '',
            'issuedate': '',
            'providesalary': '',
            'keyword': '',
            'keywordtype': '',
            'postchannel': '',
            'workyear': '',
            'cotype': '',
            'degreefrom': '',
            'jobterm': '',
            'companysize': '',
            'address': '',
            'line': '',
            'ord_field': '',
            'dibiaoid': '',
            'from': '',
            'district_now': '',//用于判断当前地标是否是热门地标
            'welfare': ''
        };

        $.each(list, function (i, value) {
            var formValue = $('[name="pageForm"] [name="' + i + '"]').val();

            switch (i) {
                case 'jobarea':
                    var formAreaList = jobarea = '';
                    if (-1 != formValue.indexOf(',')) {
                        formAreaList = formValue.split(',');
                        jobarea      = formAreaList[0];
                    } else {
                        jobarea      = formArea;
                    }

                    list[i] = jobarea;
                    break;

                case 'district':
                    list[i] = districtNum;
                    break;

                case 'district_now':
                    list[i] = $('[name=pageForm] [name=district]').val();
                    break;
                default:
                    list[i] = formValue;
                    break;
            }
        });

        var actionUrl = DOMAIN_SEARCH + '/jobsearch/ajax/get_districtdibiao.php?rand='+ Math.random() + '&jsoncallback=?';

        $.getJSON(actionUrl, list, function (data) {
            if ('' != data.data) {
                $('.nk').hide();
                $(element).addClass('dw_c_orange');

                $.each($(element).siblings(), function () {
                    $(this).removeClass('dw_c_orange');
                });

                $('#filter_p_line').after(data.data);
            }
        });
    }

    $.each($('.nk'), function () {
        $(this).hide();
    });

    $(element).addClass('dw_c_orange');
    $.each($(element).siblings(), function () {
        $(this).removeClass('dw_c_orange');
    });
    $('#hotdibiao_' + $('[name="pageForm"] [name="jobarea"]').val().substr(0, 6) + '_' + districtNum).show();
}


function collapseExpansion(DOMAIN_SEARCH, type, collapse) {
    $.ajax({
        type:"get",
        cache:false,
        url:DOMAIN_SEARCH + '/jobsearch/ajax/collapse_expansion.php?collapse=' + collapse + '&type='+ type + '&ran=' + Math.random()
    });
}

function showHotdibiaoid(element) {
    $('.nk').hide();
    $('#filter_p_dibiaoid').show();
    $.each($(element).siblings(), function () {
        $(this).removeClass('dw_c_orange');
    });
    $(element).addClass('dw_c_orange')
}
var filter_clicked_now;
function showFilterOther(id, obj) {
    $('#otherFilter li').removeClass('on');
    if (filter_clicked_now == obj) {
        $('.kel').hide();
        filter_clicked_now = null;
        return false;
    }
    $(obj).addClass('on');
    var objs = ['filter_p_issuedate', 'filter_p_jobterm', 'filter_p_keyword', 'filter_p_jobarea', 'filter_p_dibiaoid', 'filter_p_line'];
    if ($('#'+ id).is(':hidden')) {
        $.each(objs, function(i, n) {
            $('#'+ n).hide();
        });
        $('#'+ id).show();
    } else {
        $('#'+ id).hide();
    }
    $('.nk').hide();
    $('.kel').show();
    filter_clicked_now = obj;
}

function collapseExpansionSearch(DOMAIN_SEARCH, className, element) {
	var that = $(element);
    var element = $('.' + className);
    if (element.hasClass('on')) {  //收起
        that.find('span').html("展开更多选项<em class='dicon Dm'></em>");
        element.removeClass('on');
        collapseExpansion(DOMAIN_SEARCH, 9, 0);
        /* 收起其他筛选 */
        var objs = ['filter_p_issuedate', 'filter_p_jobterm', 'filter_p_keyword', 'filter_p_jobarea', 'filter_p_dibiaoid', 'filter_p_line'];
        $.each(objs, function(i, n) {
            $('#'+ n).hide();
        });
        $('.nk').hide();
    } else {  //展开
        that.find('span').html("收起更多选项<em class='dicon Dm'></em>");
        element.addClass('on');
        collapseExpansion(DOMAIN_SEARCH, 10, 1);
    }
}

function selectAllJobs(element) {
    var config = ['top_select_all_jobs_checkbox', 'bottom_select_all_jobs_checkbox'];

    var checked = false;

    if ($(element).is(':checked')) {
        checked = true;
    }

    if (checked) {
        $.each(config, function (i, value) {
            $('#' + value).attr('checked', true);
        });

        $.each($('#resultList').find('input'), function (index, value) {
            if (/^delivery_jobid/.test($(this).attr('name'))) {
                $(this).attr('checked', true);
            }
        });
    } else {
        $.each(config, function (i, value) {
            $('#' + value).removeAttr('checked');
        });

        $.each($('#resultList').find('input'), function (index, value) {
            if (/^delivery_jobid/.test($(this).attr('name'))) {
                $(this).removeAttr('checked');
            }
        });
    }
}


function showStatistics(type) {
    var e = window.event || arguments.callee.caller.arguments[0]; // 获取event对象

    if ($('#' + type).is(':hidden')) {
        $('#' + type).show();

        $.each($('#' + type).parent().siblings(), function (index, value) {
            $(this).find('.intPopbox').hide();
        });
    } else {
        $('#' + type).hide();
    }

    if (e.stopPropagation) {
    // this code is for Mozilla and Opera
        e.stopPropagation();
    } else if (window.event) {
        // this code is for IE
        window.event.cancelBubble = true;
    }
}

function changeConfirmdate(id, value, defaultValue) {
    if ($('#' + id + '_checkbox').is(":checked")) {
        $('#' + id + '_checkbox').attr("checked", true);
        $('#' + id).val(value);
    } else {
        $('#' + id + '_checkbox').removeAttr("checked");
        $('#' + id).val(defaultValue);
    }


    zzSearch.formSub(zzSearch.searchForm);
}


function multipleChoose(chooseType)
{
    if (!window.pop) {
        var Param = {
            openType: 2 , //居中定位
            divProps: { style : { zIndex : 1007 } } ,
            filterParam: {}, //滤镜层设置
            createIfr:false
        }
        window.pop = new ExtZzLayer( Param );
    }


    var config = {
        'providesalary': {'text': '月薪范围', 'data': d_search_providesalary},
        'workyear': {'text': '工作年限', 'data': d_search_workyear},
        'degreefrom': {'text': '学历要求', 'data': d_search_degreefrom},
        'cotype': {'text': '公司性质', 'data': d_search_cottype},
        'companysize': {'text': '公司规模', 'data': d_search_companysize}
    }

    var choose = $('#' + chooseType).val();

    $('#' + chooseType + '_tmp').val(choose);

    var content = '';
    var checked = '';
    var spanClass = '';

    content += '<div class="dw_Fixpop">'
            +      '<div class="tp">'
            +          '<p>选择' + config[chooseType]['text'] + '<span>（最多选择5项）</span></p>'
            +          '<span class="but_cancel" id="but_cancel" onclick="cancelMultipleChoose(\'' + chooseType + '\'); return false;">取消</span><span class="but_ok" onclick="submitMultipleChoose(\'' + chooseType + '\'); return false;">确认</span>'
            +      '</div>'
            +      '<div class="vbox">'
            +          '<div class="vwp">';

    $.each(config[chooseType]['data'], function (index, value) {
        if ('99' != value['k']) {
            if (-1 != choose.indexOf(value['k'])) {
                spanClass = 'dw_c_orange';
                checked = 'checked="checked"';
            } else {
                checked = '';
                spanClass = '';
            }


            content += '<span class="' + spanClass + '"><input type="checkbox" ' + checked + ' onclick="checkMultipleChoose(\'' + chooseType + '\', this);" value="' + value['k'] + '"/>' + value['v'] + '</span>';
        }
    });

    content +=       '</div>'
            +        '<div style="clear:both"></div>'
            +    '</div>'
            +  '</div>';

    pop.setContent(content);
    pop.open();
}

function cancelMultipleChoose(chooseType)
{
    $('#' + chooseType + '_tmp').val('');
    pop.close();
}



function checkMultipleChoose(chooseType, element)
{
    var formatChooseList = [];

    var chooseValue = $(element).val();

    var tmpChoose = $('#' + chooseType + '_tmp').val();

    var tmpChooseList = [];

    if ('' != tmpChoose) {
        tmpChooseList = tmpChoose.split(',');
    }

    $.each(tmpChooseList, function (i, value) {
        if ('99' != value) {
            formatChooseList.push(value);
        }
    });


    if ($(element).is(':checked')) {  //添加
        if (formatChooseList.length < 5) {
            formatChooseList.push(chooseValue);
            $(element).parent().addClass('dw_c_orange');
        } else {
            $(element).attr('checked', false);
            alert('您最多能选择5项');
            return false;
        }
    } else {  //删除
        chooseList = formatChooseList;
        formatChooseList = [];

        $.each(chooseList, function (i, value) {
            if (value != chooseValue) {
                formatChooseList.push(value);
            } else {
                $(element).parent().removeClass('dw_c_orange');
            }
        });
    }

    if (0 == formatChooseList.length) {
        formatChooseList.push('99');
    }

    $('#' + chooseType + '_tmp').val(formatChooseList.join(','));
}

function submitMultipleChoose(chooseType)
{
    $('#' + chooseType).val($('#' + chooseType + '_tmp').val());

    zzSearch.pageFormSub('', true);
}


function jumpPage(totalPage)
{
    var jumpPage = parseInt($('#jump_page').val());

    if (jumpPage > 0 && jumpPage <= totalPage) {
        if (1 == jumpPage) {
            zzSearch.pageFormSub({curr_page: jumpPage}, true);
        } else {
            zzSearch.pageFormSub({curr_page: jumpPage}, false);
        }

    } else {
        alert('请输入正确的页码');
    }
}

function StandardPost(url,args){
    var body = $(document.body),
        form = $("<form method='post'></form>"),
        input;
    form.attr({"action":url});
    $.each(args,function(key,value){
        input = $("<input type='hidden'>");
        input.attr({"name":key});
        input.val(value);
        form.append(input);
    });

    form.appendTo(document.body);
    form.submit();
    document.body.removeChild(form[0]);
}

function jumpTo(sUrl)
{
    aData = {
        nStart: document.getElementsByName("nStart")[0].value,
        ads_num: document.getElementsByName("ads_num")[0].value,
        jobid_list: document.getElementsByName("jobid_list")[0].value,
        schTime: document.getElementsByName("schTime")[0].value,
        jobid_count: document.getElementsByName("jobid_count")[0].value
    };
    
    StandardPost(sUrl, aData);
}