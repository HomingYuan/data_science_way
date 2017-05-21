#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
@author: Homing
@software: PyCharm Community Edition
@file: find_all_file.py
@time: 2017/5/21 22:09
"""
import os
import re


def get_all_file(path='.'):
    file_list = []
    file_list1 = []
    for root, dirs, files in os.walk(path):
        for file in files:
            file_list.append(os.path.join(file))
            file_list1.append(os.path.join(os.path.abspath(root), file))
    return file_list, file_list1  # 返回多个值，按顺序索引进行取值

t = get_all_file()


def find_file(path='.'):
    find_str = input('please enter the filename:')
    l = []
    file_list = []
    # find_file_list = [os.path.abspath(x) for x in t[0] if re.match(find_str, x)]
    for i in range(len(t[0])):
        if re.match(find_str, t[0][i]):
            l.append(t[1][i])
    for file_str in l:
        print(file_str)
        file_list.append(file_str)
    return file_list


def main():
    find_file()

if __name__ == '__main__':
    main()











