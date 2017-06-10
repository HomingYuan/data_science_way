/**
 * sJobIdElementName: �洢ְλID��HTMLԪ�ص�NAME, ����<input type="hidden" name="delivery_jobid" value="jobid_value" jt="1" />: value: ְλid, jt: ְλ����
 * sDeliveryType: Ͷ������: 1: ����Ͷ�� 2: ����Ͷ��
 * sDomainMy:����AJAX���������
 * sLanguage: ҳ������: ��c��: ���� ��e��: Ӣ��
 * sPrd: ҳ����Դ����
 * sPrp: ҳ����Դҳ�����
 * sCp: ��ǰͶ������ҳ�����
 * sImgPath: ͼƬ����������
 */

//Ͷ�ݹ���
function delivery(sJobIdElementName, sDeliveryType, sDomainMy, sLanguage, sPrd, sPrp, sCp, sImgPath, callback)
{
    if ($('#deliveryLayer').parent().css('visibility') == 'hidden')
    {
        $('#deliveryLayer').remove();
    }

    var reg = new RegExp('^(?:(?:https?):)/*(?:[^@]+@)?([^:/#]+)');
    var matches = reg.exec(sPrd);
    sPrd = matches ? matches[1] : sPrd;
    sPrp = sPrp ? sPrp : '01';

    Delivery.setPrp(sPrp);
    Delivery.setPrd(sPrd);
    Delivery.setImagePath(sImgPath);

    //��ǰͶ������: var sCd = document.domain;
    var sCd = document.domain;

    //����Ͷ��, ���Ͷ�ݴ���
    var sJob = Delivery.getJobStr(sJobIdElementName, sDeliveryType);

    var sResumeId = $('#rsmId').val();
    var sCvLan = $('#cvLanguage').val();
    var sCoverId = $('#coverId').val();
    var sQPostSet = $('input:checkbox[name="qPostSet"]:checked').val();
    if ($('#tips').attr('tipid') == 2)
    {
        alert('��ѡ��ļ�����������������Ͷ�ݣ������ƺ���Ͷ�ݡ�');
        return;
    }

    if (sJob != '()')
    {
        var oData = {
            jobid : sJob,           //ְλ
            prd : sPrd,             //��Դ����
            prp : sPrp,             //��Դҳ��
            cd : sCd,               //Ͷ������
            cp : sCp,               //Ͷ��ҳ��
            resumeid : sResumeId,   //����������Ϊ��
            cvlan : sCvLan,         //�������ԣ�����Ϊ��
            coverid : sCoverId,     //��ְ�ţ�����Ϊ��
            qpostset : sQPostSet,   //����Ͷ�ݣ�����Ϊ��
            elementname: sJobIdElementName,
            deliverytype: sDeliveryType,
            deliverydomain: sDomainMy,
            language: sLanguage,
            imgpath:sImgPath
        };

        $.each(oData, function(key,value){
            if (typeof value == 'undefined')
            {
                oData[key] = '';
            }
        });

        Delivery.loadingLayer();

        //ajax����URL: sDomainMy + '?jobid=()&prd=&prp=&cd=&cp=&accountid=&resumeid=';
        $.ajax({
            url: sDomainMy + '/my/delivery/delivery.php?rand=' + Math.random(),
            type: 'GET',
            dataType: 'jsonp',
            jsonp: "jsoncallback",
            data: oData,
            success: function (result) {   //�ɹ���ص�
                if (typeof(callback) === 'function')
                {
                    Delivery.setCallback(callback);
                }
                Delivery.ajaxCallback(result);
            },
            error: function (e) {
                alert('error');
            }
        });
    }
    else
    {
        alert('��ѡ��ְλ��Ͷ�ݣ�');
    }
}


