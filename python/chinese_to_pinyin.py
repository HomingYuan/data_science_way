# -*- coding: utf-8 -*-
"""
Created on Thu May 18 10:09:28 2017

@author: user
"""

def chinese_to_pinyin(x):
    y = ''
    dic = {}
    with open("unicode_pinyin.txt") as f:
        for i in f.readlines():
            dic[i.split()[0]] = i.split()[1]
    for i in x:
        i = str(i.encode('unicode_escape'))[-5:-1].upper()
        try:
            y += dic[i] + ' '
        except:
            y += 'XXXX '
    return y

def main():
    x = input('please enter Chinese word:')
    word = chinese_to_pinyin(x)
    print(word)

if __name__ == '__main__':
    main()