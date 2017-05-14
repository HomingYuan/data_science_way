#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
@author: Homing
@software: PyCharm Community Edition
@file: jieba_test.py
@time: 2017/5/14 23:20
"""

import jieba

t = (list(jieba.cut("我来自北京清华大学")))
for i in t:
    print(i)








