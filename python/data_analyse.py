#!/usr/bin/env python
# -*- coding: utf-8 -*-
import pandas as pd
import numpy as np

df = pd.read_csv('stock_data.csv')
# print(df.describe())
# print(df['date'])
grouped = df.groupby('date')
# print(grouped.first())
# print(grouped.last())
# print(grouped.sum())
grouped1 = df.groupby(['date','price_change'])
# print(grouped1.first())
arrays = [['bar', 'bar', 'baz', 'baz', 'foo', 'foo', 'qux', 'qux'],
 ['one', 'two', 'one', 'two', 'one', 'two', 'one', 'two']]
index  = index = pd.MultiIndex.from_arrays(arrays, names=['first', 'second'])
df = pd.DataFrame({'A': [1, 1, 1, 1, 2, 2, 3, 3],
 'B': np.arange(8)},
 index=index)
grouped = df.groupby('A')
# print(df)
#print(grouped.mean())
df = pd.DataFrame({'A' : ['foo', 'bar', 'foo', 'bar',
 'foo', 'bar', 'foo', 'foo'],
 'B' : ['one', 'one', 'two', 'three',
 'two', 'two', 'one', 'three'],
 'C' : np.random.randn(8),
 'D' : np.random.randn(8)})
# print(df)
grouped_A = df.groupby('A')
# print(grouped_A.firstdf3.groupby(['X']).get_group('A')
# print(grouped_A.last())
df2 = pd.DataFrame({'X' : ['B', 'B', 'A', 'A'], 'Y' : [1, 2, 3, 4]})
# print(df2.groupby(['X']).sum())
df3 = pd.DataFrame({'X' : ['A', 'B', 'A', 'B'], 'Y' : [1, 4, 3, 2]})
grouped_X = df3.groupby('X')
"""
print(df3)
print(df3.groupby(['X']).sum())
print(df3.groupby(['X']).get_group('A'))
print(df3.groupby(['X']).get_group('B'))
"""
# print(df)
# print(df.groupby('A').groups)
grouped = df.groupby(['A', 'B'])
# print(grouped.groups)
df1 = pd.DataFrame({'A': ['A0', 'A1', 'A2', 'A3'],
 'B': ['B0', 'B1', 'B2', 'B3'],
 'C': ['C0', 'C1', 'C2', 'C3'],
 'D': ['D0', 'D1', 'D2', 'D3']},
 index=[0, 1, 2, 3])

df2 = pd.DataFrame({'A': ['A4', 'A5', 'A6', 'A7'],
 'B': ['B4', 'B5', 'B6', 'B7'],
 'C': ['C4', 'C5', 'C6', 'C7'],
 'D': ['D4', 'D5', 'D6', 'D7']},
 index=[4, 5, 6, 7])

df3 = pd.DataFrame({'A': ['A8', 'A9', 'A10', 'A11'],
 'B': ['B8', 'B9', 'B10', 'B11'],
 'C': ['C8', 'C9', 'C10', 'C11'],
 'D': ['D8', 'D9', 'D10', 'D11']},
 index=[8, 9, 10, 11])

frames = [df1, df2, df3]

result = pd.concat(frames)
# print(result)
result1 = pd.concat(frames, keys=['x', 'y', 'z'])
# print(result1.loc['y'])

#print(df3)
df3.reindex(['A','B','C','D'])
# print(df3)
print(df3.columns['A'])