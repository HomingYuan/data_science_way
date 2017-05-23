# -*- coding: utf-8 -*-
"""
Created on Tue May 23 09:11:08 2017

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
def show_word(t=0):
    x = str(input('please enter pinyin:'))
    display_word = []
    words = pinyin_to_chinese(x)
    for m in range(len(words)):
        display_word.append(words[m].encode().decode('unicode_escape'))
    print(display_word)
    t = int(input('please choose:'))-1  # chinese custom
    if t<len(words):
        print(display_word[t])
    else:
        print('out of range')
        print(display_word[0])

def main():
    show_word()


    # print('好'.encode('unicode_escape'))
    #  b'\\u597d' 好 而编码里为597D

if __name__ == '__main__':
    main()