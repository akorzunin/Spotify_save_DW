from src.backend.app.utils import encode_b64


def inc(x):
    return x + 1


def test_answer():
    assert inc(3) == 4


def test_encode():
    test_id = "test_encode"
    test_secret = "test_secret"
    assert (
        encode_b64(test_id, test_secret) == "dGVzdF9lbmNvZGU6dGVzdF9zZWNyZXQ="
    )
