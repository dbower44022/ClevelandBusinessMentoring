import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_register_and_login(client: AsyncClient):
    response = await client.post(
        "/api/auth/register",
        json={
            "email": "mentor@example.com",
            "password": "testpass123",
            "full_name": "Test Mentor",
            "role": "mentor",
            "industry": "Technology",
        },
    )
    assert response.status_code == 201
    data = response.json()
    assert data["email"] == "mentor@example.com"
    assert data["role"] == "mentor"

    response = await client.post(
        "/api/auth/login",
        json={"email": "mentor@example.com", "password": "testpass123"},
    )
    assert response.status_code == 200
    assert "access_token" in response.json()


@pytest.mark.asyncio
async def test_register_duplicate_email(client: AsyncClient):
    user_data = {
        "email": "dup@example.com",
        "password": "testpass123",
        "full_name": "Test User",
        "role": "mentee",
    }
    await client.post("/api/auth/register", json=user_data)
    response = await client.post("/api/auth/register", json=user_data)
    assert response.status_code == 400


@pytest.mark.asyncio
async def test_login_wrong_password(client: AsyncClient):
    await client.post(
        "/api/auth/register",
        json={
            "email": "user@example.com",
            "password": "correct",
            "full_name": "Test",
            "role": "mentee",
        },
    )
    response = await client.post(
        "/api/auth/login",
        json={"email": "user@example.com", "password": "wrong"},
    )
    assert response.status_code == 401
