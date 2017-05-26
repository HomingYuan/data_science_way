# -*- coding: utf-8 -*-
"""
Created on Fri May 26 12:14:09 2017

@author: user
"""

# -*- coding:utf-8 -*-
import urllib.request
import re
import socket
import time

timeout = 1
socket.setdefaulttimeout(timeout)  # 这里对整个socket层设置超时时间。后续文件中如果再使用到socket，不必再设置
sleep_download_time = 3
time.sleep(sleep_download_time)  # 这里时间自己设定


def get_content(page):
    url ='http://search.51job.com/list/000000,000000,0000,00,9,99,python,2,'+ str(page)+'.html'
    a = urllib.request.urlopen(url)  # 打开网址
    html = a.read().decode('utf-8')  # 读取源代码并转为unicode
    return html


def get(html):
    reg = re.compile(r'class="t1 ">.*? <a target="_blank" title="(.*?)".*? <span class="t2">'
                     r'<a target="_blank" title="(.*?)".*?<span class="t3">(.*?)</span>.*?<span class="t4">'
                     r'(.*?)</span>.*? <span class="t5">(.*?)</span>', re.S)  # 匹配换行符
    items=re.findall(reg,html)
    return items

#多页处理，下载到文件
for j in range(1, 10):
    print("正在爬取第"+str(j)+"页数据...")
    html=get_content(j)  # 调用获取网页原码
    for i in get(html):
        print(i[0],i[1],i[2],i[3],i[4])
        with open ('51job.txt','a',encoding='utf-8') as f:
            f.write(i[0]+'\t'+i[1]+'\t'+i[2]+'\t'+i[3]+'\t'+i[4]+'\n')
            f.close()