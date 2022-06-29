import base64


def encode_b64(client_id: str, client_secret: str) -> str:
    client_creds = f"{client_id}:{client_secret}"
    client_creds_b64 = base64.b64encode(client_creds.encode())
    return client_creds_b64.decode()