var Delivery = (function(){
    var sPrp = '';
    var sPrd = '';
    var singleType = '';
    var sImagePath = '';
    var callback = '';

    function setPrd(p_sValue)
    {
        sPrd = p_sValue;
    }
    function setPrp(p_sValue)
    {
        sPrp = p_sValue;
    }
    function setImagePath(p_sValue)
    {
        sImagePath = p_sValue || 'http://img01.51jobcdn.com';
    }
    function setCallback(p_callback)
    {
        callback = p_callback;
    }

    function getJobStr(sJobIdElementName, sDeliveryType)
    {
        var sJob = '';
        var iJobId = 0;
        var iJobType = 0;

        var sSelectorStr  = '';
        if (sDeliveryType == 1)
        {
            //����ְλ��ҳ��
            sSelectorStr = 'input[name="' + sJobIdElementName + '"]';
            singleType = $(sSelectorStr).attr('jt');   //����ְλ�ĸ���
        }
        else if(sDeliveryType == 3)
        {
            //���ְλ��ҳ�浥��Ͷ�ݣ�ͨ��id
            sSelectorStr = '#' + sJobIdElementName;
        }
        else
        {
            //���ְλ��ҳ���ѡͶ��
            sSelectorStr = 'input:checkbox[name="'+ sJobIdElementName +'"]:checked';
        }

        $(sSelectorStr).each(function () {
            iJobId = $(this).attr('value');
            iJobType = $(this).attr('jt');

            if (isNaN(iJobId)) {iJobId = 0;}
            if (isNaN(iJobType)) {iJobType = '';}

            if (iJobType == '') {
                sJob =  sJob + iJobId + ',';
            } else {
                sJob =  sJob + iJobId + ':' + iJobType + ',';
            }
        });

        if (sJob != '')
        {
            sJob = sJob.substring(0, sJob.length-1);
        }
        return '(' + sJob + ')';
    }

    //���ؽ������
    function ajaxCallback(oResult)
    {
        var iType = oResult.type;
        var sContent = oResult.content;
        if (typeof iType == 'undefined' || typeof sContent == 'undefined')
        {
            iType = 1;
            sContent = '';
        }
        showRemind(iType, sContent);
    }

    function showRemind(p_iType, p_sContent)
    {
        switch (p_iType)
        {
            case 1:
                alert(p_sContent);
                if ($(".layer_class, .layer_back_drop_class").length > 0) {
                    $('.layer_close').click();
                }
                break;
            case 2:
                var refer = '?url=' + encodeURIComponent(window.location);

                location.href = p_sContent + refer;
                break;
            case 5:
                location.href = p_sContent;
                break;
            case 3:
                windowOpen(p_sContent);
                if ($(".layer_class, .layer_back_drop_class").length > 0) {
                    $('.layer_close').click();
                }
                break;
            case 4:
            default:
                remindLayer(p_sContent);
        }
    }

    //����ȴ���
    function remindLayer(p_oLayerInfo)
    {
        var sLayer = p_oLayerInfo.layer;
        var sHtml = p_oLayerInfo.content.html;
        var oData = p_oLayerInfo.content.data;
        showLayer(sHtml);
        bindAction(sLayer, oData);
    }

    function showLayer(content)
    {
        var oLayerSettings = jQuery.FLayer.init();

        oLayerSettings['layer_after_close'] = function(){
            $(".layer_class, .layer_back_drop_class").remove();
        };

        jQuery.FLayer.setContent(oLayerSettings,content);
        jQuery.FLayer.open(oLayerSettings);
    }

    function bindAction(p_sLayer, p_oData)
    {
        if (p_sLayer == 'deliverySuccessLayer')
        {
            setTimeout('if($("#deliverySuccessLayer").length>0){$(".layer_close").click();}',2500);
            if ($("#app_ck").length > 0)
            {
                $("#app_ck").attr("href","#").attr("class","but_sq off").removeAttr("onclick");
                $('#app_ck').html('<img width="22" height="22" src="'+ sImagePath +'/im/jobs/but_img_sq_2.png" alt="" />������');
            }
            //�������˻ص�������Ͷ�ݳɹ� ҳ��ر�ʱִ��
            if (typeof(callback) === 'function')
            {
                $('.layer_close').click(function(){
                    callback();
                });
            }
        }

        var oLayer = $('#' + p_sLayer);
        //������ť
        oLayer.find("span.i_arrow").each(function(){

            var oButDown = $(this);
            var oSelectLayer = oButDown.siblings(".ul");

            $('body').click(function(){
                oSelectLayer.hide();
            });

            oButDown.click(function(event) {
                $('body').click();
                event.stopPropagation();
                oSelectLayer.show();
            });
        });

        //Ͷ�ݰ�ť
        oLayer.find('#apply_now').click(function(event){
            event.stopPropagation();
        });

        //�����������
        oLayer.find('#resumeSelectList_div_data span').each(function(){
            $(this).click(function(){
                oLayer.find('#rsmText').val($(this).text());
                oLayer.find('#rsmId').val($(this).attr('data-value'));
                tip(p_oData);
            });
        });

        //��Ӣ���������
        oLayer.find('#languageSelectList_div_data span').each(function(){
            $(this).click(function(){
                oLayer.find('#languageText').val($(this).text());
                oLayer.find('#cvLanguage').val($(this).attr('data-value'));
                tip(p_oData);
            });
        });

        //��ְ���������
        oLayer.find('#coverSelect_div_data span').each(function(){
            $(this).click(function(){
                oLayer.find('#coverText').val($(this).text());
                oLayer.find('#coverId').val($(this).attr('data-value'));
            });
        });

        //����Ͷ��Ĭ�Ϲ�ѡ
        oLayer.find('input:checkbox[name="qPostSet"]').attr('checked', 'true');

        //�ʺ�
        oLayer.find('#question').css({
            'background-image':'url("'+ sImagePath +'/im/2016/form/form.png")'
        });
        oLayer.find('#question').click(function(){
            window.open('http://i.51job.com/resume/help.php?lang=c&module=td');
        });

        oLayer.find('#resumeSelectList_div_data span:first').click();
        oLayer.find('#languageSelectList_div_data span:first').click();
        oLayer.find('#coverSelect_div_data span:first').click();
    }

    //����������ʾ�ﶯ��
    function tip(p_oData)
    {
        var iResumeId = $('#rsmId').val();
        var iLan = $('#cvLanguage').val();

        var sTipContent = p_oData[iResumeId][iLan]['tip'];
        var url = p_oData[iResumeId][iLan]['url'];
        var iTipId = p_oData[iResumeId][iLan]['tipid'];

        $('#tips').empty();
        $('#tips').attr('tipid', '');

        $('#tips').append(sTipContent);
        $('#tips').find('a').click(function(){
            window.open(url);
        });
        $('#tips').attr('tipid', iTipId);
        if (iTipId == 2)
        {
            $('#apply_now').css('background-color','#818181').css('border','#818181');
        }
        else
        {
            $('#apply_now').css('background-color','#f56101').css('border','#f56101');
        }
        $('#tips').show();
    }

    //���� ����
    function loadingLayer()
    {
        var sContent = '<div id="loadingLayer">'
                        +'<input type="hidden" class="layer_close" />'
                        + '<p align="center"><img src="'+ sImagePath +'/im/2009/loading.gif"></p>'
                        + '</div>';

        var oLayer = {
            layer:'loadingLayer',
            content:{html:sContent}
        };

        remindLayer(oLayer);
    }

    function windowOpen(url){
        var aHref = document.getElementById('aHref');
        if(aHref){
            aHref.href = url;
        }else{
            var aHref    = document.createElement('a');
            aHref.href   = url;
            aHref.target = '_blank';
            aHref.id     = 'aHref';
            document.body.appendChild(aHref);
        }
        aHref.click();
    }

    return {
        getJobStr:getJobStr,
        ajaxCallback:ajaxCallback,
        loadingLayer:loadingLayer,
        setPrd:setPrd,
        setPrp:setPrp,
        setImagePath:setImagePath,
        setCallback:setCallback
    }
}());