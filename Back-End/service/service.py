import os
import sys

from aiohttp.web import (Response, Request, RouteTableDef, json_response)

from lib.conversion import convert_audio
from lib.extract import feature, config
from lib.model import train_model

routes = RouteTableDef()
dirname = sys.path[0].replace("\\", "/")
temp_dir = dirname + "/resource/temp/"
cfg = config()
predict_sentiment = train_model(cfg["featureFile"])


@routes.route("*", "/sentimentAnalyzer")
async def upload_file(req: Request) -> Response:
    reader = await req.multipart()
    field = await reader.next()
    filename = field.filename
    temp_file = temp_dir + filename
    with open(temp_file, "wb") as file:
        while True:
            chunk = await field.read_chunk()
            if not chunk:
                break
            file.write(chunk)
    mp3_path, wav_path = convert_audio(temp_file)
    f = feature(wav_path)
    result = predict_sentiment(f)
    os.remove(mp3_path)
    os.remove(wav_path)
    return json_response({
        "err": False,
        "data": int(result[0])
    })
