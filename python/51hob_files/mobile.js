var mobileComponent = function() {
    return {
        sMobileErrorMessage_CHINA_CN: '��֧��11λ��½�ֻ����룬����13��14��15��17��18��ͷ',
        sMobileErrorMessage_CHINA_EN: 'Numbers in China mainland only, starting with 13��14��15��17��18, 11-digit.',
        sMobileEmptyErrorMessage_CN: '�������ֻ���',
        sMobileEmptyErrorMessage_EN: 'Please enter your mobile number.',
        sMobileErrorMessage_CN: '��������ֻ���������',
        sMobileErrorMessage_EN: 'Incorrect mobile number.',
        sBindMobileErrorMessage_CHINA_CN: 'ֻ�д�½���ֻ�������ܱ���',
        sBindMobileErrorMessage_CHINA_EN: 'Just support Mainland mobile phone Binding',
        sBindMobileErrorMessage_MOBILE_SAME_CN: '�������µ��ֻ�����',
        sBindMobileErrorMessage_MOBILE_SAME_EN: 'Please enter another mobile number.',
        sBindMobileErrorMessage_foreign_CN: '������Ĳ��Ǵ�½�ֻ����룬�޷���ȡ���Ž�����֤��ȷ��ʹ�øú��룬��ֱ�ӡ����桱',
        sBindMobileErrorMessage_foreign_EN: 'SMS verification is not available for numbers outside China mainland. Save it if you are sure to use this number.',
        checkMobile: function(iMobile, sMpCountry) {
            if ('086' == sMpCountry) {
                var sReg = /^(1[34578]{1,1}[0-9]{9,9})$/;
            } else {
                var sReg = /^[0-9]{1,20}$/;
            }

            return sReg.test(iMobile);
        }
    }
}

var sCaptchaErrorMessage_CN = '��֤�벻��Ϊ��!';
var sCaptchaErrorMessage_EN = 'The verification code can��t be empty!';

