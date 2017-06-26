#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
@author: Homing
@software: PyCharm Community Edition
@file: get_html.py
@time: 2017/6/26 18:55
"""
import urllib.request
from bs4 import BeautifulSoup
import urllib.parse


def get_content(kw, page):
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:53.0) Gecko/20100101 Firefox/53.0 ', 'host':'img01.zhaopin.cn'}  # 模拟浏览器
    url ="http://sou.zhaopin.com/jobs/searchresult.ashx?jl=%e5%85%a8%e5%9b%bd&kw=" + urllib.parse.quote(kw) + "&sm=0&source=0&sg=c131af6ec2c74dfba41100e1c8925118&p="+str(page)+'.html'
    opener = urllib.request.build_opener()
    opener.addheaders = [headers]
    data = opener.open(url, timeout=30)
    html = data.read()
    data.close()
    return html

kws = ['java', 'python', 'php', '机器学习', '数据分析', 'BI', 'go',  'javascript', 'r语言',
       '数据挖掘', '大数据', '智能家居', 'vr工程师', '机器人', '深度学习', '人工智能']
job_list = []


def main():
    for kw in kws:
        for page in range(1, 100):
            try:
                soup = BeautifulSoup(get_content(kw, page), 'lxml')
                for item in soup.find_all('td', class_=['zwmc', 'gsmc', 'zwyx', 'gzdd', 'gxsj']):
                    job_list.append(item.get_text().strip())
            except:
                pass

    with open('job_zl.csv', 'w', encoding='utf-8') as f:
        f.write('岗位')
        f.write(',')
        f.write('公司')
        f.write(',')
        f.write('工资')
        f.write(',')
        f.write('地区')
        f.write(',')
        f.write('发布时间')
        f.write('\n')
        for i in range(len(job_list)):
            if i % 5 != 4:
                f.write(job_list[i])
                f.write(',')
            if i % 5 == 4:
                f.write(job_list[i])
                f.write('\n')


if __name__ == '__main__':
    main()





