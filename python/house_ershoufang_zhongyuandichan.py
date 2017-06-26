# -*- coding: utf-8 -*-
"""
Created on Mon Jun 26 13:46:42 2017

@author: user
"""

import urllib.request
from bs4 import BeautifulSoup

def get_html(city, page):
    url = 'http://'+ city + '.centanet.com/xinfang/g' + str(page) + '/'
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:53.0) Gecko/20100101 Firefox/53.0 ', 
                      'host':'img01.zhaopin.cn'}
    opener = urllib.request.build_opener()
    opener.addheaders = [headers]
    data = opener.open(url, timeout=30)
    html = data.read()
    data.close()
    return html

house_price = []
citys = ['sz','wh']
# citys = ['sz','bj','sh','wh','cs','cd','cq','dg','hz']
for city in citys:
    for page in range(1,2):
        try:
            soup =  BeautifulSoup(get_html(city,page), 'lxml')
            for item in soup.find_all('div'):
                print('output',item.attrs)
                house_price.append(item.get_text().strip())
        except:
            pass
        
with open('house_price_zhongyuandichan_ershoufang.csv', 'w', encoding='utf-8') as fo:
    for item in house_price:
        fo.write(item)