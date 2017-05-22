# -*- coding: utf-8 -*-
"""
Created on Mon May 22 11:36:26 2017

@author: user
"""
from collections import defaultdict
import pandas as pd
import os

def pinyin_to_chinese(x):
    dic = {}
    d=defaultdict(list)
    with open("unicode_pinyin.txt") as f:
        for i in f.readlines():
            dic[i.split()[0]] = i.split()[1]
    for k,v in dic.items():
        d[v].append(k)
    # print(d)
    return d

con = pinyin_to_chinese(1)
l = [(k,v) for k,v in con.items()]

df = pd.DataFrame(l)
df.to_csv('pinyin_unicode.csv',header =['pinyin','unicode'])

print(os.path.abspath('pinyin_unicode.csv'))