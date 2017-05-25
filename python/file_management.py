# -*- coding: utf-8 -*-
"""
Created on Thu May 25 10:15:41 2017

@author: user
"""
import os
import fnmatch
import glob


all_file_and_doc = [name for name in os.listdir('.')] # inclidung dir and file
all_doc = [name for name in os.listdir('.') 
            if os.path.isfile(name)]  # just doc

all_docname_and_size = {name:os.path.getsize for name in os.listdir('.') 
            if os.path.isfile(name) }  # size information

all_docname_and_atime = {name:os.path.getatime for name in os.listdir('.') 
            if os.path.isfile(name) }  # visit time

all_docname_and_mtime = {name:os.path.getmtime for name in os.listdir('.') 
            if os.path.isfile(name) }  # modification time

all_docname_and_ctime = {name:os.path.getctime for name in os.listdir('.') 
            if os.path.isfile(name) }  # crate time

filter_document = [name for name in os.listdir('.') 
            if fnmatch.fnmatch(name,'*.py')]

filter_document1 = glob.glob('*.py')