# -*- coding: utf-8 -*-
"""
Created on Sat May 27 10:29:57 2017

@author: user
"""

import requests
from bs4 import BeautifulSoup
import pandas as pd
# from multiprocessing import Pool

def get_zhaopin(page):
    url = 'http://sou.zhaopin.com/jobs/searchresult.ashx?jl=全国&kw=python&p={0}&kt=3'.format(page)
    print("第{0}页".format(page))
    wbdata = requests.get(url).content
    soup = BeautifulSoup(wbdata,'lxml')

    job_name = soup.select("table.newlist > tr > td.zwmc > div > a")
    salarys = soup.select("table.newlist > tr > td.zwyx")
    locations = soup.select("table.newlist > tr > td.gzdd")
    times = soup.select("table.newlist > tr > td.gxsj > span")

    for name, salary, location, time in zip(job_name, salarys, locations, times):
        data = {
            'name': '',
            'salary': '',
            'location': '',
            'time': '',
        }
        data['name'] += name.get_text()
        data['salary'] += salary.get_text()
        data['location'] += location.get_text()
        data['time'] += time.get_text()
        
        
    return data

if __name__ == '__main__':
    df = pd.DataFrame(get_zhaopin(10),index = range(1000))
    write=pd.ExcelWriter("zhaopin.xlsx")
    df.to_excel(write)
    write.save()


    '''
    pool = Pool(processes=2)
    pool.map_async(get_zhaopin,range(1,10))
    pool.close()
    pool.join()
    '''