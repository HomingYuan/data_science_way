# -*- coding: utf-8 -*-
"""
Created on Thu Jul  6 16:43:16 2017

@author: user
"""

import pandas as pd
import os
import quandl
import time

auth_tok = "yourauthhere"

data = quandl.get("WIKI/KO", trim_start = "2000-12-12", trim_end = "2014-12-30", authtoken=auth_tok)

print(data)