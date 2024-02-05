from typing import NewType

"""Types for typehints"""
from dataclasses import dataclass

DeviceId = NewType("DeviceId", str)


@dataclass
class Song:
    name: str
    uri: str
    id: str
