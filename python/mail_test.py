#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
@author: Homing
@software: PyCharm Community Edition
@file: mail_test.py
@time: 2017/5/29 14:47
"""
import yagmail

yag = yagmail.SMTP(user='470034235@qq.com', password='tahequumnrykcbdh', host='smtp.qq.com', port=25)

content = ['sklearn', 'you can find it from attached', 'sklearn.7z']
yag.send(['470034235@qq.com'], 'this mail come from hongming',content)









