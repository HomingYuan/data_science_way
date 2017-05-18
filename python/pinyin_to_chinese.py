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
    try:
        y += dic[t] 
    except:
        y += 'XXXX '
    return y


    return dic

#dic = pinyin_to_chinese('HAO3')
#t = [(k, v) for k, v in list(dic.items()) ] 
#df = pd.DataFrame(t)
#df.to_csv('pinyin_to_chinese.csv',index =None,header = ['pinyin','code'])
def main():
    x = str(input('please enter pinyin:'))
    word = pinyin_to_chinese(x)
    print(word.encode('utf-8').decode('utf-8'))

if __name__ == '__main__':
    main()