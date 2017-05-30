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

content = ['day5_6homework', 'you can find it from attached', 'day5_6homework.py']
yag.send(['470034235@qq.com', 'me@mingxinglai.com'], 'this mail come from hongming',content)









