# -*- coding: utf-8 -*-
"""
Created on Wed Jun 14 11:07:56 2017

@author: user
"""

import urllib.request
from bs4 import BeautifulSoup
# url =http://baike.baidu.com/item/%E5%8F%B0%E9%A3%8E%E5%91%BD%E5%90%8D%E6%B3%95?sefr=ps
def get_html():
    url ='http://baike.baidu.com/item/%E5%8F%B0%E9%A3%8E%E5%91%BD%E5%90%8D%E6%B3%95?sefr=ps.html'
    headers = { "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",   "host":"book.douban.com"}
    opener = urllib.request.build_opener()
    opener.addheaders = [headers]
    data = opener.open(url, timeout=2)
    html = data.read()
    data.close()
    return html

l = []
soup = BeautifulSoup(get_html(),'lxml')
for item in soup.find_all('td'):
    l.append(item.get_text().strip())
fo = open('typhoon_name.csv','w',encoding='utf-8')
for i in range(len(l)):
        if i%7 != 6:
            fo.write(l[i])
            fo.write(',')
        if i%7 == 6:
            fo.write(l[i])
            fo.write('\n')