#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
@author: Homing
@software: PyCharm Community Edition
@file: singoleton-1.py
@time: 2017/5/26 20:33
"""


class Singleton(object):

    class _A(object):
        def __init__(self):
            pass

        def display(self):
            return id(self)

    _instance = None

    def __init__(self):
        if Singleton._instance is None:
            Singleton._instance = Singleton._A()

    def __getattr__(self, attr):
        return getattr(self._instance, attr)

if __name__ == '__main__':
    s1 = Singleton()
    s2 = Singleton()
    print(id(s1), s1.display())
    print(id(s2), s2.display())















