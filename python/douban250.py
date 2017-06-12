# -*- coding: utf-8 -*-
"""
Created on Mon Jun 12 09:35:17 2017

@author: user
"""
import urllib.request
from bs4 import BeautifulSoup


def get_html(page):
    url = 'https://book.douban.com/top250?start=' + str(25*int(page)) + '.html'
    headers = { "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",   "host":"book.douban.com"}
    opener = urllib.request.build_opener()
    opener.addheaders = [headers]
    data = opener.open(url, timeout=2)
    html = data.read()
    data.close()
    return html

'''

for item in soup.find_all('a'):
    print(item.get_text().strip())
   
for item in soup.find_all('a'):
    # print(item.get_text().strip())
    item1 = str(item)
    word_start=item1.find('title')
    if word_start>1:
        print(item.get_text().strip())
'''

l = []


for page in range(10):
    soup = BeautifulSoup(get_html(6),'lxml')
    for item in soup.find_all('a'):
        item1 = str(item)
        word_start = item1.find('title')
        if word_start>0:
             l.append(item.get_text().strip())
            
print(l)
     
'''
fo = open('douban250.csv','w',encoding='utf-8')
for book in l:
    fo.write(book)
'''