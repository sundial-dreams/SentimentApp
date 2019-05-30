from aiohttp import web
from service.service import routes

app = web.Application()


def run_app(host: str = "localhost", port: int = 3000) -> None:
    app.add_routes(routes)
    web.run_app(app = app, host = host, port = port)


