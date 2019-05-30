import os
import sys

from lib.extract import config

dirname = sys.path[0].replace("\\", "/")
cfg = config()
support_dir = dirname + "/resource/support"
temp_dir = dirname + "/resource/temp/"


def convert_audio(mp3_path: str) -> tuple:
    mp3_path = os.path.abspath(mp3_path).replace("\\", "/")
    ffmpeg_dir = support_dir + cfg["ffmpegBin"]
    wav_path = temp_dir + os.path.basename(mp3_path) + ".wav"

    cmd = "cd \"{}\" && ffmpeg -i \"{}\" -acodec pcm_s16le -ar 44100 -ac 1 \"{}\"" \
        .format(ffmpeg_dir, mp3_path, wav_path)
    print(cmd)
    os.system(cmd)
    return mp3_path, wav_path
