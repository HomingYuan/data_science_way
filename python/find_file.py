#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
@author: Homing
@software: PyCharm Community Edition
@file: find_file.py
@time: 2017/5/21 20:28
"""
import os
import re


def find_file():
    find_subdir = [x for x in os.listdir('.')if os.path.isdir(x)]
    l = []
    for subfile in find_subdir:
        l += [x for x in os.listdir(subfile)]
    find_dir = [x for x in os.listdir('.')]+l  # 当前目录下面文件和子文件下面文件
    find_str = input('please enter the filename:')
    find_file_list = [os.path.abspath(x) for x in find_dir if re.match(find_str, x)]
    for file_str in find_file_list:
        print(file_str)


def main():
    find_file()

if __name__ == '__main__':
    main()










