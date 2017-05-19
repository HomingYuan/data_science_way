#!/usr/bin/python
#-*- coding: utf-8 -*-
"""
Using custom colors
====================
Using the recolor method and custom coloring functions.
"""

import numpy as np
from PIL import Image
from os import path
import matplotlib.pyplot as plt
import random
import os
from matplotlib import font_manager

from wordcloud import WordCloud, STOPWORDS


font = "DroidSansFallbackFull.ttf"
zhfont1 = font_manager.FontProperties(fname='DroidSansFallbackFull.ttf')  # 中文配置字体

def grey_color_func(word, font_size, position, orientation, random_state=None, **kwargs):
    return "hsl(0, 0%%, %d%%)" % random.randint(60, 100)

mask = np.array(Image.open(r'D:\Big_data\大数据学习\data_science_way\python\04.png'))


text = open(r"D:\Big_data\大数据学习\data_science_way\python\santi.txt").read()

# preprocessing the text a little bit
text = text.replace("程心说", "程心")
text = text.replace("程心和", "程心")
text = text.replace("程心问", "程心")
text = text.replace("程心*", "程心")

# adding movie script specific stopwords
stopwords = set(STOPWORDS)
stopwords.add("int")
stopwords.add("ext")

wc = WordCloud(font_path=font,max_words=2000, mask=mask, stopwords=stopwords, margin=10,
               random_state=1).generate(text)
# store default colored image
default_colors = wc.to_array()
plt.title("Custom colors")
plt.imshow(wc.recolor(color_func=grey_color_func, random_state=3))
wc.to_file("b_new_hope.png")
plt.axis("off")
plt.figure()
plt.title("三体-词频统计", fontproperties=zhfont1)  # 需配置字体，不然会中文显示乱码
plt.imshow(default_colors)
plt.axis("off")
plt.savefig('b_new_hope1.png')
plt.show()
