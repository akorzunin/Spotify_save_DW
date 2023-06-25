import uvicorn
import os
log_config = uvicorn.config.LOGGING_CONFIG
log_config["formatters"]["access"]["fmt"] = "%(asctime)s - %(levelname)s - %(message)s"
DEBUG = bool(eval(os.getenv('DEBUG', 'False')))
UVICORN_SSL = bool(eval(os.getenv('UVICORN_SSL', 'False')))
uvicorn_conf = dict(
    app='main:app',
    host=os.getenv('HOST'),
    port=int(os.getenv('PORT')),
    log_level='info',
    log_config=log_config,
    reload=DEBUG,
    ssl_keyfile='./certbot/privkey.pem' if UVICORN_SSL else None,
    ssl_certfile='./certbot/fullchain.pem' if UVICORN_SSL else None,
)