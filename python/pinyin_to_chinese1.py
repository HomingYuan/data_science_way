# -*- coding: utf-8 -*-
"""
Created on Mon May 22 11:36:26 2017

@author: user
"""
from collections import defaultdict


def pinyin_to_chinese(x):
    dic = {}
    d = defaultdict(list)
    with open("unicode_pinyin.txt") as f:
        for i in f.readlines():
            dic[i.split()[0]] = i.split()[1]
    for k, v in dic.items():
        k = r"\u" + k
        d[v].append(k)
    m = dict(d)

    t = x.upper()
    y = m[t]
    return y


def main():
    x = str(input('please enter pinyin:'))
    words = pinyin_to_chinese(x)
    # print(words)
    for word in words:
        print(word.encode().decode('unicode_escape'))

    # print('好'.encode('unicode_escape'))
    #  b'\\u597d' 好 而编码里为597D

if __name__ == '__main__':
    main()

'''
con = pinyin_to_chinese(1)
l = [(k, v) for k, v in con.items()]

df = pd.DataFrame(l)
df.to_csv('pinyin_unicode.csv', header=['pinyin', 'unicode'])
'''