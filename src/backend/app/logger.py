import logging


format = "%(asctime)s [%(levelname)s]: %(message)s"
logger = logging.basicConfig(
    format=format,
    encoding="utf-8",
    level=logging.INFO,
)
logger = logging.getLogger(__name__)
