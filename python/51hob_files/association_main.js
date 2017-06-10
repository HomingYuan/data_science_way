(function($) {
    var oDefaultSettings = {
        'id'                        : 'association',
        'text_id'                   : 'association_text',
        'code_id'                   : 'association_code',
        'under_id'                  : 'association_under',
        'append_id'                 : 'association_append',
        'association_id'            : 'association_id',
        'float_index_id'            : 'association_float_index',
        'float_on_id'               : 'association_float_on',

        'save_type'                 : '1',
        'save_text_type'            : '1',
        'save_under_text_type'      : '1',
        'save_code_type'            : '1',

        'keyup_fn'                  : '',
        'append_fn'                 : '',
        'layer_append_type'         : '1',

        'association_type'          : '1',
        'data'                      : '',
        'data_struct_type'          : '1',
        'data_child_depth'          : '2',
        'data_multiple'             : false,
        'data_multiple_max'         : 5,
        'data_view_type'            : '1',
        'data_type'                 : '',
        'data_parent_click'         : true,
        'data_add_error_alert'      : true,
        'data_clear'                : true,

        'recommend'                 : false,
        'recommend_type'            : '1',
        'recommend_click_fn'        : '',
        'data_recommend'            : '',
        'data_recommend_struct_type': '1',
        'before_open'               : '',
        'after_close'               : '',
        'selected_class'            : 'on',
        'init_class'                : 'ul',
        'language'                  : 'c'
    }


    //������Ϣ-��ס��
    //������Ϣ-����/����
    //��ְ����-�ص�
    $.fn.areaAssociation = function (options)
    {
        var oSettings = {};

        var oSelfSettings = {
            'id'                        : 'area_association',
            'text_id'                   : 'area_association_text',
            'code_id'                   : 'area_association_code',
            'under_id'                  : 'area_association_under',
            'association_id'            : 'area_association_id',
            'data'                      : area,
            'data_length'               : '2',
            'data_child_depth'          : '3',
            'data_child_type'           : '1'  //�Ӽ�����: 1: ��ʡ����, �������Ӽ� 2: ��ʡ����, �������Ӽ� 3: ��ʡ����+����Ƶ��, �������Ӽ�
        };

        oSelfSettings.data_type = 'area';  //��������: ˽�б���, ���ɸ���

        return this.each(function () {
            if (options)
            {
                $.extend(oSettings, oDefaultSettings, oSelfSettings, options);
            }

            oSettings = jQuery.commonAssociation.init(oSettings);

            switch (oSettings.data_child_type)
            {
                case '1':  //��ʡ����, �������Ӽ�: ɾ��������Ӽ� + ����Ƶ��
                    var oTempData = {};

                    $.each(oSettings.data, function (code, value) {
                        var iParentCode = code.substr(0, 4) + '00';
                        if (-1 == jQuery.commonSelect.sForeignArea.indexOf(iParentCode) && (-1 == jQuery.commonSelect.sPecialArea.indexOf(code)))
                        {
                            oTempData[code] = value;
                        }
                    });

                    oSettings.data = oTempData;
                    break;

                case '2':  //��ʡ����, �������Ӽ�: ɾ������ + ɾ������ + ����Ƶ��
                    var oTempData = {};

                    $.each(oSettings.data, function (code, value) {
                        if ('00' == code.substr(4, 2))  //ʡ+��, Ҫɾ��ֱϽ���������
                        {
                            var iParentCode = code.substr(0, 2) + '0000';

                            if (-1 != jQuery.commonSelect.sMunicipalityArea.indexOf(iParentCode))
                            {
                                if (code == iParentCode)
                                {
                                    oTempData[code] = value;
                                }
                            }
                            else
                            {
                                oTempData[code] = value;
                            }
                        }
                        else  //��+����Ƶ������ɸѡ�������Ӽ�
                        {
                            var iParentCode = code.substr(0, 4) + '00';

                            if (-1 != jQuery.commonSelect.sForeignArea.indexOf(iParentCode))
                            {
                                oTempData[code] = value;
                            }
                        }
                    });

                    oSettings.data = oTempData;

                    break;

                case '3':  //��ʡ����, �������Ӽ�, ������Ƶ��: ɾ������ + �����Ӽ�
                    var oTempData = {};


                    $.each(oSettings.data, function (code, value) {
                        if ('00' == code.substr(code.length-2, 2))  //ʡ+��, Ҫɾ��ֱϽ���������
                        {
                            var iParentCode    = code.substr(0, 2) + '0000';
                            var iSubParentCode = code.substr(0, 4) + '00';

                            if (-1 != jQuery.commonSelect.sMunicipalityArea.indexOf(iParentCode))
                            {
                                if (code == iParentCode)
                                {
                                    oTempData[code] = value;
                                }
                            }
                            else if ((-1 == jQuery.commonSelect.sForeignArea.indexOf(iSubParentCode)))
                            {
                                oTempData[code] = value;
                            }
                        }
                        else if (-1 != jQuery.commonSelect.sPecialArea.indexOf(code))
                        {
                            oTempData[code] = value;
                        }
                    });

                    oSettings.data = oTempData;
                    break;
            }

            oSettings.getAssociationContent = getAssociationContent;

            // $('#' +  oSettings.text_id).bind('click', function (oEvent) {oEvent.stopPropagation();});

            $('#' + oSettings.text_id).bind('keyup', oSettings, oSettings.keyup_fn);
            
            $('#' + oSettings.text_id).bind('click', oSettings, oSettings.keyup_fn);
        });


        function getAssociationContent(oSettings, oAssociationData)
        {
            var sContent = '';

            $.each(oAssociationData, function (i, value) {
                sContent += '<span data-value="' + i + '" class="li '+ oSettings.association_each_click + '">' + getTextValue(oSettings, i, value) + '</span>';
            });

            return sContent;
        }


        function getTextValue(oSettings, iCurrentCode, aParentCode)
        {
            var aTextValue = [];

            aParentCode.unshift(iCurrentCode);

            $.each(aParentCode, function (i, value) {
                aTextValue.push(oSettings.data[value]);
            });

            return aTextValue.join(jQuery.commonSelect.oSaveCodeTypeSplit[oSettings.save_code_type]);
        }
    }


    //��ְ����-��ҵ/��������-��ҵ
    $.fn.indtypeAssociation = function (options)
    {
        var oSettings = {};

        var oSelfSettings = {
            'id'                        : 'indtype_association',
            'text_id'                   : 'indtype_association_text',
            'code_id'                   : 'indtype_association_code',
            'under_id'                  : 'indtype_association_under',
            'association_id'            : 'indtype_association_id',
            'data'                      : it,
            'data_child_depth'          : '1',
            'data_view_type'            : '1'
        };

        oSelfSettings.data_type = 'indtype';  //��������: ˽�б���, ���ɸ���

        return this.each(function () {
            if (options)
            {
                $.extend(oSettings, oDefaultSettings, oSelfSettings, options);
            }

            oSettings = jQuery.commonAssociation.init(oSettings);

            $('#' + oSettings.text_id).bind('keyup', oSettings, oSettings.keyup_fn);
            
            $('#' + oSettings.text_id).bind('click', oSettings, oSettings.keyup_fn);
        });
    }


    //��ְ����-ְ��/��������-ְ��
    $.fn.funtypeAssociation = function (options)
    {
        var oSettings = {};

        var oSelfSettings = {
            'id'                        : 'funtype_association',
            'text_id'                   : 'funtype_association_text',
            'code_id'                   : 'funtype_association_code',
            'under_id'                  : 'funtype_association_under',
            'association_id'            : 'funtype_association_id',
            'data'                      : ft,
            'data_view_type'            : '2',
            'init_class'                : 'ul u3'
        };

        oSelfSettings.data_type = 'funtype';  //��������: ˽�б���, ���ɸ���

        return this.each(function () {
            if (options)
            {
                $.extend(oSettings, oDefaultSettings, oSelfSettings, options);
            }

            oSettings = jQuery.commonAssociation.init(oSettings);

            $('#' + oSettings.text_id).bind('keyup', oSettings, oSettings.keyup_fn);
            
            $('#' + oSettings.text_id).bind('click', oSettings, oSettings.keyup_fn);
        });
    }


    //��������-רҵ
    $.fn.majorAssociation = function (options)
    {
        var oSettings = {};

        var oSelfSettings = {
            'id'                        : 'major_association',
            'text_id'                   : 'major_association_text',
            'code_id'                   : 'major_association_code',
            'under_id'                  : 'major_association_under',
            'association_id'            : 'major_association_id',
            'data'                      : major,
            'data_view_type'            : '2',
            'init_class'                : 'ul u3'
        };

        oSelfSettings.data_type = 'major';  //��������: ˽�б���, ���ɸ���

        return this.each(function () {
            if (options)
            {
                $.extend(oSettings, oDefaultSettings, oSelfSettings, options);
            }

            oSettings = jQuery.commonAssociation.init(oSettings);

            $('#' + oSettings.text_id).bind('keyup', oSettings, oSettings.keyup_fn);
            
            $('#' + oSettings.text_id).bind('click', oSettings, oSettings.keyup_fn);
        });
    }


    //�����س�-����/����
    $.fn.itskillAssociation = function (options)
    {
        var oSettings = {};

        var oSelfSettings = {
            'id'                        : 'itskill_association',
            'text_id'                   : 'itskill_association_text',
            'code_id'                   : 'itskill_association_code',
            'under_id'                  : 'itskill_association_under',
            'association_id'            : 'itskill_association_id',
            'data'                      : itskill,
            'data_view_type'            : '2',
            'init_class'                : 'ul u3'
        };

        oSelfSettings.data_type = 'itskill';  //��������: ˽�б���, ���ɸ���

        return this.each(function () {
            if (options)
            {
                $.extend(oSettings, oDefaultSettings, oSelfSettings, options);
            }

            oSettings = jQuery.commonAssociation.init(oSettings);

            $('#' + oSettings.text_id).bind('keyup', oSettings, oSettings.keyup_fn);
            
            $('#' + oSettings.text_id).bind('click', oSettings, oSettings.keyup_fn);
        });
    }


    //�����س�-֤��
    $.fn.certAssociation = function (options)
    {
        var oSettings = {};

        var oSelfSettings = {
            'id'                        : 'cert_association',
            'text_id'                   : 'cert_association_text',
            'code_id'                   : 'cert_association_code',
            'under_id'                  : 'cert_association_under',
            'association_id'            : 'cert_association_id',
            'data'                      : cert,
            'data_view_type'            : '2',
            'init_class'                : 'ul u3'
        };

        oSelfSettings.data_type = 'cert';  //��������: ˽�б���, ���ɸ���

        return this.each(function () {
            if (options)
            {
                $.extend(oSettings, oDefaultSettings, oSelfSettings, options);
            }

            oSettings = jQuery.commonAssociation.init(oSettings);

            $('#' + oSettings.text_id).bind('keyup', oSettings, oSettings.keyup_fn);
            
            $('#' + oSettings.text_id).bind('click', oSettings, oSettings.keyup_fn);
        });
    }


    //��ְ����-���˱�ǩ
    $.fn.personKeyVendorsAssociation = function (options)
    {
        var oSettings = {};

        var oSelfSettings = {
            'id'                        : 'person_key_vendors_association',
            'text_id'                   : 'person_key_vendors_association_text',
            'code_id'                   : 'person_key_vendors_association_code',
            'under_id'                  : 'person_key_vendors_association_under',
            'association_id'            : 'person_key_vendors_association_id',
            'append_id'                 : 'person_key_vendors_association_append',
            'save_type'                 : '2',
            'save_code_type'            : '2',
            'association_type'          : '2',
            'data_struct_type'          : '2',
            'data_multiple'             : true,
            'data_multiple_max'         : 10,
            'keyup_fn'                  : associationEvent,
            'append_fn'                 : appendEvent,
            'saveEvent'                 : saveEvent
        };

        oSelfSettings.data_type = 'ResumeLabel';  //��������: ˽�б���, ���ɸ���

        oSelfSettings.data_max_length = 24;

        return this.each(function () {
            if (options)
            {
                $.extend(oSettings, oDefaultSettings, oSelfSettings, options);
            }

            oSettings = jQuery.commonAssociation.init(oSettings);

            $('#' + oSettings.text_id).bind('keyup', oSettings, oSettings.keyup_fn);
            
            $('#' + oSettings.text_id).bind('click', oSettings, oSettings.keyup_fn);

            $('#' + oSettings.append_id).bind('click', oSettings, oSettings.append_fn);
        });


        function associationEvent(oEvent)
        {
            oEvent.stopPropagation();
            
            var oSettings = oEvent.data;

            if(!oSettings.upDownSelect(oEvent))
            {
                return;
            }
            
            if(typeof closeAllFloatDiv === "function")
            {
                closeAllFloatDiv($('#' + oSettings.float_on_id), $('#' + oSettings.float_index_id), $('#' + oSettings.text_id));
            }
            
            var sContent = '';

            var sTextValue = $('#' + oSettings.text_id).val();

            var sReg = / /g;

            if ((32 == oEvent.keyCode) && sReg.test(sTextValue))
            {
                $('#' + oSettings.text_id).val(sTextValue.replace(sReg, ""));
            }

            jQuery.commonSelect.initCurrentSelected(oSettings);

            oSettings.oLayerSettings = jQuery.commonAssociation.initLayerSettings(oSettings, {});

            oSettings.findData(oSettings, sTextValue);
        }


        function appendEvent(oEvent)
        {
            oEvent.stopPropagation();

            var oSettings = oEvent.data;

            var sContent = '';

            var sTextValue = $.trim($('#' + oSettings.text_id).val());

            jQuery.commonSelect.initCurrentSelected(oSettings);

            oSettings.oLayerSettings = jQuery.commonAssociation.initLayerSettings(oSettings, {});

            if ('' != sTextValue)
            {
                if (jQuery.commonSelect.canAdd(oSettings, sTextValue))
                {
                    if (canAddPersonKey(oSettings, sTextValue))
                    {
                        jQuery.commonSelect.save(oSettings, sTextValue, oSettings.data_struct_type);
                    }
                }
            }
        }


        function saveEvent(oEvent)
        {
            oEvent.stopPropagation();

            var oSettings = oEvent.data;

            var iSelect   = $(this).attr("data-value");

            if (jQuery.commonSelect.canAdd(oSettings, iSelect))
            {
                if (canAddPersonKey(oSettings, iSelect))
                {
                    aRepeatSelected = jQuery.commonSelect.getRepeatSelected(oSettings, iSelect);
                    if (aRepeatSelected.length > 0)
                    {
                        $.each(aRepeatSelected, function (i, value) {
                            jQuery.commonSelect.deleteSelect(oSettings, $('#' + oSettings.under_id + ' [data-value=' +value + ']'));
                        });
                    }

                    jQuery.commonSelect.save(oSettings, iSelect, oSettings.data_struct_type);


                    if (!oSettings.data_multiple)
                    {
                        $('#' + oSettings.float_on_id).removeClass('on').attr('float-on', false);
                        //$('#' + oSettings.float_index_id).css({'z-index':0}).attr('float-index', false);
                        $('#' + oSettings.float_index_id).attr('float-index', false).parents('.flboxwp,.ln,.c,.box').css("z-index", "");
                        oSettings.oLayerSettings.oLayerElement.attr('layer_float_on', false);
                    }
                }
            }
        }


        function canAddPersonKey(oSettings, sTextValue)
        {
            var bCanAddPersonKey = true;

            if (sTextValue.replace(/[^\x00-\xff]/gi,'xx').length > oSettings.data_max_length)
            {
                if (oSettings.data_add_error_alert)
                {
                    alert(lang['int_keywords_maxlength']);
                }

                bCanAddPersonKey = false;
            }

            return bCanAddPersonKey;
        }
    }


    //��������-��˾
    $.fn.companyVendorsAssociation = function (options)
    {
        var oSettings = {};

        var oSelfSettings = {
            'id'                        : 'company_vendors_association',
            'text_id'                   : 'company_vendors_association_text',
            'code_id'                   : 'company_vendors_association_code',
            'under_id'                  : 'company_vendors_association_under',
            'association_id'            : 'company_vendors_association_id',
            'association_type'          : '2',
            'data_struct_type'          : '2',
            'data_clear'                : false
        };

        oSelfSettings.data_type = 'Company';  //��������: ˽�б���, ���ɸ���

        return this.each(function () {
            if (options)
            {
                $.extend(oSettings, oDefaultSettings, oSelfSettings, options);
            }

            oSettings = jQuery.commonAssociation.init(oSettings);

            $('#' + oSettings.text_id).bind('keyup', oSettings, oSettings.keyup_fn);
            
            $('#' + oSettings.text_id).bind('click', oSettings, oSettings.keyup_fn);
        });
    }


    //��������-ְλ����
    $.fn.jobVendorsAssociation = function (options)
    {
        var oSettings = {};

        var oSelfSettings = {
            'id'                        : 'job_vendors_association',
            'text_id'                   : 'job_vendors_association_text',
            'code_id'                   : 'job_vendors_association_code',
            'under_id'                  : 'job_vendors_association_under',
            'association_id'            : 'job_vendors_association_id',
            'association_type'          : '2',
            'data_struct_type'          : '2',
            'data_clear'                : false
        };

        oSelfSettings.data_type = 'Job';  //��������: ˽�б���, ���ɸ���

        return this.each(function () {
            if (options)
            {
                $.extend(oSettings, oDefaultSettings, oSelfSettings, options);
            }

            oSettings = jQuery.commonAssociation.init(oSettings);

            $('#' + oSettings.text_id).bind('keyup', oSettings, oSettings.keyup_fn);
            
            $('#' + oSettings.text_id).bind('click', oSettings, oSettings.keyup_fn);
        });
    }


    //��������-ѧУ
    $.fn.schoolVendorsAssociation = function (options)
    {
        var oSettings = {};

        var oSelfSettings = {
            'id'                        : 'school_vendors_association',
            'text_id'                   : 'school_vendors_association_text',
            'code_id'                   : 'school_vendors_association_code',
            'under_id'                  : 'school_vendors_association_under',
            'association_id'            : 'school_vendors_association_id',
            'association_type'          : '2',
            'data_struct_type'          : '2',
            'data_clear'                : false
        };

        oSelfSettings.data_type = 'School';  //��������: ˽�б���, ���ɸ���

        return this.each(function () {
            if (options)
            {
                $.extend(oSettings, oDefaultSettings, oSelfSettings, options);
            }

            oSettings = jQuery.commonAssociation.init(oSettings);

            $('#' + oSettings.text_id).bind('keyup', oSettings, oSettings.keyup_fn);
            
            $('#' + oSettings.text_id).bind('click', oSettings, oSettings.keyup_fn);
        });
    }


    //��������-�Զ���רҵ
    $.fn.majorVendorsAssociation = function (options)
    {
        var oSettings = {};

        var oSelfSettings = {
            'id'                        : 'major_vendors_association',
            'text_id'                   : 'major_vendors_association_text',
            'code_id'                   : 'major_vendors_association_code',
            'under_id'                  : 'major_vendors_association_under',
            'association_id'            : 'major_vendors_association_id',
            'association_type'          : '2',
            'data_struct_type'          : '2',
            'data_clear'                : false
        };

        oSelfSettings.data_type = 'Major';  //��������: ˽�б���, ���ɸ���

        return this.each(function () {
            if (options)
            {
                $.extend(oSettings, oDefaultSettings, oSelfSettings, options);
            }

            oSettings = jQuery.commonAssociation.init(oSettings);

            $('#' + oSettings.text_id).bind('keyup', oSettings, oSettings.keyup_fn);
            
            $('#' + oSettings.text_id).bind('click', oSettings, oSettings.keyup_fn);
        });
    }
})(jQuery);