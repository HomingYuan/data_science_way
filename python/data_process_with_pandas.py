# -*- coding: utf-8 -*-
"""
Created on Fri Jun 30 10:04:29 2017

@author: user
"""

import pandas as pd
import matplotlib.pyplot as plt
import numpy as np


def check_contain_chinese(check_str):
    for ch in check_str:
        if u'\u4e00' <= ch <= u'\u9fff':
            return True
    return False

df = pd.read_csv('job_analyse_zl.csv', sep=',', error_bad_lines=False, 
                 names=['岗位', '公司', '工资', '地区', '发布时间'])


kws = ['java', 'python', 'php', '机器学习', '数据分析', 'go',  'javascript',
       '数据挖掘', '大数据', '智能家居', 'vr工程师', '机器人', '深度学习', '人工智能']

kw = 'python'

"""
消耗内存太大，直接死机
for kw in df[df.columns[0]]:
    kw_list.append(df[df.columns])
print(kw_list)
"""
# print(df.columns)  # 获取df列

# print(df[df.columns])  # 读取所有的信息
# print(df.values[0])  # 查看数据值
# print(df.describe)  # 描述性统计
# print(df.index)  # 索引
# print(df.head())  # 前五列
# print(df.head) # 所有的信息和df.head()不一样
# print(df.T)# 转置

salary_low = [x[:x.find('-')] for x in df['工资']] # 获得最低工资
salary_high = [x[x.find('-')+1:] for x in df['工资']] # 获得最高工资

p = [x for (x,y) in enumerate(df['岗位']) if 'python' in y] # 获取包含列岗位的序号

# print(p[4000:])
# 将上面数据打包成函数

def get_index(kw):
    return [x for (x,y) in enumerate(df['岗位']) if kw in y.lower()]

java_job = get_index('java')
print(java_job[:100])

