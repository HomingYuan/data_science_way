#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
@author: Homing
@software: PyCharm Community Edition
@file: modules_sys.py
@time: 2017/5/17 21:27
"""

import sys
import pandas as pd


mod = [item for item in sys.modules]
df = pd.DataFrame(mod)
df.to_csv('modules.csv',header='modules')








