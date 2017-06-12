#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
@author: Homing
@software: PyCharm Community Edition
@file: line_regression.py
@time: 2017/6/11 22:52
"""
from sklearn import linear_model
import matplotlib.pyplot as plt
import numpy as np

data_x_train = np.array([ 175, 159, 155, 152, 158, 154, 164, 168, 166, 159, 164]).reshape(11,1) # must be array and ndim    
data_y_train = np.array([ 64, 41, 38, 35, 44, 41, 51, 57, 49, 47, 46]).reshape(11,1)
regr = linear_model.LinearRegression()
regr.fit(data_x_train, data_y_train)
print(regr.coef_)
print(regr._residues)
print(regr.predict(161))
print(regr.score(data_x_train,data_y_train))
plt.scatter(data_x_train, data_y_train)
plt.plot(data_x_train, regr.predict(data_x_train), color='g',
         linewidth=3)







