# -*- coding: utf-8 -*-
"""
Created on Mon Apr 10 11:00:25 2017

@author: user
"""

import pandas as pd

df=pd.read_excel("AB.xlsx",sheetname="AB")
key=[]
for i in df.columns:
    key.append(i)
# print(key)
len_key=len(key)
# print(len_key)
'''
write=pd.ExcelWriter("out2.xlsx")
for j in range(3000):
    for i in range(len_key):
        if df[key[i]][j]=="":
            del df[j]


for i in range(len_key):
    if i>=37:
        del df[key[i]]
df.to_excel(write)
write.save()
'''f

print(df[key[24:27]].mean())
print(df[key[24:27]].count())