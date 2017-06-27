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

df = pd.read_csv('job_analyse_zl.csv',sep=',', error_bad_lines=False)
# if there is bad line use error_bad_lines = False
position = df['岗位']
company = df['公司']
salary = df['工资']
location = df ['地区']
time = df['发布时间']
salary_100 = salary[:100]

salary_high =[]
salary_low = []

for i in salary:
    t = i.find('-')
    low =i[:t]
    print(low)
    high = i[t+1:]
    salary_low.append(low)
    salary_high.append(high)
    
salary_low1 = []
for i in salary_low:
    if not check_contain_chinese(i):
        salary_low1.append(int(i))
    else:
        salary_low1.append(0)
        
for i in salary_low1:
    print(i)
    