var waitTime=120;
var t;
var sendMsg = {
	sendStart:function ( iPhoneId, iSendCodeId, iApptype, IMGPATH, MYPATH, Lang ){
		return sendMsg.sendStartTool(iPhoneId, iSendCodeId, iApptype, IMGPATH, MYPATH, Lang, null);
	},
	sendStartExtra:function ( iPhoneId, iSendCodeId, iApptype, IMGPATH, MYPATH, Lang,options ){
		return sendMsg.sendStartTool(iPhoneId, iSendCodeId, iApptype, IMGPATH, MYPATH, Lang,options );
	},
	sendStartTool:function( iPhoneId, iSendCodeId, iApptype, IMGPATH, MYPATH, Lang,options )
	{
		waitTime = 120;
		if( typeof t != 'undefined' ){
			clearTimeout(t);
		}
		var Lang = Lang || 'CN';
		var phoneNo			= Jtrim($("#"+iPhoneId).val());
		//check phone number is right
		var oCheckResult = this.phoneCheck( phoneNo, IMGPATH, Lang );

		if( oCheckResult.status != 1)
		{
			return oCheckResult;
		}
		var piccode = '';
		var extradata = '';
		if(options!= null){
			if(options.hasOwnProperty('piccode')){
				extradata += '&piccode='+options['piccode'];
			}
			if(options.hasOwnProperty('name')){
				extradata += '&name='+options['name'];
			}
			if(options.hasOwnProperty('year')){
				extradata += '&year='+options['year'];
			}
			if(options.hasOwnProperty('month')){
				extradata += '&month='+options['month'];
			}
		}

		var returnV;
		//���̨���ʹ�������
		$.ajax({
			type: "POST", //��POST��ʽ����
			dataType: "text", //���ݸ�ʽ:JSON
			url: MYPATH+'/AjaxAction/mobile_code/send_mobile_code.php', //Ŀ���ַ
			data: "mobile="+phoneNo+"&apptype="+iApptype+extradata,
			async:false,
			success: function (data)
			{
				data = eval("("+data+")");
				switch( data.status )
				{
					case -1:
						if( Lang == "EN" )
						{
							var returnMsg = 'Numbers in China mainland only, starting with 13��14��15��17��18, 11-digit.';
						}
						else
						{
							var returnMsg = '��֧��11λ��½�ֻ����룬����13��14��15��17��18��ͷ';
						}
						break;
					case -2:
						if( Lang == "EN" )
						{
							var returnMsg = 'Tries for this number are used up. Please try tomorrow.';
						}
						else
						{
							var returnMsg = '��������������࣬����������';
						}
						break;
					case -3:
					case -4:
						if( Lang == "EN" )
						{
							var returnMsg = 'Sorry, system response times out, please try again later.';
						}
						else
						{
							var returnMsg = '����ʧ�����Ժ����ԡ�';
						}
						break;
					case -5:
						if( Lang == "EN" )
						{
							var returnMsg = 'Illegal request.';
						}
						else
						{
							var returnMsg = '�Ƿ�����';
						}
						break;
					case -6:
						if( Lang == "EN" )
						{
							var returnMsg = 'The user is not logged in.';
						}
						else
						{
							var returnMsg = '�û�δ��¼��';
						}
						break;
					case -7:
						if( Lang == "EN" )
						{
							var returnMsg = 'Mobile or Apptype is empty';
						}
						else
						{
							var returnMsg = 'mobile��apptypeΪ��';
						}
						break;
					case -9:
						if( Lang == "EN" )
						{
							var returnMsg = 'The number is not binding';
						}
						else
						{
							var returnMsg = '���ֻ����벻���ڻ�δ��';
						}
						break;
					case -10:
						if( Lang == "EN" )
						{
							var returnMsg = 'Please enter another mobile number.';
						}
						else
						{
							var returnMsg = '�������µ��ֻ�����';
						}
						break;
					case -21:
						if( Lang == "EN" )
						{
							var returnMsg = 'please enter the verification code';
						}
						else
						{
							var returnMsg = '��������֤��!';
						}
						break;
					case -22:
						if( Lang == "EN" )
						{
							var returnMsg = 'Incorrect SMS verification code.';
						}
						else
						{
							var returnMsg = '������Ķ�����֤�����';
						}
						break;
					case -24:
						if( Lang == "EN" )
						{
							var returnMsg = 'Your phone number is not bound to this account, you can not use the phone to retrieve password';
						}
						else
						{
							var returnMsg = '�����ֻ���û�а󶨴��˺ţ�����ʹ���ֻ��һ����룡';
						}
						break;
					case 1:
						if( Lang == "EN" )
						{
							var returnMsg = 'The verification code has been sent successfully, please check the phone';
						}
						else
						{
							var returnMsg = '��֤���ѷ��ͳɹ�, ��ע�����';
						}
						oDivObj = document.getElementById(iSendCodeId);
						sendMsg.PhoneTime(oDivObj, null, Lang);
						break;

					default:
						if( Lang == "EN" )
						{
							var returnMsg = 'Send the code.';
						}
						else
						{
							var returnMsg = '����ʧ�����Ժ����ԡ�';
						}
						break;
				}
				returnV = {status:data.status, msg:returnMsg};
			}
		});
		return returnV;
	},
	PhoneTime:function( o,num,lang )
	{
		if (waitTime == 0)
		{
			o.removeAttribute("disabled");
			if( lang == 'EN' )
			{
				o.value="Send the code";
			}
			else
			{
				o.value="��ȡ��֤��";
			}

			waitTime = 300;
		} else {
			o.setAttribute("disabled", true);

			if( lang == 'EN' )
			{
				o.value="Resend(" + waitTime + ")";
			}
			else
			{
				o.value="���·���(" + waitTime + ")";
			}
			waitTime--;
			t = setTimeout(function() {sendMsg.PhoneTime(o,waitTime, lang);},1000);
		}
	},
	phoneCheck:function(sPhoneNo, IMGPATH, lang)
	{
		var retrunStatur	= 1;
		var returnMsg		= '';
		var phoneNo			= sPhoneNo;
		var phone_length	= strlength(phoneNo);
		if( lang == 'EN' )
		{
			var phoneTip	= 'Please enter your registered binding mobile phone number';
			var phoneError	= 'The phone number format error, please re-enter'
		}
		else
		{
			var phoneTip =  '��������ע��󶨵��ֻ�����';
			var phoneError	= '�ֻ��Ÿ�ʽ������������д'
		}
		//�ж��ֻ��Ƿ�Ϊ��
		if( phone_length == 0 || phoneNo == phoneTip )
		{
			retrunStatur = '-100';
			returnMsg	 = phoneTip;
		}
		else
		{//�ж��ֻ��Ƿ����
			var objPhoneCheck =  new mobileComponent();
			if(objPhoneCheck.checkMobile(phoneNo,'086') <= 0)
			{
				retrunStatur = '-101';
				returnMsg	 = phoneError;
			}
		}
		return {status:retrunStatur,msg:returnMsg}
	}
}
