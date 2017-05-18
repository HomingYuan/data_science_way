#!/usr/bin/env python
#-*- coding: utf-8 -*-
"""
Minimal Example
===============
Generating a square wordcloud from the US constitution using default arguments.
"""

from os import path
from wordcloud import WordCloud
import os
d = path.dirname(__file__)

font = "DroidSansFallbackFull.ttf"

# Read the whole text.
#text = open(path.join(d, 'constitution.txt')).read()
text = open("santi3.txt", 'r',encoding='gb18030').read()

# Generate a word cloud image
wordcloud = WordCloud(font_path=font).generate(text)

# Display the generated image:
# the matplotlib way:
import matplotlib.pyplot as plt
plt.imshow(wordcloud)
plt.axis("off")
plt.savefig('santi3_1.png')
# lower max_font_size
wordcloud = WordCloud(font_path=font,max_font_size=40).generate(text)
plt.figure()
plt.imshow(wordcloud)
plt.axis("off")
plt.savefig('santi3_2.png')
plt.show()


# The pil way (if you don't have matplotlib)
#image = wordcloud.to_image()
#image.show()
