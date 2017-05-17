#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
@author: Homing
@software: PyCharm Community Edition
@file: idiom_p.py.py
@time: 2017/5/17 18:57
"""
import random

def chinese_to_pinyin(x):
    """参数为字符串，返回为该字符串对应的汉语拼音"""
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
            y += 'XXXX '  # 非法字符我们用XXXX代替
    return y

def idiom_exists(x):
    """判断是否为成语的函数，参数为字符串，判断该字符串是否在成语库中"""
    with open('idiom.txt','r') as f:
        for i in set(f.readlines()):
            if x == i.strip():
                return True
        return False

def idiom_test(idiom1, idiom2, mode, opt):
    """判断两个成语是否达成接龙条件"""
    #为了可读性，我把它分开写，比较清晰
    if mode == 0 and idiom2[0] != idiom1[-1]:
        return False
    if mode == 1 and chinese_to_pinyin(idiom2[0]) != chinese_to_pinyin(idiom1[-1]):
        return False
    if mode ==chinese_to_pinyin(idiom2[0])[:-2] != chinese_to_pinyin(idiom1[-1])[:-2]:
        return False
    if opt == 0 and len(idiom2) != 4:
        return False
    return True

def idiom_select(x, mode, opt):
    """核心代码部分，参数x为成语，返回该成语的接龙匹配成语"""
    if x == None:
        with open('idiom.txt','r') as f:
            return random.choice(f.readlines())[:-1]
    else:
        with open('idiom.txt','r') as f:
            #以下六行代码，通过索引排除无效循环，显著提升运行效率
            pinyin = chinese_to_pinyin(x[-1])
            base = f.readlines()
            if pinyin[0] != 'Z':
                base = base[base.index(pinyin[0]+'\n'):base.index(chr(ord(pinyin[0])+1)+'\n')]
            else:
                base = base[base.index(pinyin[0]+'\n'):]
            random.shuffle(base)
            for i in base:
                if i[:-1] == x or (opt == 0 and len(i) != 5):
                    continue
                if mode == 0 and i[0] == x[-1]:
                    return i[:-1]
                if mode == 1 and chinese_to_pinyin(i[0]) == pinyin:
                    return i[:-1]
                if mode == 2 and chinese_to_pinyin(i[0])[:-2] == pinyin[:-2]:
                    return i[:-1]
        return None

def idiom_start(start = 0, mode = 0, opt = 0):
    """start参数表示先后手，0表示电脑先手，1表示玩家先手；返回值代表游戏结果，为0表示玩家失败，为1代表玩家胜利"""
    memory = set()  #记忆集合，用于判断成语是否被重复使用
    if start == 0:
        while True:
            t = idiom_select(None, mode, opt)
            if idiom_select(t, mode, opt) != None:
                break
        print(t)
    else:
        p = input("请输入成语:")
        if p.strip() == '':
            print("游戏结束！你输了")
            return 0
        if idiom_exists(p) == False:
            print("游戏结束！该成语不存在")
            return 0
        memory.add(p)
        cycle_flag = 0  #控制while True循环次数
        while True:
            t = idiom_select(p, mode, opt)
            cycle_flag += 1
            if t not in memory:
                break
            if cycle_flag == 10:
                t = None
                break
        if t == None:
            print("恭喜你，你赢了！")
            return 1
        else:
            print(t)
            memory.add(t)
    while True:
        p = input("请输入成语:")
        if p.strip() == '':
            print("游戏结束！你输了")
        if idiom_exists(p) == False:
            print("游戏结束！该成语不存在")
            return 0
        if p in memory:
            print("游戏结束！该成语已被使用过")
            return 0
        if idiom_test(t, p, mode, opt) == False:
            print("游戏结束！你未遵守游戏规则")
            return 0
        memory.add(p)
        cycle_flag = 0
        while True:
            t = idiom_select(p, mode, opt)
            cycle_flag += 1
            if t not in memory:
                break
            if cycle_flag == 10:
                t = None
                break
        if t == None:
            print("恭喜你，你赢了！")
            return 1
        else:
            print(t)
            memory.add(t)

# 测试运行，修改参数使其变为规则更加宽松的接龙（mode和opt默认为0则为简易版的成语接龙）
idiom_start(start=1, mode=2, opt=1)









