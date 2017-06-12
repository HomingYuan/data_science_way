#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
@author: Homing
@software: PyCharm Community Edition
@file: line_regression.py
@time: 2017/6/11 22:52
"""
# reference blog:http://blog.csdn.net/u013719780/article/details/51742982,http://scikit-learn.org/stable/index.html
# reference book scikit_learn_docs.pdf
# y = a + bx  a,b的求解
# a = cov(x, y)/var(x),b = y_ -ax_
from sklearn import linear_model
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import os

data_x_train = np.array([175, 159, 155, 152, 158, 154, 164, 168, 166, 159, 164]).reshape(11, 1)  # must be array and ndim
data_y_train = np.array([64, 41, 38, 35, 44, 41, 51, 57, 49, 47, 46]).reshape(11, 1)
regr = linear_model.LinearRegression()
regr.fit(data_x_train, data_y_train)
'''
print(regr.coef_)
print(regr._residues)
print(regr.predict(161))
print(regr.score(data_x_train, data_y_train))
'''
plt.scatter(data_x_train, data_y_train)
plt.plot(data_x_train, regr.predict(data_x_train), color='g', linewidth=3)

'''
data_x_test = [[175], [159], [155], [152], [158], [154], [164], [168], [166], [159], [164]]  # It can also fit
data_y_test = [[64], [41], [38], [35], [44], [41], [51], [57], [49], [47], [46]]

regr = linear_model.LinearRegression()
regr.fit(data_x_test, data_y_test)
plt.scatter(data_x_test, data_y_test)
plt.plot(data_x_test, regr.predict(data_x_test), color='g')
print(regr.score(data_x_test, data_y_test))
plt.show()

for i, x in enumerate(data_x_train):
    plt.plot([x, x], [data_y_train[i], regr.predict(data_x_train)[i]])
plt.savefig('line_regression.pdf')
plt.show() 
'''
x = [175, 159, 155, 152, 158, 154, 164, 168, 166, 159, 164]
y = [64, 41, 38, 35, 44, 41, 51, 57, 49, 47, 46]
cov = np.cov(x, y)[0][1]
var = np.var(x)
a = cov/var
b = np.mean(y) - np.mean(x)*a
print(a, b)
# y = 1.2939675174x -162.045306897
print(regr.intercept_)
# 多元线性回归方程
# 参考网址 http://blog.csdn.net/lulei1217/article/details/49386295
# y = Px p =(x/t x)-1 xt y

data = pd.read_csv('Advertising.csv')
print(data.head())
# print(os.path.abspath(''))