#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
@author: Homing
@software: PyCharm Community Edition
@file: jieba_test.py
@time: 2017/5/14 23:20
"""

import jieba
k = ['我来自北京清华大学', '我准备学习计算机']
for m in k:
    t = (jieba.cut(m))
    for i in t:
        print(i)








