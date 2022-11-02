import uvicorn
import os
log_config = uvicorn.config.LOGGING_CONFIG
log_config["formatters"]["access"]["fmt"] = "%(asctime)s - %(levelname)s - %(message)s"
DEBUG = bool(eval(os.getenv('DEBUG', 'False')))
uvicorn_conf = dict(
    app='main:app',
    host=os.getenv('HOST'),
    port=int(os.getenv('PORT')),
    log_level='info',
    log_config=log_config,
    reload=DEBUG,
    ssl_keyfile=None if DEBUG else './certbot/privkey.pem',
    ssl_certfile=None if DEBUG else './certbot/fullchain.pem',
)