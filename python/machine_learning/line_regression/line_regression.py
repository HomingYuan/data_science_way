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

data_x_train = [71, 175, 159, 155, 152, 158, 154, 164, 168, 166, 159, 164]
data_y_train = [57, 64, 41, 38, 35, 44, 41, 51, 57, 49, 47, 46]
regr = linear_model.LinearRegression()
regr.fit(data_x_train, data_y_train)










