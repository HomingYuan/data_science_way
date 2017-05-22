# -*- coding: utf-8 -*-
"""
Created on Thu May 18 10:14:12 2017

@author: user
"""


def pinyin_to_chinese(x):
    y = ''
    t = ''
    dic = {}
    with open("unicode_pinyin.txt") as f:
        for i in f.readlines():
            dic[i.split()[1]] = i.split()[0].upper().strip()
    for j in x:
        t += j.upper()
    if y == '597d':
        return
    else:
        return y

# dic = pinyin_to_chinese('HAO3')
# t = [(k, v) for k, v in list(dic.items()) ]
# df = pd.DataFrame(t)
# df.to_csv('pinyin_to_chinese.csv',index =None,header = ['pinyin','code'])


def main():
    x = str(input('please enter pinyin:'))
    word = pinyin_to_chinese(x)
    word = r"\u" + word
    print(word.encode().decode('unicode_escape'))
    # print('好'.encode('unicode_escape'))
    # b'\\u597d' 好 而编码里为597D
if __name__ == '__main__':
    main()