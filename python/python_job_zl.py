#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
@author: Homing
@software: PyCharm Community Edition
@file: python_job_zl.py
@time: 2017/6/11 9:43
"""
import urllib.request
import sys
import io
from bs4 import BeautifulSoup
sys.stdout = io.TextIOWrapper(sys.stdout.buffer,encoding='utf-8')
import urllib.parse
# http://sou.zhaopin.com/jobs/searchresult.ashx?jl=%E5%85%A8%E5%9B%BD&kw=python&isadv=0&sg=80f7b5a967d64ab5af80da45cbba665e&p=90

def get_content(page):
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:53.0) Gecko/20100101 Firefox/53.0 ', 'host':'img01.zhaopin.cn'}  # 模拟浏览器
    url ='http://sou.zhaopin.com/jobs/searchresult.ashx?jl=%E5%85%A8%E5%9B%BD&kw=python&isadv=0&sg=80f7b5a967d64ab5af80da45cbba665e&p='+str(page)+'.html'
    opener = urllib.request.build_opener()
    opener.addheaders = [headers]
    data = opener.open(url, timeout=30)
    html = data.read()
    data.close()
    return html




l = []

for page in range(1,91):
    soup = BeautifulSoup(get_content(page), 'lxml',from_encoding='utf-8')
    for i in soup.find_all('td', class_=['zwmc', 'gsmc',  'zwyx',  'gzdd', 'gxsj']):
        if len(i.get_text().strip()) > 1:
            l.append(i.get_text().strip())
        i = str(i).strip()
        k = i.find('href')
        m = i.find('htm')
        t = i.find(r'jobs')
        j = i.find('style')
'''
        if k > 0 and t<0 and len(i.strip())>1 and len(i)> k+6 :
            print(k,i[0:400])
            #print(i[0:200])
            if (m<0 and 'java' not in i) and k <250  :
                l.append('Not exist')
            else:
                l.append(str(i[k+6:m+3]).strip())
'''


l1 = []
for i in l:
    if len(i)>1:
        l1.append(i)


fo = open('python_job_zl1.csv', 'w', encoding='utf-8')
fo.write('岗位')
fo.write(',')
fo.write('公司')
fo.write(',')
fo.write('工资')
fo.write(',')
fo.write('地区')
fo.write(',')
fo.write('发布时间')
fo.write('\n')
for i in range(len(l1)):
    if i%5 == 0:
        fo.write(l1[i])
        fo.write(' ,  ')
    if i%5 == 1:
        fo.write(l1[i])
        fo.write('  , ')
    if i%5 ==2:
        fo.write(l1[i])
        fo.write(' , ')
    if i%5 ==3:
        fo.write(l1[i])
        fo.write(' , ')
    if i%5 ==4:
        fo.write(l1[i])
        fo.write('\n')









