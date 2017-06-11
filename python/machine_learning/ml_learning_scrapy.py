#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
@author: Homing
@software: PyCharm Community Edition
@file: ml_learning_scrapy.py
@time: 2017/6/11 20:19
"""
from bs4 import BeautifulSoup
import urllib.request


def get_html(urls):
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:53.0) Gecko/20100101 Firefox/53.0',
               'host': 'sklearn.lzjqsdd.com'}
    opener = urllib.request.build_opener()
    opener.addheaders = [headers]
    data = opener.open(urls, timeout=30)
    html = data.read()
    data.close()
    return html

l = []
urls = ['http://sklearn.lzjqsdd.com/supervised_learning.html#supervised-learning',
        'http://sklearn.lzjqsdd.com/modules/clustering.html#clustering',
        'http://sklearn.lzjqsdd.com/modules/decomposition.html#decompositions',
        'http://sklearn.lzjqsdd.com/model_selection.html#model-selection',
        'http://sklearn.lzjqsdd.com/modules/preprocessing.html#preprocessing']
for url in urls:
    soup = BeautifulSoup(get_html(url))
    for item in soup.find_all('li'):
        l.append(item.get_text().strip())

f = open('machine_learning.csv', 'w', encoding='utf-8')

for word in l:
    f.write(word)
