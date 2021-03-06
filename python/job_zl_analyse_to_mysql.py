#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
@author: Homing
@software: PyCharm Community Edition
@file: job_zl_analyse_to_mysql.py
@time: 2017/6/28 22:47
"""

import urllib.request
from bs4 import BeautifulSoup
import urllib.parse
import pymysql
# 链接到mysql
connection = pymysql.connect(host='127.0.0.1',
                             port=3306,
                             user='root',
                             password='password',
                             db='y1',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)
curson = connection.cursor()


def get_content(kw, page):
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:53.0) Gecko/20100101 Firefox/53.0 ',
                 'host': 'img01.zhaopin.cn'}  # 模拟浏览器
    url = "http://sou.zhaopin.com/jobs/searchresult.ashx?jl=%e5%85%a8%e5%9b%bd&kw=" + urllib.parse.quote(kw) + \
            "&sm=0&source=0&sg=c131af6ec2c74dfba41100e1c8925118&p="+str(page)+'.html'
    opener = urllib.request.build_opener()
    opener.addheaders = [headers]
    data = opener.open(url, timeout=30)
    html = data.read()
    data.close()
    return html

kws = ['java', 'python', 'php', '机器学习', '数据分析', 'go',  'javascript',
       '数据挖掘', '大数据', '智能家居', 'vr工程师', '机器人', '深度学习', '人工智能']

count = 0


def get_data():
    for kw in kws:
        for page in range(1, 100):
            try:
                soup = BeautifulSoup(get_content(kw, page), 'lxml')
                for item in soup.find_all('td', class_=['zwmc', 'gsmc', 'zwyx', 'gzdd', 'gxsj']):
                    data = item.get_text().strip()
                    yield data
            except:
                pass

job_list = list(get_data())

for i in range(0, len(job_list)-4, 5):
    sql_select = "insert into job (position,company,salary,location,post_time) values ('%s','%s','%s','%s','%s')"\
                 % (job_list[i],job_list[i+1],job_list[i+2],job_list[i+3],job_list[i+4])

    try:
        count += 1
        curson.execute(sql_select)
        connection.commit()
        print('第%d列数据正在导入...' % count)
    except Exception as e:
        print(e)
        connection.rollback()

curson.close()
connection.close()
