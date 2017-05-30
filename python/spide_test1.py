# -*- coding: utf-8 -*-
"""
Created on Sat May 27 23:10:50 2017

@author: hongming
"""

import urllib
import urllib.request
import requests
import re
import time



def get_html(url):
    page = requests.get(url)
    return page.text

def get_text(html,file):
    textre = re.compile(r'content">\n*<span>(.*)</span>')
    textlist = re.findall(textre,html)
    num = 0
    txt = []
    for i in textlist:
        num += 1
        txt.append(str(num)+'.'+i+'\n'*2)
    with open(file,'w',encoding='utf-8') as f:
        f.writelines(txt)

def get_img(html):
    imgre = re.compile(r'<img src="(.*\.JPEG)" alt=',re.IGNORECASE)
    imglist = re.findall(imgre,html)
    x = 0
    for imgurl in imglist:
        x += 1
        urllib.request.urlretrieve(imgurl, '%s.jpg' % x)

html = get_html(r"http://www.qiushibaike.com/8hr/page/2/")
file_name = 'xiu_shi_bai_ke'+ str(int(time.time())) + ".txt"
get_text(html,file_name)
# get_img(html)