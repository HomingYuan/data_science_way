#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
@author: Homing
@software: PyCharm Community Edition
@file: mail_test.py
@time: 2017/5/29 14:47
"""
import yagmail

def send_email(header, attachement,body,to_list):
    yag = yagmail.SMTP(user='470034235@qq.com', 
         password='tahequumnrykcbdh', host='smtp.qq.com', port=25)
    yag.send(to_list,header,body,attachement)

def main():
    header = input('please enter header:')
    attachement = input('please enter attachment:')
    body = input('Please enter the contents: ')
    to_list = ['470034235@qq.com']
    send_email(header, attachement,body,to_list)


if __name__ == '__main__':
    main()
    
    
    
    
    
    


