#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
@author: Homing
@software: PyCharm Community Edition
@file: jieba_1.py
@time: 2017/5/14 23:41
"""
import sys
import os
import jieba
import pandas as pd
import datetime


start = datetime.datetime.now()


# 统计文件中单词次数
def count_word(filename):
    d = {}
    with open(filename, 'r', encoding='gb18030') as f:  # 编码问题http://blog.csdn.net/shijing_0214/article/details/51971734
        for fword in f:
            jb_word = jieba.cut(fword.strip(), cut_all=True) # 全模式
            for word in jb_word:
                d.setdefault(word, 0)
                d[word] += 1
    t = [(k, v) for k, v in list(d.items()) if v >= 1 and k.isalpha()]  # 去除标点符号
    l = sorted(t, key=lambda x: x[1], reverse=True)  # 排序
    '''
    for key, val in t:
        if val > 1:
            print(key, ':', val)
    '''
    return l


def write_to_csv(file):
    df = pd.DataFrame(file)
    df.to_csv('dream.csv', index=False, sep=',')
    
    
def main():
    path = input('please enter filename:')
    sys.argv.append(path)
    filename = sys.argv[1]
    if not os.path.isfile(filename):
        raise SystemExit('{0} not found'.format(filename))
    else:
        count_word(filename)
    write_to_csv(count_word(filename))


if __name__ == '__main__':
    main()

end = datetime.datetime.now()
print('Running time', end - start)  # 计算代码运行时间








