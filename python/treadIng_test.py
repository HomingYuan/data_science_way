#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
@author: Homing
@software: PyCharm Community Edition
@file: treadIng_test.py
@time: 2017/6/10 15:35
"""
import threading

lock = threading.Lock()
num = 0

def incre(count):
    global num
    while count > 0:
        # with lock:
        num += 1
        count -= 1

def main():
    threads = []
    for i in range(10):
        thread = threading.Thread(target=incre, args=(100000,))
        thread.start()
        threads.append(thread)

    for thread in threads:
        thread.join()

    print("expected value is", 10 * 100000, "real value is", num)

if __name__ == '__main__':
    main()








