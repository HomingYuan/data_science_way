#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
@author: Homing
@software: PyCharm Community Edition
@file: 51job_analyse.py
@time: 2017/6/10 19:31
"""
import urllib.request
import re
from bs4 import BeautifulSoup
import xlwt#用来创建excel文档并写入数据


def get_content(page=2):
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:53.0) Gecko/20100101 Firefox/53.0 ', 'host':'js.51jobcdn.com'}  # 模拟浏览器
    url ='http://search.51job.com/list/000000,000000,0000,00,9,99,python,2,'+ str(page)+'.html'
    opener = urllib.request.build_opener()
    opener.addheaders = [headers]
    data = opener.open(url, timeout=30)
    html = data.read()
    data.close()
    return html


# print(get_content(2))
soup = BeautifulSoup(get_content(2), 'lxml')
print(soup.find_all('span') )

l = []
fo = open('python_job.csv', 'w', encoding='utf-8')
for pos in soup.find_all('span', class_=['t2', 't3', 't4']):
    text = pos.get_text().strip()
    print(text)
    # fo.write(text)
    l.append(text)
    #fo.write('\n')
# print(l)
for i in range(len(l)):
    if i%3 == 0:
        fo.write(l[i])
        fo.write('   ')
    if i%3 == 1:
        fo.write(l[i])
        fo.write('   ')
    if i%3 ==2:
        fo.write(l[i])
        print(l[i])
        fo.write('\n')







# fo.write(position)







