$(document).ready(function(){
    window.cfg.root_userset_ajax = typeof window.cfg.root_userset_ajax === 'undefined' ? "http://i.51job.com/userset/ajax" : window.cfg.root_userset_ajax;	
});

if(typeof needLogin === 'undefined')
{
    function needLogin()
    {
        if(typeof(window.cfg.domain.login) === 'undefined')
        {
            window.cfg.domain.login = 'http://login.51job.com';
        }
        var refer = '?url=' + encodeURIComponent(window.location);
        window.location.href = window.cfg.domain.login + '/login.php' + refer;
    }
}
    
function SelectAllCheckbox(selectAllButtonId, checkBoxName)
{
    if($("#" + selectAllButtonId).is(":checked"))
    {
        $("input[name='" + checkBoxName + "']").attr("checked", true);
    }
    else
    {
        $("input[name='" + checkBoxName + "']").attr("checked", false);
    }
}


function deleteCollection(sJobId)
{
    var aJobId = [];
    
    if(sJobId == "")
    {
        if($("input[name='delivery_jobid']:checked").length == 0)
        {
            alert("请选择收藏!");
            return false;
        }
        
        $("input[name='delivery_jobid']:checked").each(function(){
            aJobId.push($(this).val());
        });
        sJobId = aJobId.join(",");
    }
    
    oLayerSettings = jQuery.FLayer.init();
    sConfirmHtml = '<div class="panel_lnp panel_py">'
                + '<h2>'
                + '<p>提示</p>'
                + '<a href="javascript:void(0)" class="layer_close"><i></i></a>'
                + '</h2>'
                + '<div class="pannel_con">'
                + '<div class="gp2">'
                + '<p class="wd center c_666">确定要删除这条信息吗？</p>'
                + '</div></div>'
                + '<div class="but_box b2">'
                + '<span class="p_but" onclick="deleteCollectionConfirm(\'' + sJobId + '\')">确定</span><span class="p_but gray layer_close">取消</span>'
                + '</div></div>';

    jQuery.FLayer.setContent(oLayerSettings,sConfirmHtml);
    jQuery.FLayer.open(oLayerSettings);
    return false;
}

function deleteCollectionConfirm(sJobId)
{
    
    $.getJSON(window.cfg.root_userset_ajax + '/collection.php?jsoncallback=?',{'type': 'delete', 'jobid': sJobId},function(result){
            if(result['status'] == 1)
            {
                location.reload();
            }
            else
            {
                if(result['result'] == 'needlogin')
                {
                    needLogin();
                }
                else
                {
                    systemError();
                }
            }
        }
    );
}


function saveCollection(sJobId)
{
    var aJobId = [];
    
    if(sJobId == "")
    {
        if($("input[name='delivery_jobid']:checked").length == 0)
        {
            alert("请在要选择的职位前打勾！");
            return false;
        }
        
        $("input[name='delivery_jobid']:checked").each(function(){
            aJobId.push($(this).val());
        });
        sJobId = aJobId.join(",");
    }
    
    $.getJSON(window.cfg.root_userset_ajax + '/collection.php?jsoncallback=?',{'type': 'add', 'jobid': sJobId},function(result)
    {
        sSuccessHtml = '<div class="gp3">'
            + '<strong class="wd f16 center c_orange">'
            + '职位收藏成功！'
            + '</strong>'
            + '</div>';
        sSavedHtml = '<div class="gp2">'
            + '<p class="wd center c_666">'
            + '职位收藏失败！职位已收藏'
            + '</p>'
            + '</div>';
        sOverLimitHtml = '<div class="gp2">'
            + '<p class="wd center c_666">'
            + '最多收藏500个职位！'
            + '</p>'
            + '</div>';
        sFailureHtml = '<div class="gp2">'
            + '<p class="wd center c_666">'
            + '系统繁忙，请稍后再试！'
            + '</p>'
            + '</div>';
        var sHtml = '<div class="panel_lnp panel_py">'
            + '<h2>'
            + '<p>提示</p>'
            + '<a class="layer_close" href="javascript:void(0)"><i></i></a>'
            + '</h2>'
            + '<div class="pannel_con">';
        if(result['status'] == 1)
        {
            sHtml += sSuccessHtml;
        }
        else
        {
            switch(result['result'])
            {
                case 3:
                    sHtml += sSavedHtml;
                    break;
                case 4:
                    sHtml += sOverLimitHtml;
                    break;
                case 'needlogin':
                    needLogin();
                    return;
                    break;
                case 0:
                default:
                    sHtml += sFailureHtml;
                    break;
            }
        }
        sHtml += '</div>'
            + '</div>';
        
        oLayerSettings = jQuery.FLayer.init();
        jQuery.FLayer.setContent(oLayerSettings,sHtml);
        jQuery.FLayer.open(oLayerSettings);
        if(result['status'] == 1)
        {
            var t = setTimeout("jQuery.FLayer.close(oLayerSettings)", 2000);
        } 
        $("#my_collection_num").html(parseInt($("#my_collection_num").html())+result.rowcount);
        return false;
    });
}

function myrefresh(p_id)
{
	var $applybtn = $("#operate_" + p_id).children("a:first");
	if($applybtn.text() == '申请')
	{
		$applybtn.replaceWith("已申请");
	}
}

/*根据name获取全选标签 add by wjk 20170227*/
function SelectAllCheckboxByName(element, checkBoxName)
{
	var config = ['top_select_all_jobs_checkbox', 'bottom_select_all_jobs_checkbox'];
	
	var checked = false;

    if ($(element).is(':checked')) {
        checked = true;
    }
	if (checked) {
        $.each(config, function (i, value) {
            $('#' + value).attr('checked', true);
        });

        $("input[name='" + checkBoxName + "']").attr("checked", true);
    } else {
        $.each(config, function (i, value) {
            $('#' + value).removeAttr('checked');
        });

        $("input[name='" + checkBoxName + "']").attr("checked", false);
    }
}