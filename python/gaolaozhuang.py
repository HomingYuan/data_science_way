# -*- coding: utf-8 -*-
"""
Created on Fri Jun 23 14:44:38 2017

@author: user
"""
from bs4 import BeautifulSoup
import urllib.request
import yagmail


def get_content(page):
    url = "http://www.kanunu8.com/book4/10534/" + str(page) + ".html"
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:53.0) Gecko/20100101 Firefox/53.0 ', 'host':'img01.zhaopin.cn'}
    opener = urllib.request.build_opener()
    opener.addheaders = [headers]
    data = opener.open(url, timeout=30)
    html = data.read()
    data.close()
    return html

l=[]
for page in range(184948,184971):
    soup =  BeautifulSoup(get_content(page), 'lxml')
    for item in soup.find_all('p'):
        l.append(item.get_text())

title = '中国文脉'
filepath = title + '.txt'

fo = open(filepath, 'w', encoding='utf-8')
fo.write(title)
for item in l:
    fo.write(item)

yag = yagmail.SMTP(user='470034235@qq.com', 
         password='tahequumnrykcbdh', host='smtp.qq.com', port=25)

yag.send('470034235@qq.com',title,title,filepath)



