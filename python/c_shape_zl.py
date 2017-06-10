#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
@author: Homing
@software: PyCharm Community Edition
@file: c_shape_zl.py
@time: 2017/6/10 22:32
"""
# http://sou.zhaopin.com/jobs/searchresult.ashx?jl=%E5%85%A8%E5%9B%BD&kw=c%23&isadv=0&sg=45673f1416a4448f984e160967b87162&p=90

import urllib.request
import re
from bs4 import BeautifulSoup
import xlwt#用来创建excel文档并写入数据


def get_content(page=2):
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:53.0) Gecko/20100101 Firefox/53.0 ', 'host':'img01.zhaopin.cn'}  # 模拟浏览器
    url ='http://sou.zhaopin.com/jobs/searchresult.ashx?jl=%E5%85%A8%E5%9B%BD&kw=c%23&isadv=0&sg=45673f1416a4448f984e160967b87162&p='+str(page)+'.html'
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




fo = open('cshape_job_zl.csv', 'w', encoding='utf-8')
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








