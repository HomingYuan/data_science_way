$(document).ready(function(){
    //����
    $(':input[name=keyword]').keydown(function(){
        $('#KwdSearchContent').hide();
    });

    //���������������������ʷ������������ɸѡ������
    var hidearr = {cotype : $('#cotype'), workyear : $('#workyear'), salary : $('#providesalary'),
                   companysize : $('#companysize'), issuedate : $('#issuedate'), degree : $('#degreefrom'), jobterm : $('#jobterm'),
                   keywordtype : $('#kwdTypeSel'), history : $('#searchHistory'), kwdsearchcontent : $('#KwdSearchContent'), kwdresult : $('#KwdSearchResult')};
	$('#showSearchHistory').click(function(e){
        //������ʷȡ��
        $.each(hidearr, function(name, obj){
            obj.hide();
        });
		//$('#searchHistory').show();
        e.stopPropagation();
	});



    $('#kwdTypeSelUl').hover(function(e){
        $('#kwdTypeSelUl').addClass('on');
    },function(e){
        $('#kwdTypeSelUl').removeClass('on');
    });

    /** ��ҳ��typeѡ�� */
    $('#kwdType').hover(function(e){
        $.each(hidearr, function(name, obj){
            obj.hide();
        });
        $('#kwdType').css('background-color', 'white');
        $('#kwdType').parent().addClass('on');
        $('#kwdTypeSel').show();
        e.stopPropagation();
    },function(e){
        $('#kwdType').css('background-color', '#EFEFEF');
        $('#kwdType').parent().removeClass('on');
        $('#kwdTypeSel').hide();
    });

    $('#kwdTypeSel').hover(function(e){
        $('#kwdType').css('background-color', 'white');
        $('#kwdType').parent().addClass('on');
        $('#kwdTypeSel').show();
        e.stopPropagation();
    },function(e){
            $('#kwdType').css('background-color', '#EFEFEF');
            $('#kwdType').parent().removeClass('on');
            $('#kwdTypeSel').hide();
            e.stopPropagation();
        });

    $('#kwdType').click(function(e){
        $.each(hidearr, function(name, obj){
            obj.hide();
        });
        $('#kwdType').css('background-color', 'white');
        $('#kwdType').parent().addClass('on');
        $('#kwdTypeSel').show();
        e.stopPropagation();
    });
    /* end*/

    
    $(document).click(function(e){
        var evt = window.event || arguments.callee.caller.arguments[0]; // ��ȡevent����
        var src = evt.srcElement || evt.target; // ��ȡ�����¼���Դ����
        $.each(hidearr, function(name, obj){
            obj.hide();
        });
        if(src.id == 'kwdselectid' && $('#kwdselectid').val() == '') {
            $('#searchHistory').show();
        } else if(src.id == 'kwdselectid' && $('#kwdselectid').val() != '') {
            kwdSearch();
            // ÿ������������kwdsearchresultѡ��indexֵ
            document.getElementById('kwdselectid').setAttribute('vindex','-1');
            $('#KwdSearchResult').show();
        }
    });

    //����˴������������ͣ�������ʷ��
    var bindarr = {cotype : $('#cotype_trigger'), workyear : $('#workyear_trigger'), salary : $('#salary_trigger'),
                   companysize : $('#companysize_trigger'), degree : $('#degree_trigger'), jobterm : $('#jobterm_trigger'),
                   func : $('#select_expect_funtype'), indust : $('#select_expect_indtype'), jobchoose : $('#Jobareachoose')};

    $.each(bindarr, function(name, obj){
        obj.click(function(){
            $('#kwdTypeSel').hide();
            $('#searchHistory').hide();
            $('#KwdSearchContent').hide();
        });
    });

});

function clickStatistics(DOMAIN_SEARCH, sType) {
    $.ajax({
        type:"get",
        cache:false,
        url:DOMAIN_SEARCH + '/jobsearch/click_statistics.php?type='+ sType + '&referer=' + $('#statistics_referer').val() + '&ran=' + Math.random()
    });
}


/** ��ҳ��typeѡ�� */
function kwdtypeChange(kwdType)
{
    var typeInfo = {"1":"��˾","2":"ȫ��"};
    $('#kwdTypeSelUl').html('');
    $('#keywordtype').val(kwdType);
    $('#kwdType')[0].innerHTML = typeInfo[kwdType];
    $('#kwdTypeSel').hide();
    var content = '';
    for (type in typeInfo) {
        if(kwdType != type) {
            content = '<li><a href="javascript:void(0);" onclick="kwdtypeChange('+type+');">'+typeInfo[type]+'</a></li>';
            $('#kwdTypeSelUl').append(content);
        }
    }
    $('#kwdType').css('background-color', '#EFEFEF');
    $('#kwdType').parent().removeClass('on');
}

