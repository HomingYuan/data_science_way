#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
@author: Homing
@software: PyCharm Community Edition
@file: count_word.py
@time: 2017/5/14 21:49
"""
import sys
import os


# 统计文件中单词次数
def count_word(filename):
    d = {}
    with open(filename) as f:
        for line in f:
            for word in line.strip().split():
                d.setdefault(word, 0)
                d[word] += 1
    t = [(k, v) for k, v in list(d.items()) if k.isalpha()]
    t = sorted(t, key=lambda x: x[1], reverse=True)  # 排序
    for key, val in t:
        print(key, ':', val)


def main():
    path = input('please enter filename:')
    sys.argv.append(path)
    filename = sys.argv[1]
    if not os.path.isfile(filename):
        raise SystemExit('{0} not found'.format(filename))
    else:
        count_word(filename)


if __name__ == '__main__':
    main()










