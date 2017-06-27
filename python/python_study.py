#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
@author: Homing
@software: PyCharm Community Edition
@file: python_study.py
@time: 2017/5/3 19:20
"""
#导入需要的库
import pandas as pd

import numpy as np

import re
'''
1. python

数据清洗与merge

pd.qcut(data,n)d对数据data进行n分位数分割
'''

# 排列和随机采样
'''
df = pd.DataFrame(np.arange(5*4).reshape(5,4))
sampler = np.random.permutation(5) # 实现随机重排
# print(sampler)

# print(df)
# print(df.take(sampler))
df.take(np.random.permutation(len(df))[:3])

bag = np.array([5,7,-1,6,4])
sampler1 = np.random.randint(0,len(bag),size =10)
# print(sampler1)
draws = bag.take(sampler1)
# print(draws)
'''
# 计算指标和哑变量
'''
df = pd.DataFrame({'key':['b','b','a','c','a','b'],'data1':range(6)})
t = pd.get_dummies(df['key']) # 如果有m 个key，n个不重复key 返回m*n的矩阵，相同的话为1，否则为0
# print(t)
# print(df)
dummies = pd.get_dummies(df['key'],prefix='key')
df_with_dummy = [['data1']].join(dummies)
print(df_with_dummy)
'''
# 离散化数据
'''
values = np.random.rand(10)
print(values)

bins =[0,0.2,0.4,0.6,0.8,1.0]
t= pd.get_dummies(pd.cut(values,bins))
print(t)
'''
# 字符串对象方法
'''
val = 'a,b, guido'
t = val.split(',')
# print(t)

t1 = [x.strip() for x in val.split(',')]
# print(t1)
first,second,third =t1
k = first + '::' + second + '::' + third
j = first + '!!' + second + '!!' + third
# print(k,j)

i = '::'.join(t1)
# print(i)
# print(val.find(':'))
# print(val.count(','))
# print(val.replace(',','::'))
# print(val.replace(',',''))
text = "foo bar\t baz \tqux"
'''
# 正则表达式处理字符串
'''
re1 =re.split('\s+',text)

print(re1)
'''
# pandas矢量化的字符串函数

data = {'Dave':'dave@google.com','Steven':'steven@gmail.com','Rob':'rob@gmail.com','wes':np.nan}
data = pd.Series(data)
# print(data)

# print(data.str.contains('gmail'))
pattern = r'[A-Z0-9.%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4)'

