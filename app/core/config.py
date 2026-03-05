from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "Cleveland Business Mentoring"
    database_url: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/cbm"
    secret_key: str = "change-me-to-a-random-secret"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30

    model_config = {"env_file": ".env", "extra": "ignore"}


settings = Settings()
