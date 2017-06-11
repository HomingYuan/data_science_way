#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
@author: Homing
@software: PyCharm Community Edition
@file: lp_job_mining.py
@time: 2017/6/11 16:28
"""
import urllib.request
from bs4 import BeautifulSoup


def get_html(page):
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:53.0) Gecko/20100101 Firefox/53.0 ',
               'host': 'www.fanqianbb.com'}
    url = 'https://www.liepin.com/zhaopin/?ckid=2f7be295787560c7&fromSearchBtn=2&degradeFlag=1&industries=360&init=-1&salary=0%240&dqs=050090&key=python&imscid=R000000058&headckid=2f7be295787560c7&curPage=' + str(page) + '.html'
    opener = urllib.request.build_opener()
    opener.addheaders = [headers]
    data = opener.open(url, timeout=30)
    html = data.read()
    data.close()
    return html

l = []


for page in range(81):
    soup = BeautifulSoup(get_html(0), 'lxml')
    for item in soup.find_all( class_=['sojob-item-main clearfix']):
        l.append(item.get_text().strip('\n'))


fo = open('lp_job.csv', 'w', encoding='utf-8')
for i in l:
    fo.write(i.strip(''))

