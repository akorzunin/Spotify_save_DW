import uvicorn
import os
log_config = uvicorn.config.LOGGING_CONFIG
log_config["formatters"]["access"]["fmt"] = "%(asctime)s - %(levelname)s - %(message)s"
uvicorn_conf = dict(
    app='main:app',
    host=os.getenv('HOST'),
    port=int(os.getenv('PORT')),
    log_level='info',
    log_config=log_config,
    reload=os.getenv('DEBUG', False),
)