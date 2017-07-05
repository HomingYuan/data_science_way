#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
@author: Homing
@software: PyCharm Community Edition
@file: data_machine_leanring.py
@time: 2017/7/1 16:16
"""
import urllib.request
from bs4 import BeautifulSoup
import urllib.parse


def get_content():
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:53.0) '
                             'Gecko/20100101 Firefox/53.0 ', 'host': 'img01.zhaopin.cn'}  # 模拟浏览器
    url = "https://archive.ics.uci.edu/ml/machine-learning-databases"
    opener = urllib.request.build_opener()
    opener.addheaders = [headers]
    data = opener.open(url, timeout=30)
    html = data.read()
    data.close()
    return html


soup = BeautifulSoup(get_content(), 'lxml')

data_list = []
for i in soup.find_all('a'):
    # print(i.get_text().strip())
    t = i.get_text().strip()
    if t.find('/') > 2:
        data_list.append(t[:t.find('/')])


with open('data_reource.csv', 'w', encoding='utf-8') as f:
    for item in data_list:
        f.write(item)
        f.write('\n')