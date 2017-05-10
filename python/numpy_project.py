#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
@author: Homing
@software: PyCharm Community Edition
@file: numpy_project.py
@time: 2017/5/9 20:08
"""
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import os

import pygame
import time

# 遍历文件夹文件
def fun(path):
    t = []
    for root, dirs, files in os.walk(path):
        for fn in files:
            t.append(root+fn)
    return t

# print(fun(r'D:\Big_data\大数据学习\data_science_way'))

# 播放MP3

# file = r'D:\CloudMusic\J Moss - No More.mp3'
# pygame.mixer.init()
# print("播放音乐1")
# track = pygame.mixer.music.load(file)
#
# pygame.mixer.music.play()
# time.sleep(300)
# pygame.mixer.music.stop()

#  两者结合起来


def traverse_file(path):
    l = []
    for root, dirs, files in os.walk(path):
        for fn in files:
            file = root + "\\" + (fn) # 注意是两个斜杠
            l.append(file)
            print (l)
    return l


def play_music_random(path):
    pygame.mixer.init()
    track = pygame.mixer.music.load(path)
    pygame.mixer.music.play()
    time.sleep(120)
    pygame.mixer.music.stop()


def main():
    path = r'D:\CloudMusic\mp3'
    playlist1 = traverse_file(path)
    for i in np.arange(len(playlist1)):
        t = playlist1[np.random.randint(0, len(playlist1))]
        print("播放音乐:%s" % t)
        play_music_random(t)

if __name__ == '__main__':
    main()















