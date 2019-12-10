from types import (FunctionType)

import numpy as np
import scipy.io as sio
from pandas.core.frame import DataFrame as PDF
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler, MinMaxScaler

from lib.extract import config

cfg = config()


# 对特征文件进行预处理
def preprocess_data(path: str) -> tuple:
    total_data = sio.loadmat(path)
    na_data = total_data['feature']
    # 定义两个空数组，用于存放需要删除的列或行
    del_cols = []
    del_rows = []
    # 判断是否存在某一行的数据全为0,将其加入数组deletcols中
    for i in range(len(na_data[1])):
        if any(na_data[:, i]) == 0:
            del_cols.append(i)
    # 判断是否存在某一列的数据全为0，将其加入数组deletrows中
    for i in range(len(na_data)):
        if any(na_data[i, :]) == 0:
            del_rows.append(i)
    na_data = np.delete(na_data, del_cols, 1)
    na_data = np.delete(na_data, del_rows, 0)
    pd_data = PDF(na_data)
    pd_data = pd_data.rename(columns = {0: 'Class'})
    for i in pd_data.columns:
        if i != 'Class':
            pd_data = pd_data.rename(columns = {i: 'feature' + str(i)})
    pd_data.head()
    label = na_data[:, 0:1]
    return pd_data, label


def normalized(feature: list) -> list:
    _max = max(*feature)
    _min = min(*feature)
    return list(
        map(
            lambda v: ((v - _min) / (_max - _min)),
            feature
        )
    )


# 预测
def train_model(feature_path: str = cfg["featureFile"]) -> FunctionType:
    pd_data, label = preprocess_data(feature_path)
    rf = RandomForestClassifier(random_state = 0)
    rf.fit(pd_data, label.ravel())
    return lambda feature: rf.predict([feature])
