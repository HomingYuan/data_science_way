#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
@author: Homing
@software: PyCharm Community Edition
@file: pin_test.py
@time: 2017/5/18 19:44
"""
l=[]
with open("unicode_pinyin.txt") as f:
    for line in f.readlines():
        l.append((line.split()[0],line.split()[1:]))
print(l)








