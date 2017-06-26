# -*- coding: utf-8 -*-
"""
Created on Mon Jun 26 15:46:51 2017

@author: user
"""

# http://sz.fang.lianjia.com/loupan/
import urllib.request
from bs4 import BeautifulSoup


def get_html(page):
    url = 'http://sz.fang.lianjia.com/loupan/pg' + str(page) + '.html'
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:53.0) Gecko/20100101 Firefox/53.0 ', 
                      'host':'img01.zhaopin.cn'}
    opener = urllib.request.build_opener()
    opener.addheaders = [headers]
    data = opener.open(url, timeout=30)
    html = data.read()
    data.close()
    return html
house_wh = []

for page in range(1,2):
    soup =  BeautifulSoup(get_html(page), 'lxml')
    for item in soup.find_all('a',target="_blank"):
        print(item.get_text())
        house_wh.append(item.get_text())
    
    
with open('house_price_sz_lianjia.csv', 'w', encoding='utf-8') as fo:
    for item in house_wh:
        fo.write(item)
        fo.write('\n')