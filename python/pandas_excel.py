#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
@author: Homing
@software: PyCharm Community Edition
@file: test3.py
@time: 2017/4/6 21:47
"""
import pandas as pd

import numpy as np
# 读取excel表

df = pd.read_excel("rank.xlsx",sheetname='rank')
'''
# 读取后面
print(df.tail())
# 读取前面几行
print(df.head())
# 读取具体哪一行
print(df["语文"])
#汇总
sum1 = df["语文"].sum()
avg = df["语文"]
print(sum1)
# 描述值

print(df.describe())
print (df.head(10))
print(df.values)
'''
#print(df.index[1])
print(df.columns)

for i in df.columns:
    print (df[i])