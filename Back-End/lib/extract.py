import sys
import os
import json

dirname = sys.path[0].replace("\\", "/")
support_dir = dirname + "/resource/support"
temp_dir = dirname + "/resource/temp/"


def config(config_path: str = dirname + "/config.json") -> dict:
    with open(config_path) as f:
        return json.load(f)


def generate_feature(filepath: str) -> tuple:
    cfg = config()
    filepath = os.path.abspath(filepath).replace("\\", "/")
    open_smile_bin = support_dir + cfg["openSmileBin"]
    open_smile_emotion = support_dir + cfg["openSmileEmotion"]
    txt_path = temp_dir + os.path.basename(filepath) + ".txt"
    cmd = "cd \"{}\" && SMILExtract_Release -C \"{}\" -I \"{}\" -O \"{}\"" \
        .format(open_smile_bin, open_smile_emotion, filepath, txt_path)
    os.system(cmd)
    return filepath, txt_path


def feature_vector(filepath: str) -> list:
    with open(filepath) as file:
        return list(
            map(
                lambda v: float(v),
                file.readlines()[-1].split(",")[1: -1]
            )
        )


def feature(filepath: str) -> list:
    _, filepath = generate_feature(filepath)
    f = feature_vector(filepath)
    os.remove(filepath)
    return f
