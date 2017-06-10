$.extend({
    commonSelect:
    {
        oCurrentSelected: {},
        oSaveCodeTypeSplit: 
        {
            '1': ',',
            '2': ' '
        },
        oSaveTextTypeSplit:
        {
            '1': '+',
            '2': ' '
        },
        sMunicipalityArea: '010000,020000,040000,050000,060000',
        sForeignArea: '361000,362000,363000,364000,365000,366000',
        sPecialArea: '01',
        initCurrentSelected: function (oSettings)  //����ѡ���code, �洢��ȫ�ֱ���oCurrentSelected
        {
            if ('' != $('#' + oSettings.code_id).val())
            {
                jQuery.commonSelect.oCurrentSelected[oSettings.data_type] = $('#' + oSettings.code_id).val().split(jQuery.commonSelect.oSaveCodeTypeSplit[oSettings.save_code_type]);
            }
            else
            {
                jQuery.commonSelect.oCurrentSelected[oSettings.data_type] = [];
            }
        },
        saveEvent: function (oEvent)  //�������¼�
        {
            oEvent.stopPropagation();

            var oSettings = oEvent.data;

            var iSelect   = $(this).attr("data-value");

            if (jQuery.commonSelect.canAdd(oSettings, iSelect))
            {
                jQuery.commonSelect.save(oSettings, iSelect, oSettings.data_struct_type);
            }
        },
        saveRecommendEvent: function (oEvent)
        {
            oEvent.stopPropagation();

            var oSettings = oEvent.data;

            jQuery.commonSelect.save(oSettings, $(this).attr("data-value"), oSettings.data_recommend_struct_type);
        },
        getRepeatSelected: function (oSettings, iSelect)  //��ȡ�ظ���ѡ��
        {
            var aRepeatSelected = [];

            $.each(jQuery.commonSelect.oCurrentSelected[oSettings.data_type], function (i, value) {
                switch (oSettings.data_length)
                {
                    case '1':  //ÿ������Դ����Ϊ4λ
                        if (iSelect == iSelect.substr(0, 2) + '00')
                        {
                            if (value.substr(0, 2) == iSelect.substr(0, 2))
                            {
                                aRepeatSelected.push(value);
                            }
                        }
                        else  //ɾ����ѡ������Ĵ���
                        {
                            if ((value.substr(0, 2) == iSelect.substr(0, 2)) && (value == value.substr(0, 2) + '00'))
                            {
                                aRepeatSelected.push(value);
                            }
                        }
                        break;

                    case '2':  //ÿ������Դ����Ϊ6λ
                        switch (oSettings.data_type)
                        {
                            case 'area':
                                if(iSelect != "01")
                                {
                                    if (-1 == jQuery.commonSelect.sMunicipalityArea.indexOf(iSelect.substr(0, 2) + '0000'))  //����ֱϽ��
                                    {
                                        if (iSelect == iSelect.substr(0, 2) + '0000')  //ѡ�е���ʡ, ɾ��ѡ�����������
                                        {
                                            if (value.substr(0, 2) == iSelect.substr(0, 2))
                                            {
                                                aRepeatSelected.push(value);
                                            }
                                        }
                                        else if (iSelect == iSelect.substr(0, 4) + '00')  //ѡ�е�����, ɾ����ѡ�������ʡ����
                                        {
                                            if (value.substr(0, 2) == iSelect.substr(0, 2) && (value == value.substr(0, 2) + '0000'))
                                            {
                                                aRepeatSelected.push(value);
                                            }

                                            if (value.substr(0, 4) == iSelect.substr(0, 4))
                                            {
                                                aRepeatSelected.push(value);
                                            }
                                        }
                                        else  //ѡ�е�����, ɾ����ѡ�������ʡ����
                                        {
                                            if (value.substr(0, 2) == iSelect.substr(0, 2) && (value == value.substr(0, 2) + '0000'))
                                            {
                                                aRepeatSelected.push(value);
                                            }

                                            if (value.substr(0, 4) == iSelect.substr(0, 4) && (value == value.substr(0, 4) + '00'))
                                            {
                                                aRepeatSelected.push(value);
                                            }
                                        }
                                    }
                                    else  //��ֱϽ��
                                    {
                                        if (iSelect == iSelect.substr(0, 2) + '0000')
                                        {
                                            if (value != "01" && (value.substr(0, 2) == iSelect.substr(0, 2)))
                                            {
                                                aRepeatSelected.push(value);
                                            }
                                        }
                                        else  //ɾ����ѡ������Ĵ���
                                        {
                                            if ((value.substr(0, 2) == iSelect.substr(0, 2)) && (value == value.substr(0, 2) + '0000'))
                                            {
                                                aRepeatSelected.push(value);
                                            }
                                        }
                                    }
                                }
                                break;

                            default:
                                break;
                        }
                        break;
                }
            });

            return aRepeatSelected;
        },
        canAdd: function (oSettings, iSelect)  //�ж��Ƿ�������
        {
            var bCanAdd = true;

            aRepeatSelected = jQuery.commonSelect.getRepeatSelected(oSettings, iSelect);

            if (0 == aRepeatSelected.length)
            {
                if (oSettings.data_multiple)  //1. ���еĲ��ܽ������, ����ʾ�� 2. û�еĳ���5��, �������, ����ʾ��
                {
                    if (jQuery.commonSelect.oCurrentSelected[oSettings.data_type].length < oSettings.data_multiple_max)
                    {
                        $.each(jQuery.commonSelect.oCurrentSelected[oSettings.data_type], function (i, value) {
                            if ($.trim(value) == $.trim(iSelect)) {
                                bCanAdd = false;

                                if (oSettings.data_add_error_alert)
                                {
                                    alert(lang['layer']['data_added']);
                                }

                                return false;
                            }
                        });
                    }
                    else
                    {
                        if (oSettings.data_add_error_alert)
                        {
                            alert(lang['layer']['data_max_select'].replace(/{max}/, oSettings.data_multiple_max));
                        }

                        bCanAdd = false;
                    }
                }
            }

            return bCanAdd;
        },
        save: function (oSettings, iSelect, sDataStructType)  //���洦��, �رյ���
        {
            if ('' != iSelect)
            {
                jQuery.commonSelect.saveCurrentSelected(oSettings, iSelect);
            }

            switch (oSettings.save_type)
            {
                case '1':  //�洢���ı����� + �洢������
                    jQuery.commonSelect.saveText(oSettings, iSelect, sDataStructType);
                    jQuery.commonSelect.saveCode(oSettings);
                    break;

                case '2':  //�洢���ı����·� + �洢������
                    jQuery.commonSelect.saveUnderText(oSettings, iSelect, sDataStructType);
                    jQuery.commonSelect.saveCode(oSettings);
                    break;
            }

            if (!oSettings.data_multiple)
            {
                jQuery.FLayer.close(oSettings);
            }
            jQuery.commonSelect.setClearDataAttr(oSettings, '3');
        },
        setClearDataAttr: function (oSettings, sSetType)
        {
            if (!oSettings.data_multiple)  //��ѡ���������Ĺ���
            {
                if (('undefined' == typeof oSettings.data_clear) || (true === oSettings.data_clear))  //����ѡ�� || ����
                {
                    var oText = $('#' + oSettings.text_id);
                    var oCode = $('#' + oSettings.code_id);

                    switch (sSetType)
                    {
                        case '1':  //�ս���ҳ��, �������ֵ, ����Ϊtrue, ��������Ϊfalse
                            oText.attr('pre_value', oText.val());
                            oCode.attr('pre_code', oCode.val());
                            break;

                        case '2':  //�����������д���ݷ����˱仯
                            if (oText.val() != oText.attr('pre_value'))
                            {
                                oText.attr('pre_value', '');
                                oCode.attr('pre_code', '');
                            }
                            break;

                        case '3':  //��������б�򵯴� ��������
                            oText.attr('pre_value', oText.val());
                            oCode.attr('pre_code', oCode.val());
                            break;
                    }
                }
            }
        },
        getRealData: function (oSettings, iSelect, sDataStructType)  //��������������, ��k:v��, Ӧ����code:value, ��v��, Ӧ���� value:value
        {
            var oRealData = {};

            switch (sDataStructType)
            {
                case '1':  //k:v
                    if (oSettings.data_multiple)
                    {
                        $.each(jQuery.commonSelect.oCurrentSelected[oSettings.data_type], function (i, code) {
                            oRealData[code] = oSettings.data[code];
                        });
                    }
                    else
                    {
                        oRealData[iSelect] = oSettings.data[iSelect];
                    }
                    break;

                case '2':  //v
                    $.each(jQuery.commonSelect.oCurrentSelected[oSettings.data_type], function (i, value) {
                        oRealData[value] = value;
                    });
                    break;
            }

            return oRealData;
        },
        saveText: function (oSettings, iSelect, sDataStructType)  //ѡ�е�ѡ�������ı�����
        {
            var oRealData = jQuery.commonSelect.getRealData(oSettings, iSelect, sDataStructType);

            var aTextValue = [];

            $.each(oRealData, function (code, value) {
                aTextValue.push(value);
            });

            var oText = $('#' + oSettings.text_id);

            oText.val(aTextValue.join(jQuery.commonSelect.oSaveTextTypeSplit[oSettings.save_text_type]));

            if (oText.hasClass(oSettings.place_holder_class))
            {
                oText.removeClass(oSettings.place_holder_class);
            }

        },
        saveUnderText: function (oSettings, iSelect, sDataStructType)  //ѡ�е�ѡ��洢���ı����·�
        {
            var oUnderElement = {};

            aRealData = jQuery.commonSelect.getRealData(oSettings, iSelect, sDataStructType);

            $('#' + oSettings.under_id).html('');

            $.each(aRealData, function (i, value) {
                oUnderElement = $('<span data-value="' + i.replace(/</g, "&lt;").replace(/\"/g, "&quot;") + '" class="ttag"><span>' + value.replace(/</g, "&lt;").replace(/\"/g, "&quot;") + '</span><em></em></span>').appendTo($('#' + oSettings.under_id));

                oUnderElement.bind('click', oSettings, jQuery.commonSelect.deleteUnderSelectEvent);
            });

            $('#' + oSettings.under_id).append('<div class="clear"></div>');
        },
        getMultipleSelect: function (oSettings)  //��ȡѡ�е�codeֵ������
        {
            var oSelect = {'code': [], 'text': []};
            $.each(jQuery.commonSelect.oCurrentSelected[oSettings.data_type], function (i, value) {
                oSelect['code'].push(value);
                oSelect['text'].push(oSettings.data[value]);
            });

            return oSelect;
        },
        saveCurrentSelected: function (oSettings, iSelect)
        {
            if (oSettings.data_multiple)
            {
                jQuery.commonSelect.oCurrentSelected[oSettings.data_type].push(iSelect);
            }
            else
            {
                jQuery.commonSelect.oCurrentSelected[oSettings.data_type] = [];
                jQuery.commonSelect.oCurrentSelected[oSettings.data_type].push(iSelect);
            }
        },
        deleteUnderSelectEvent: function (oEvent)  //ɾ���ı����·�ѡ��
        {
            oEvent.stopPropagation();

            var oSettings = oEvent.data;

            jQuery.commonSelect.deleteSelect(oSettings, $(this));

            switch (oSettings.save_type)
            {
                case '1':  //�洢���ı����� + �洢������
                case '2':  //�洢���ı����·� + �洢������
                    jQuery.commonSelect.saveCode(oSettings);
                    break;
            }
        },
        saveCode: function (oSettings)  //�洢ѡ�е�ѡ���code
        {
            $('#' + oSettings.code_id).val(jQuery.commonSelect.oCurrentSelected[oSettings.data_type].join(jQuery.commonSelect.oSaveCodeTypeSplit[oSettings.save_code_type]));
        },
        deleteSelect: function (oSettings, oJqueryElement)  //������, �ɵ�������ʵ��
        {
            if(typeof(oJqueryElement) == "string")
            {
                jQuery.commonSelect.deleteCurrentSelected(oSettings, oJqueryElement);
            }
            else
            {
                oJqueryElement.remove();
                jQuery.commonSelect.deleteCurrentSelected(oSettings, oJqueryElement.attr("data-value"));
            }
        },
        deleteCurrentSelected: function (oSettings, iSelect)  //��ȫ�ֱ�����ɾ��ѡ����
        {
            var aTempCurrentSelected = [];

            $.each(jQuery.commonSelect.oCurrentSelected[oSettings.data_type], function (i, value) {
                if (value != iSelect)
                {
                    aTempCurrentSelected.push(value);
                }
            });
            jQuery.commonSelect.oCurrentSelected[oSettings.data_type] = aTempCurrentSelected;
        },
        replaceCurrentSelected: function (oSettings, iSelect)  //��ȫ�ֱ������滻ѡ����
        {
            jQuery.commonSelect.oCurrentSelected[oSettings.data_type] = [];
            jQuery.commonSelect.oCurrentSelected[oSettings.data_type].push(iSelect);
        },
        getObjectKeys: function (o)
        {
            var aKey = [];

            if (!o.keys)
            {
                for (var i in o)
                {
                    if (o.hasOwnProperty(i))
                    {
                        aKey.push(i);
                    }
                }
            }
            else
            {
                aKey = Object.keys(o);
            }

            return aKey;
        }
    }
});