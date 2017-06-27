# -*- coding: utf-8 -*-
"""
Created on Mon Apr 10 08:39:30 2017

@author: user
"""

import pandas as pd
import nunpy as np

df=pd.read_excel("AB.xlsx",sheetname="AB")

# df1 = df.fillna("missing")
'''
for i in df.columns:
    print(i)
print(df.head(10))
'''
#创建并将修改内容写进新的Excel
write=pd.ExcelWriter("out2.xlsx")
df.dropna(axis=0, how="all")
del df['1']
del df['2']
del df['3']
del df['MRB']
del df['FAI']
del df['shipping']
df.fillna("missing")
df.to_excel(write)
write.save()
