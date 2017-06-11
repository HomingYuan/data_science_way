#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
@author: Homing
@software: PyCharm Community Edition
@file: zl_job_mining.py
@time: 2017/6/11 9:55
"""
# http://sou.zhaopin.com/jobs/searchresult.ashx?jl=%E5%85%A8%E5%9B%BD&kw=java&isadv=0&sg=80f7b5a967d64ab5af80da45cbba665e&p=1
# http://sou.zhaopin.com/jobs/searchresult.ashx?jl=%e5%85%a8%e5%9b%bd%2b%e6%b7%b1%e5%9c%b3&kw=%e6%9c%ba%e5%99%a8%e5%ad%a6%e4%b9%a0&isadv=0&sg=5105a7fb5859403d81bc25ea26eb5206&p=2

import urllib.request
from bs4 import BeautifulSoup


def get_html(kw, page):
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:53.0) Gecko/20100101 Firefox/53.0 ',
               'host': 'img01.zhaopin.cn'}  # 模拟浏览器
    url = 'http://sou.zhaopin.com/jobs/searchresult.ashx?jl=%E5%85%A8%E5%9B%BD&kw=' + str(kw) + '&isadv=0&sg=80f7b5a967d64ab5af80da45cbba665e&p=' + str(page) +'.html'
    opener = urllib.request.build_opener()
    opener.addheaders = [headers]
    data = opener.open(url, timeout=30)
    html = data.read()
    data.close()
    return html


def get_data():
    l = []
    kws = ['python', 'java', 'php', 'c%23', '%e6%95%b0%e6%8d%ae%e6%8c%96%e6%8e%98', '%e6%9c%ba%e5%99%a8%e5%ad%a6%e4%b9%a0']
    for kw in kws:
        for page in range(91):
            soup = BeautifulSoup(get_html(kw, page), 'lxml')
            for i in soup.find_all('td', class_=['zwmc', 'gsmc', 'zwyx', 'gzdd', 'gxsj']):
                l.append(i.get_text().strip())
    return l


def main():
    fo = open('zl_job.csv', 'w', encoding='utf-8')
    l = get_data()
    for i in range(len(l)):
        if i % 5 != 4:
            fo.write(l[i])
            fo.write(',')
        if i % 5 == 4:
            fo.write(l[i])
            fo.write('\n')

if __name__ == '__main__':
    main()
