#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
@author: Homing
@software: PyCharm Community Edition
@file: numpy_study.py
@time: 2017/5/9 19:11
"""

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import numpy.linalg as nl
# 1 numpy主要功能
'''
1. 是python其他高级数据分析库基础
2. 具有矢量运算和复杂广播能力
3.用于对数组进行快速运算的标准数学函数
4.读写磁盘数据
4.线性代数，随机数生成以及傅里叶变换

'''
# a.创建数组
arr1 = np.array([1, 3, 4]) # 一维数组，通过np.array()进行创建
arr2 = np.array([[1, 2, 3],[4, 5.9, "s"],[2,3,3]]) # 多维数组
# c = np.array([1, 3, 4],[5, 6, 7]) 将会报错
arr = np.arange(15)  # 快速创建一维数组
arr11 = np.arange(15).reshape(3,5) # 快速创建多维数组

# b. 数组类型及维度
print(arr2.dtype)  # 返回数组类型
print(arr2.shape)  # 返回数组行列数（m,n）
print(arr2.ndim)   # 返回数组维度，即几维数组

# c. 特殊数组
arr3 = np.zeros(10)
arr4 = np.ones(10)
arr5 = np.ones_like(arr2)  # 返回一个和构建数组形状一样但值全为1 的数组
arr6 = np.empty(10)
arr7 = np.empty_like(arr2)  # 返回一个和构建数组形状一样但值全为空 的数组
arr8 = np.eye(3,5)  # 返回一个第n行第n列为1，其余为9 的数组，即 a[ij]=1 （i=j） a[ij] = 0 [i !=j]

print('arr3',arr3)
print('arr4',arr4)
print('arr5',arr5)
print('arr6',arr6)
print('arr7',arr7)
print('arr8',arr8)

# d.数组的运算
arr9 = np.array([[1.0, 2.0, 3.0], [4.0, 5.0, 6.0]])
arr10 = np.array([[1, 3, 5], [2, 4, 5], [9, 10, 13]])
arr_times = arr9 * arr9
arr_plus = arr9 + arr9
arr_minus = arr9 - arr9
arr_reciprocal = 1/arr9
# arr_add = arr9 + arr10 # 无法广播，将报错
# arr_add1 = arr10 + arr9 # 不可以广播，不同大小数组运算称为广播，只能大数组向小数组广播
arr_squre = arr**0.5
print('arr_times',arr_times)
print('arr_plus',arr_plus)
print('arr_reciprocal',arr_reciprocal)
# print('arr_add1',arr_add1)
print('arr_squre', arr_squre)
print('arr_minus', arr_minus)

# e.基本索引和切片

arr12 = np.arange(10)
print(arr12[5:8])  # 包括开始，不包括结尾
arr12[5:8] = 12
print(arr12)  # 对元素赋值，将改变原数组的值
print(arr12[5:8])  # 验证结果

arr_slice = arr12[5:8]
arr_slice[1] = 12345
print(arr12)
arr_slice[:] = 5
print(arr12)
# 通过对切片操作直接更改原始数组

# f.布尔值索引
names = np.array(['Bob', 'Joe', 'Will', 'Bob', 'Will', 'Joe', 'Joe'])
data = np.arange(28).reshape(7, 4)
print('data', data)
print('slice_data', data[names == 'Bob'])
data[names == 'Bob'] = 1
data[names != 'Bob'] = 0
print('data after slice', data)  # 和上面一样对切片进行赋值将会改变原数组的值

# g.花式索引
arr13 = np.arange(32).reshape(8, 4)
slice1 = [1, 5, 7, 2]
slice2 = [0, 3, 1, 2]
print('slice1',arr13[slice1])
print('slice2',arr13[slice2])
print('slice1_slice2',arr13[slice1][slice2])
print('slice1,slice2', arr13[slice1, slice2])
print('slice1:slice2',arr13[slice1][:,[slice2]])
print('fance slice', arr13[np.ix_(slice1,slice2)])
print('np.ix',np.ix_(slice1,slice2))
arr13[np.ix_(slice1,slice2)] = 1
print('After fance slice', arr13)

# h.转置与轴对称

arr14 = np.arange(15).reshape(3, 5)
print('arr14',arr14)
print('arr14.T', arr14.T)  # 转置
print('arr14 dot arr14.T', np.dot(arr14, arr14.T))  # 点积
arr15 = np.arange(16).reshape(2, 2, 4)
print('arr15',arr15)
print('arr15.T',arr15.T)
print('arr15 transpose',arr15.transpose((1, 0, 2)))


# 2 numpy 通用函数
arr16 = np.array([1, 5, 2, 2, 1, 10, 15])
print('sqrt', np.sqrt(arr16))
print('exp', np.exp(arr16))
print('max', np.max(arr16))
print('mean', np.mean(arr16))
print('sum',np.sum(arr16))
print('sort', np.sort(arr16))
print('np where',np.where(arr16>2, 0, arr16))
print('unique', np.unique(names))  # 唯一化数组

# 读取文件
arr17 = np.loadtxt('numpy_test.txt', dtype=np.int, delimiter=',')

print('arr17', arr17)

np.savetxt('numpy_save.txt',X= arr17,delimiter=',')


# 3 线性代数模块
arr18 = np.array([[1,2,3],[4,5,6]])
arr19 = np.array([[6,23],[-1,7],[8,9]])
arr20 = np.dot(arr18, arr19)
arr21 = np.array([1,1])
print('arr18 dot arr19',np.dot(arr18,arr19))  # 点积
print('trace',np.trace(np.dot(arr18,arr19)))  # 对角线和
print('eig',nl.eig(np.dot(arr18, arr19)))  # 本征方程
print('inv',nl.inv(arr20))  # 矩阵的逆
print('qr',nl.qr(arr20))  # 矩阵QR分解
print('svd', nl.svd(arr20))  # 矩阵的SVD分解
print('solve',nl.solve(arr20,arr21))  # 矩阵的解
print('lstsq',nl.lstsq(arr20,arr21))  # 矩阵最小二乘解






