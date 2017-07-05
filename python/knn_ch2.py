#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
@author: Homing
@software: PyCharm Community Edition
@file: knn_ch2.py
@time: 2017/7/3 19:38
"""
import numpy as np
from numpy import argsort
import operator
# KNN 分类器
"""
1. 求距离，DataSet = [[x1,y1],[x2,y2]] label =['A', 'B']
[x0,y0]
m1 = ((x1-x0)**2 + (y1-y0)**2)**0.5
m2 = ((x2-x0)**2 + (y2-y0)**2)**0.5
distance = min(m1,m2)
2.先根据距离从小到大分成k类，然后返回出现的概率
3.概率最高作为当前点的预测

"""
def knn_classifier(inV, dataSet, label,k):
    datasize = dataSet.shape[0]
    distance_array = np.tile(inV,(datasize, 1)) - dataSet  # 返回源数据与目标之差的array
    sq_distance = distance_array ** 2 # 返回目标之差的平方
    sq_distance_sum = sq_distance.sum(axis=1)  # 按列求和
    distance = sq_distance_sum ** 0.5
    sorted_distance = np.argsort()
    lable_dict = {}
    for i in range(k):
        votalLabel = label[sorted_distance[i]]
        lable_dict[votalLabel]   = lable_dict.get(votalLabel,0) + 1
        sortedclasscount = sorted(lable_dict.items(), key=operator.itemgetter(1),reverse=True)
        return sortedclasscount[0][0]


    











