import os
import json
import hashlib
import psycopg2

SCHEMA = os.environ.get("MAIN_DB_SCHEMA", "t_p53424259_phoenix_rebirth_proj")


def handler(event: dict, context) -> dict:
    """Авторизация военнослужащего по личному номеру и паролю."""
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    if event.get("httpMethod") != "POST":
        return {"statusCode": 405, "headers": cors, "body": json.dumps({"error": "Method not allowed"})}

    try:
        body = json.loads(event.get("body") or "{}")
    except Exception:
        return {"statusCode": 400, "headers": cors, "body": json.dumps({"error": "Invalid JSON"})}

    personal_number = (body.get("personal_number") or "").strip().upper()
    password = (body.get("password") or "").strip()

    if not personal_number or not password:
        return {"statusCode": 400, "headers": cors, "body": json.dumps({"error": "Заполните все поля"}, ensure_ascii=False)}

    password_hash = hashlib.md5(password.encode()).hexdigest()

    safe_number = personal_number.replace("'", "")
    safe_hash = password_hash.replace("'", "")

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()

    cur.execute(
        "SELECT id, full_name, rank, position, unit, division, birth_date, service_start "
        "FROM " + SCHEMA + ".soldiers "
        "WHERE personal_number = '" + safe_number + "' AND password_hash = '" + safe_hash + "'"
    )
    row = cur.fetchone()
    cur.close()
    conn.close()

    if not row:
        return {
            "statusCode": 401,
            "headers": cors,
            "body": json.dumps({"error": "Неверный личный номер или пароль"}, ensure_ascii=False),
        }

    soldier_id, full_name, rank, position, unit, division, birth_date, service_start = row

    return {
        "statusCode": 200,
        "headers": cors,
        "body": json.dumps({
            "ok": True,
            "soldier": {
                "id": soldier_id,
                "personal_number": personal_number,
                "full_name": full_name,
                "rank": rank,
                "position": position,
                "unit": unit,
                "division": division,
                "birth_date": str(birth_date),
                "service_start": str(service_start),
            }
        }, ensure_ascii=False),
    }
