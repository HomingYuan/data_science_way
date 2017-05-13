#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
@author: Homing
@software: PyCharm Community Edition
@file: numpy_project.py
@time: 2017/5/9 20:08
"""

import os
import pygame
import time
import numpy as np


def traverse_file(path):
    l = []
    for root, dirs, files in os.walk(path):
        files = filter(lambda file: file[-4:] == '.mp3', files)
        for fn in files:
            file1 = root + "\\" + fn  # 注意是两个斜杠
            l.append(file1)
    return l


def play_music_random(path):
    pygame.mixer.init()
    pygame.mixer.music.load(path)
    pygame.mixer.music.play(loops=0, start=0.0)
    time.sleep(120)


def main():
    path = r'D:\CloudMusic'
    playlist1 = traverse_file(path)
    for i in np.arange(len(playlist1)):
        t = playlist1[np.random.randint(0, len(playlist1))]
        print("...播放音乐...\n %s" % t)
        play_music_random(t)

if __name__ == '__main__':
    main()















