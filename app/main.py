from fastapi import FastAPI

from app.routers import auth, matching, messages, sessions, users

app = FastAPI(title="Cleveland Business Mentoring", version="0.1.0")

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(matching.router)
app.include_router(sessions.router)
app.include_router(messages.router)


@app.get("/health")
async def health_check():
    return {"status": "ok"}
