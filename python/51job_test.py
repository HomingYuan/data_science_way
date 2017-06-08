# -*- coding: utf-8 -*-
"""
Created on Fri May 26 12:14:09 2017

@author: user
"""


import urllib.request
import re

#获取原码
def get_content(page):
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:53.0) Gecko/20100101 Firefox/53.0 ', 'host':'js.51jobcdn.com'}  # 模拟浏览器
    url ='http://search.51job.com/list/000000,000000,0000,00,9,99,python,2,'+ str(page)+'.html'
    opener = urllib.request.build_opener()
    opener.addheaders = [headers]
    data = opener.open(url, timeout=30)
    html = data.read().decode('utf-8')
    data.close()
    return html

def get(html):
    reg = re.compile(r'<class="t1 ">.*? <a target="_blank" title="(.*?)".*? <span class="t2"><a target="_blank" title="(.*?)".*?<span class="t3">(.*?)</span>.*?<span class="t4">(.*?)</span>.*? <span class="t5">(.*?)</span>',re.S)#匹配换行符
    items=re.findall(reg,html)
    return items

#多页处理，下载到文件
for  j in range(1,10):
    print("正在爬取第"+str(j)+"页数据...")
    html=get_content(j)#调用获取网页原码
    for i in get(html):
        print(i[0],i[1],i[2],i[3],i[4])
        with open (r'D:\Big_data\大数据学习\data_science_way\python\51job.txt','a',encoding='utf-8') as f:
            f.write(i[0]+'\t'+i[1]+'\t'+i[2]+'\t'+i[3]+'\t'+i[4]+'\n')
            f.close()