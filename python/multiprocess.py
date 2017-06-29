# -*- coding: utf-8 -*-
"""
Created on Thu Jun 29 09:35:30 2017

@author: user
"""

import threading
from bs4 import BeautifulSoup
import urllib.parse
# import pymysql
import urllib.request
from datetime import datetime

def get_content(url,kw,page):
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:53.0) Gecko/20100101 Firefox/53.0 ',
                 'host': 'img01.zhaopin.cn'}  # 模拟浏览器
    opener = urllib.request.build_opener()
    opener.addheaders = [headers]
    data = opener.open(url, timeout=30)
    html = data.read()
    
    global job_list
    job_list = []
    try:
        soup = BeautifulSoup(html, 'lxml')
        for item in soup.find_all('td', class_=['zwmc', 'gsmc', 'zwyx', 'gzdd', 'gxsj']):
            job_list.append(item.get_text().strip())               
    except:
       pass
    
def main():
    now = datetime.now()
    print(now)     
    thread = []
    kws = ['java', 'python', 'php', '机器学习', '数据分析',  'javascript',
       '数据挖掘', '大数据', '智能家居', 'vr工程师', '机器人', '深度学习', '人工智能'] 
    for kw in kws:
        for page in range(1, 30):
             url = "http://sou.zhaopin.com/jobs/searchresult.ashx?jl=%e5%85%a8%e5%9b%bd&kw=" + urllib.parse.quote(kw) + \
            "&sm=0&source=0&sg=c131af6ec2c74dfba41100e1c8925118&p="+str(page)+'.html'
             t = threading.Thread(target=get_content,args=(url, kw, page))
             thread.append(t)
    
    te = len(thread)
             
    for j in range(0,te):
        try:
            thread[j].start()
        except:
            pass
 
    for k in range(0,te):
        try:
            thread[k].join()
        except:
            pass
    
    end = datetime.now()
   
    
    with open('test.csv', 'w', encoding='utf-8') as f:  # 不覆盖原来内容
        f.write('\n')
        for i in range(len(job_list)):
            if i % 5 != 4:
                f.write(job_list[i])
                f.write(',')
            if i % 5 == 4:
                f.write(job_list[i])
                f.write('\n')
    print(end)
    print("程序耗时： " + str(end-now))
    
if __name__ == '__main__':
    main()
    
    
    
    
    
    


    