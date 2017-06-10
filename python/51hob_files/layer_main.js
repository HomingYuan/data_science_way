(function($) {
    var oDefaultSettings = {
        'id'                   : 'layer_main',
        'text_id'              : 'layer_main_text',
        'code_id'              : 'layer_main_code',
        'under_id'             : 'layer_main_under',
        'save_type'            : '1',
        'save_text_type'       : '1',
        'save_under_text_type' : '1',
        'save_code_type'       : '1',

        'data'                 : '',
        'data_length'          : '1',
        'data_struct_type'     : '1',
        'data_map'             : '',
        'data_navigation'      : '',
        'data_multiple'        : false,
        'data_parent_click'    : true,
        'data_add_error_alert' : false,

        'data_init'            : '',
        'data_click'           : '',
        'data_multiple_max'    : 5,
        'data_row_num'         : 3,
        'data_type'            : '',
        'layer_id'             : 'layer_main_id',
        'layer_before_open'    : '',
        'layer_after_close'    : '',
        'layer_type'           : '1',
        'language'             : 'c',
        'selected_class'       : 'on',
        'init_class'           : 'panel_ct2',
        'place_holder_class'   : 'placeholder'
    }


    $.fn.funtypeLayer = function (options)
    {
        var oSettings = {};

        var oSelfSettings = {
            'id'             : 'funtype',
            'text_id'        : 'funtype_text',
            'code_id'        : 'funtype_code',
            'under_id'       : 'funtype_under',
            'layer_id'       : 'funtype_layer_id',
            'data'           : ft,
            'data_map'       : oFTM,
            'data_navigation': aFTN,
            'init_class'     : 'panel_ct2 con_l'
        };

        oSelfSettings.data_type = 'funtype';  //数据类型: 私有变量, 不可更改

        return this.each(function () {
            if (options)
            {
                $.extend(oSettings, oDefaultSettings, oSelfSettings, options);
            }

            oSettings = jQuery.commonLayer.init(oSettings);

            $(this).bind('click', oSettings, oSettings.data_click);
        });
    }


    $.fn.indtypeLayer = function (options)
    {
        var oSettings = {};

        var oSelfSettings = {
            'id'             : 'indtype',
            'text_id'        : 'indtype_text',
            'code_id'        : 'indtype_code',
            'under_id'       : 'indtype_under',
            'layer_id'       : 'indtype_layer_id',
            'data'           : it,
            'data_navigation': aITN,
            'init_class'     : 'panel_ct2 con_l'
        };

        oSelfSettings.data_type = 'indtype';  //数据类型: 私有变量, 不可更改

        return this.each(function () {
            if (options)
            {
                $.extend(oSettings, oDefaultSettings, oSelfSettings, options);
            }

            oSettings = jQuery.commonLayer.init(oSettings);

            $(this).bind('click', oSettings, oSettings.data_click);
        });
    }


    $.fn.certLayer = function (options)
    {
        var oSettings = {};

        var oSelfSettings = {
            'id'             : 'cert',
            'text_id'        : 'cert_text',
            'code_id'        : 'cert_code',
            'under_id'       : 'cert_under',
            'layer_id'       : 'cert_layer_id',
            'data'           : cert,
            'data_navigation': aCertN,
            'init_class'     : 'panel_ct2 con_m'
        };

        oSelfSettings.data_type = 'cert';  //数据类型: 私有变量, 不可更改

        return this.each(function () {
            if (options)
            {
                $.extend(oSettings, oDefaultSettings, oSelfSettings, options);
            }

            oSettings = jQuery.commonLayer.init(oSettings);

            $(this).bind('click', oSettings, oSettings.data_click);
        });
    }


    $.fn.itskillLayer = function (options)
    {
        var oSettings = {};

        var oSelfSettings = {
            'id'             : 'itskill',
            'text_id'        : 'itskill_text',
            'code_id'        : 'itskill_code',
            'under_id'       : 'itskill_under',
            'layer_id'       : 'itskill_layer_id',
            'data'           : itskill,
            'data_navigation': aItskillN,
            'init_class'     : 'panel_ct2 con_m'
        };

        oSelfSettings.data_type = 'itskill';  //数据类型: 私有变量, 不可更改

        return this.each(function () {
            if (options)
            {
                $.extend(oSettings, oDefaultSettings, oSelfSettings, options);
            }

            oSettings = jQuery.commonLayer.init(oSettings);

            $(this).bind('click', oSettings, oSettings.data_click);
        });
    }


    $.fn.majorLayer = function (options)
    {
        var oSettings = {};

        var oSelfSettings = {
            'id'             : 'major',
            'text_id'        : 'major_text',
            'code_id'        : 'major_code',
            'under_id'       : 'major_under',
            'layer_id'       : 'major_layer_id',
            'data'           : major,
            'data_map'       : oMajorM,
            'data_navigation': aMajorN
        };

        oSelfSettings.data_type = 'major';  //数据类型: 私有变量, 不可更改

        return this.each(function () {
            if (options)
            {
                $.extend(oSettings, oDefaultSettings, oSelfSettings, options);
            }

            oSettings = jQuery.commonLayer.init(oSettings);

            $(this).bind('click', oSettings, oSettings.data_click);
        });
    }


    //基本信息-居住地/基本信息-户口/求职意向-地区
    $.fn.areaLayer = function (options)
    {
        var oSettings = {};

        var oSelfSettings = {
            'id'             : 'area',
            'text_id'        : 'area_text',
            'code_id'        : 'area_code',
            'under_id'       : 'area_under',
            'layer_id'       : 'area_layer_id',
            'data'           : area,
            'data_length'    : '2',
            'data_map'       : oAreaM,
            'data_navigation': aAreaN,
            'data_row_num'   : 7,
            'special_type'   : '',  //特殊类型: 1: 国籍/户口: 国外特殊处理 2: 特殊频道: 热门城市特殊处理
            'init_class'     : 'panel_ct con_m'          //弹窗内容的class, 控制弹窗的宽度
        };

        oSelfSettings.data_type = 'area';  //数据类型: 私有变量, 不可更改

        return this.each(function () {
            if (options)
            {
                $.extend(oSettings, oDefaultSettings, oSelfSettings, options);
            }

            oSettings = jQuery.commonLayer.init(oSettings);

            switch (oSettings.special_type)
            {
                case '1':  //重写getCenterRightCenterContent
                    oSettings.getCenterRightCenterContent = getOverSeasCenterRightCenterContent;
                    break;

                case '2':  //重写getRightContent
                    oSettings.getCenterRightCenterContent = getSpecialAreaRightCenterContent;
                    break;
            }

            $(this).bind('click', oSettings, oSettings.data_click);
        });

        function getOverSeasAllCountryContent(oSettings, iNavigationId)
        {
            var aHotCountry = ['361001','361002','361003','361004','361005','362001','362002','362003','362004','362005','362019','362020','362021','362022','362023','363001','363002','363004','364001','364002','364012','365001','365002'];

            var sContent = '<strong class="name">' + lang[oSettings.data_type]['layer_hot_country'] + '</strong>' + '<table><tbody>';

            //每行显示3条记录, 不足的补充
            $.each(aHotCountry, function (i, value) {
                if (0 == i%oSettings.data_row_num)
                {
                    sContent += '<tr>';
                }

                sContent += '<td class="js_more"><em id="' + oSettings.center_right_list_category + '_' + value + '" data-value="' + value + '" class="' + jQuery.commonLayer.getSelectedClass(oSettings, value) + '">' +　oSettings.data[value] + '</em></td>';

                if ((oSettings.data_row_num - 1) === i%oSettings.data_row_num)
                {
                    sContent += '</tr>';
                }
            });

            sContent +=    '</tbody></table>';

            return sContent;
        }


        function getOverSeasCenterRightCenterContent(oSettings, iNavigationId)  //弹窗内容右侧: 显示与指定导航关联的大类
        {
            switch (iNavigationId)
            {
                case '360000':
                    var sContent = '<div id="' + oSettings.center_right_list + '_' + iNavigationId + '" class="' + oSettings.center_right_list + ' de d3">' + getOverSeasAllCountryContent(oSettings, iNavigationId) + 
                                    '<strong class="name">' + lang[oSettings.data_type]['layer_continents'] + '</strong>' + 
                                    '<table><tbody>';

                    //每行显示3条记录, 不足的补充
                    $.each(jQuery.commonLayer.getBigCategoryByNavigation(oSettings, iNavigationId), function (i, value) {
                        if (0 == i%oSettings.data_row_num)
                        {
                            sContent += '<tr>';
                        }

                        sContent += '<td class="js_more"><em id="' + oSettings.center_right_list_category + '_' + iNavigationId + '_' + value + '" data-value="' + value + '" class="' + jQuery.commonLayer.getSelectedClass(oSettings, value) + '">' +　oSettings.data[value] + '</em></td>';

                        if ((oSettings.data_row_num - 1) === i%oSettings.data_row_num)
                        {
                            sContent += '</tr>';
                        }
                    });

                    sContent +=    '</tbody></table>' + 
                               '</div>';
                    break;

                default:
                    var sContent = jQuery.commonLayer.getCenterRightCenterContent(oSettings, iNavigationId);
                    break;
            }

            return sContent;
        }

        function getSpecialAreaRightCenterContent(oSettings, iNavigationId)  //弹窗内容右侧: 显示与指定导航关联的大类
        {
            switch (iNavigationId)
            {
                case '000000':
                    var sContent = '<div id="' + oSettings.center_right_list + '_' + iNavigationId + '" class="' + oSettings.center_right_list + ' de d3">' + 
                                       '<table><tbody>';

                    //每行显示3条记录, 不足的补充
                    $.each(jQuery.commonLayer.getBigCategoryByNavigation(oSettings, iNavigationId), function (i, value) {
                        if (0 == i%oSettings.data_row_num)
                        {
                            sContent += '<tr>';
                        }

                        sContent += '<td class="js_more"><em id="' + oSettings.center_right_list_category + '_' + iNavigationId + '_' + value + '" data-value="' + value + '" data-navigation="' + iNavigationId + '" class="' + jQuery.commonLayer.getSelectedClass(oSettings, value) + '">' +　oSettings.data[value] + '</em></td>';

                        if ((oSettings.data_row_num - 1) === i%oSettings.data_row_num)
                        {
                            sContent += '</tr>';
                        }
                    });


                    //没有其他地方使用, 先不进行拆分
                    var sPecialAreaValue = '01';

                    sContent +=    '</tbody></table></div><div class="de d1" id="work_position_special_area_zhusanjiao">' + 
                                   '<table><tbody><tr><td class="js_more"><em id="' + oSettings.center_right_list_category + '_' + iNavigationId + '_' + sPecialAreaValue + '" data-value="' + sPecialAreaValue + '" class="' + jQuery.commonLayer.getSelectedClass(oSettings, sPecialAreaValue) + '">' +　oSettings.data[sPecialAreaValue] + '</em><i class="c_666">' + lang[oSettings.data_type]['layer_special'] + '</i></td></tr></tbody></table>' + 
                               '</div>';
                    break;

                default:
                    var sContent = jQuery.commonLayer.getCenterRightCenterContent(oSettings, iNavigationId);
                    break;
            }

            return sContent;
        }
    }
})(jQuery);