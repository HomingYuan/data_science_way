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


start = datetime.datetime.now()  # 用来计算代码运行时间


# 统计文件中单词次数，并按从大到下排序
def count_word(filename):
    d = {}
    with open(filename, 'r', encoding='gb18030') as f:  # 中文编码问题http://blog.csdn.net/shijing_0214/article/details/51971734
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

# 把结果写入到文件中
def write_to_csv(file):
    df = pd.DataFrame(file)
    df.to_csv('dream.csv', header=['词语','数量'], sep=',')  # 添加标题
    
    
def main():
    path = input('please enter filename:') # liunx下 path = sys.argv.append('')
    # sys.argv命令行参数 ，sys.argv[0]表示代码本身文件路径，所以参数从1开始
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








