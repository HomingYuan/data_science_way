#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
@author: Homing
@software: PyCharm Community Edition
@file: download_file.py
@time: 2017/7/1 18:20
"""
import pandas as pd
import urllib.request
from bs4 import BeautifulSoup
import urllib.parse
from datetime import datetime


url = 'https://archive.ics.uci.edu/ml/machine-learning-databases/00192/BreastTissue.xls'
df= pd.read_excel(url)
df.to_csv('1.csv')


class DownloadFile(object):
    def __init__(self,page, init_url, headers):
        self.page = page
        self.url = init_url
        self.headers = headers

    def fetch_file_list(self):
        opener = urllib.request.build_opener()
        opener.addheaders = [self.headers]
        data = opener.open(self.url, timeout=30)
        html = data.read()
        data.close()
        soup = BeautifulSoup(html, 'lxml')
        data_list = []
        for i in soup.find_all('a'):
            t = i.get_text().strip()
            if t.find('/') > 2:
                data_list.append(t[:t.find('/')])
        return data_list

    def down_file(self,path,down_url):
        down_url = self.url
        path = self.url + str(datetime.now().date()) + '.csv'
        df = pd.read_excel(self.url)
        df.to_csv(path)












