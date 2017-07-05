# -*- coding: utf-8 -*-
"""
Created on Tue Jun 27 14:22:12 2017

@author: user
"""

import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

# 判断是否为汉字


def check_contain_chinese(check_str):
    for ch in check_str:
        if u'\u4e00' <= ch <= u'\u9fff':
            return True
    return False

df = pd.read_csv('job_analyse_zl.csv', sep=',', error_bad_lines=False, names=['岗位', '公司', '工资', '地区', '发布时间'])
# if there is bad line use error_bad_lines = False
# print(df.head())

position = df['岗位']
company = df['公司']
salary = df['工资']
location = df ['地区']
time = df['发布时间']
salary_100 = salary[:100]

print(position)

salary_high =[]
salary_low = []

for i in salary:
    t = i.find('-')
    low = i[:t]
    high = i[t+1:]
    salary_low.append(low)
    salary_high.append(high)
    
salary_low1 = []
for i in salary_low:
    if not check_contain_chinese(i):
        salary_low1.append(int(i))
    else:
        salary_low1.append(0)

salary_high1 = []
for i in salary_high:
    if not check_contain_chinese(i):
        salary_high1.append(int(i))
    else:
        salary_high1.append(0)
position = [i for i in position]
company = [i for i in company]
df1 = pd.DataFrame([position, company, salary_low1, salary_high1], index=['position', 'company', 'salary_low', 'salary_high']).T
# df1.to_csv('job_clean_data.csv',sep=',',encoding='utf-8') # 写到本地文件


"""

class clear_data(object):
    def __init__(self, position, company, salary, location, post_time):
        self.position = position
        self.company = company
        self.salary = salary
        self.location = location
        self.post_time = post_time

    def split_data(self):
        salary_low = []
        salary_high = []
        for i in self.salary:
            t = i.find('-')
            low = i[:t]
            high = i[t + 1:]
            salary_low.append(low)
            salary_high.append(high)
        return salary_high, salary_low

    def check_contain_chinese(check_string):
        for ch in check_string:
            if u'\u4e00' <= ch <= u'\u9fff':
                return True
        return False

    def clean_data(self):
        salary_low = split_data()[0]
        salary_high = split_data()[1]
        for

"""
    

