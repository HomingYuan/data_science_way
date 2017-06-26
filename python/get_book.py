opener.addheaders = [headers]
    data = opener.open(url, timeout=30)
    html = data.read()
    data.close()
    return html# -*- coding: utf-8 -*-
"""
Created on Fri Jun 23 15:49:52 2017

@author: user
"""
from bs4 import BeautifulSoup
import urllib.request
import yagmail

def get_content(page):
    url = "http://www.kanunu8.com/book4/" + str(page) + "/index.html"
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:53.0) Gecko/20100101 Firefox/53.0 ', 'host':'img01.zhaopin.cn'}
    opener = urllib.request.build_opener()
    
book_title = []
for page in range(10100,10717):
    try:
        soup =  BeautifulSoup(get_content(page), 'lxml')
        for item in soup.find_all('title'):
            book_title.append(item.get_text())
    except:
        pass



    
fo = open('book_title.txt', 'w', encoding='utf-8')
for item in book_title:
    fo.write(item)
    fo.write('\n')
yag = yagmail.SMTP(user='470034235@qq.com', 
         password='tahequumnrykcbdh', host='smtp.qq.com', port=25)

yag.send('470034235@qq.com','book list','book list','book_title.txt')