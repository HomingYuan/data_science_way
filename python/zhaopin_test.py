# -*- coding: utf-8 -*-
"""
Created on Sat May 27 14:03:08 2017

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
    soup = BeautifulSoup(wbdata, 'lxml')

    job_name = soup.select("newlist > tr > td.zwmc > div > a")
    salarys = soup.select("newlist > tr > td.zwyx")
    locations = soup.select("newlist > tr > td.gzdd")
    times = soup.select("newlist > tr > td.gxsj > span")
    d_name = []
    d_salary = []
    d_location = []
    d_time = []
    data =[]
    for name, salary, location, time in zip(job_name, salarys, locations, times):
        d_name.append(name.get_text())
        d_salary.append(salary.get_text())
        d_location.append(location.get_text())
        d_time.append(time.get_text())
        data = [d_name,d_salary,d_location,d_time]
        # data = {'name': d_name, 'salary': d_salary, 'location': d_location, 'time': d_time}
    print('d_name',d_name)
    print('data', data)
    return data



if __name__ == '__main__':
    df = pd.DataFrame(get_zhaopin(10),index = range(1000))
    write=pd.ExcelWriter("zhaopin.xlsx")
    df.to_excel(write)
    write.save()