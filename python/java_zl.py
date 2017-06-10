#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
@author: Homing
@software: PyCharm Community Edition
@file: java_zl.py
@time: 2017/6/10 22:24
"""


# 爬取网页http://sou.zhaopin.com/jobs/searchresult.ashx?jl=%e5%85%a8%e5%9b%bd&kw=java&sm=0&source=0&sg=c131af6ec2c74dfba41100e1c8925118&p=1
import urllib.request
import re
from bs4 import BeautifulSoup
import xlwt#用来创建excel文档并写入数据


def get_content(page=2):
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:53.0) Gecko/20100101 Firefox/53.0 ', 'host':'img01.zhaopin.cn'}  # 模拟浏览器
    url ='http://sou.zhaopin.com/jobs/searchresult.ashx?jl=%e5%85%a8%e5%9b%bd&kw=java&sm=0&source=0&sg=c131af6ec2c74dfba41100e1c8925118&p='+str(page)+'.html'
    opener = urllib.request.build_opener()
    opener.addheaders = [headers]
    data = opener.open(url, timeout=30)
    html = data.read()
    data.close()
    return html


#print(get_content(1))

l = []
'''
for link in soup.find_all('td'):
    print(link.attrs)
'''
for page in range(1,91):
    soup = BeautifulSoup(get_content(page), 'lxml')
    for i in soup.find_all('td', class_=['zwmc','gsmc', 'zwyx', 'gzdd', 'gxsj']):
        l.append(i.get_text().strip())




fo = open('java_job_zl.csv', 'w', encoding='utf-8')
for i in range(len(l)):
    if i%5 == 0:
        fo.write(l[i])
        fo.write('   ')
    if i%5 == 1:
        fo.write(l[i])
        fo.write('   ')
    if i%5 ==2:
        fo.write(l[i])
        fo.write('  ')
    if i%5 ==3:
        fo.write(l[i])
        fo.write('  ')
    if i%5 ==4:
        fo.write(l[i])
        fo.write('\n')









