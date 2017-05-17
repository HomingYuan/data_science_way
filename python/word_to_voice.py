#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
@author: Homing
@software: PyCharm Community Edition
@file: word_to_voice.py
@time: 2017/5/17 19:29
"""
import pygame

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

def make_vioce(x):
    pygame.mixer.init()
    vio = chinese_to_pinyin(x).split()
    for i in vio:
        if i == 'XXXX':
            continue
        pygame.mixer.music.load("voice/" + i + ".mp3")
        pygame.mixer.music.play()
        while pygame.mixer.music.get_busy() == True:
            pass
    return None

while True:
    p = input("请输入文字：")
    make_vioce(p)









