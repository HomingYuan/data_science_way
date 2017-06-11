# -*- coding: utf-8 -*-
"""
Created on Fri May 26 12:10:42 2017

@author: user
"""
# http://www.cnblogs.com/Beyond-Ricky/p/6771028.html

# http://sou.zhaopin.com/jobs/searchresult.ashx?jl=%e5%85%a8%e5%9b%bd&kw=%e6%95%b0%e6%8d%ae%e6%8c%96%e6%8e%98&sm=0&isadv=0&sg=93ae47a64c624f72bef585d54d221e15&p=2
import urllib.request
import re
import xlwt#用来创建excel文档并写入数据


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
    reg = re.compile(
        r'class="t1 ">.*? <a target="_blank" title="(.*?)".*? <span class="t2"><a target="_blank" title="(.*?)".*?<span class="t3">(.*?)</span>.*?<span class="t4">(.*?)</span>.*? <span class="t5">(.*?)</span>',
    re.S)  #匹配换行符class="t4">(.*?)</span>.*? <span class="t5">(.*?)</span>',re.S)#匹配换行符
    items = re.findall(reg, html)
    return items


def excel_write(items,index):
    l = []
#爬取到的内容写入excel表格
    for item in items:  # 职位信息
        for i in range(0, 5):
            l.append(i)
            # print item[i]
            ws.write(index, i, item[i])  # 行，列，数据
        index += 1
    return l

newTable = "51job.xls"  # 表格名称
wb = xlwt.Workbook(encoding='utf-8')  # 创建excel文件，声明编码
ws = wb.add_sheet('sheet1')  # 创建表格
headData = ['招聘职位', '公司', '地址', '薪资', '日期']  # 表头部信息
for colnum in range(0, 5):
    ws.write(0, colnum, headData[colnum], xlwt.easyxf('font: bold on'))  # 行，列
for each in range(1, 10):
    index = (each-1)*10+1
    excel_write(get(get_content(each)), index)
wb.save(newTable)