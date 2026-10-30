"""
Automated Test Suite for Task Tracker REST API
Part of CAPSTONE 62: Technical Blog Writing Series for Developers

Verifies compliance with:
  - RFC 9110 HTTP status semantics (200, 201, 400, 404)
  - Strict input validation and defensive error handling
  - Isolated test fixtures (no shared mutable state)
"""

import pytest
from app import create_app


@pytest.fixture
def app():
    """Create a fresh, isolated Flask application instance for each test."""
    app_instance = create_app(initial_tasks={})
    app_instance.config.update({"TESTING": True})
    return app_instance


@pytest.fixture
def client(app):
    """Provides an in-memory HTTP test client for making simulated API requests."""
    return app.test_client()


# ============================================================================
# 1. Health Check Tests
# ============================================================================

def test_health_check_returns_200(client):
    """Verify that GET /api/health returns HTTP 200 OK with expected status info."""
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.is_json
    data = response.get_json()
    assert data["status"] == "healthy"
    assert data["service"] == "task-tracker-api"
    assert "version" in data


# ============================================================================
# 2. Retrieval Tests (GET)
# ============================================================================

def test_get_tasks_initially_empty(client):
    """Verify that an empty datastore returns an empty list and count 0."""
    response = client.get("/api/tasks")
    assert response.status_code == 200
    data = response.get_json()
    assert data["count"] == 0
    assert data["tasks"] == []


def test_get_single_task_success(client):
    """Verify retrieval of an existing task returns 200 OK with correct attributes."""
    # First create a task
    create_resp = client.post(
        "/api/tasks",
        json={"title": "Draft Outline", "description": "Plan 22 sections."}
    )
    assert create_resp.status_code == 201
    created_id = create_resp.get_json()["task"]["id"]

    # Now retrieve it
    get_resp = client.get(f"/api/tasks/{created_id}")
    assert get_resp.status_code == 200
    task_data = get_resp.get_json()["task"]
    assert task_data["id"] == created_id
    assert task_data["title"] == "Draft Outline"
    assert task_data["completed"] is False


def test_get_single_task_not_found(client):
    """Verify that requesting a nonexistent task ID returns 404 Not Found."""
    response = client.get("/api/tasks/9999")
    assert response.status_code == 404
    data = response.get_json()
    assert "error" in data
    assert data["task_id"] == 9999


# ============================================================================
# 3. Creation Tests (POST) & Input Validation
# ============================================================================

def test_create_task_success(client):
    """Verify happy-path task creation returns HTTP 201 Created and assigned ID."""
    payload = {
        "title": "Set up pytest",
        "description": "Install pytest 9.1 and configure fixtures.",
        "completed": False
    }
    response = client.post("/api/tasks", json=payload)
    assert response.status_code == 201
    data = response.get_json()
    assert data["message"] == "Task created successfully."
    assert data["task"]["id"] == 1
    assert data["task"]["title"] == "Set up pytest"
    assert data["task"]["completed"] is False


def test_create_task_missing_title_returns_400(client):
    """Verify that omitting the required 'title' field returns 400 Bad Request."""
    payload = {"description": "A task with no title."}
    response = client.post("/api/tasks", json=payload)
    assert response.status_code == 400
    data = response.get_json()
    assert "error" in data
    assert "Missing required field: 'title'" in data["error"]


def test_create_task_empty_title_returns_400(client):
    """Verify that an empty or whitespace-only title returns 400 Bad Request."""
    payload = {"title": "   "}
    response = client.post("/api/tasks", json=payload)
    assert response.status_code == 400
    data = response.get_json()
    assert "must be a non-empty string" in data["error"]


def test_create_task_non_json_content_type_returns_400(client):
    """Verify that requests without application/json Content-Type are rejected with 400."""
    response = client.post(
        "/api/tasks",
        data="raw unformatted text",
        content_type="text/plain"
    )
    assert response.status_code == 400
    data = response.get_json()
    assert "Invalid Content-Type" in data["error"]


def test_create_task_invalid_type_returns_400(client):
    """Verify that passing non-boolean 'completed' returns 400 Bad Request."""
    payload = {"title": "Validate types", "completed": "not-a-boolean"}
    response = client.post("/api/tasks", json=payload)
    assert response.status_code == 400
    data = response.get_json()
    assert "must be a boolean" in data["error"]


# ============================================================================
# 4. Filtering Tests (Query Params)
# ============================================================================

def test_filter_tasks_by_status(client):
    """Verify filtering tasks via ?completed=true query string."""
    client.post("/api/tasks", json={"title": "Task 1", "completed": True})
    client.post("/api/tasks", json={"title": "Task 2", "completed": False})

    # Filter completed
    resp_completed = client.get("/api/tasks?completed=true")
    assert resp_completed.status_code == 200
    data_completed = resp_completed.get_json()
    assert data_completed["count"] == 1
    assert data_completed["tasks"][0]["title"] == "Task 1"

    # Filter pending
    resp_pending = client.get("/api/tasks?completed=false")
    assert resp_pending.status_code == 200
    data_pending = resp_pending.get_json()
    assert data_pending["count"] == 1
    assert data_pending["tasks"][0]["title"] == "Task 2"


# ============================================================================
# 5. Deletion Tests (DELETE)
# ============================================================================

def test_delete_task_success(client):
    """Verify deleting an existing task returns 200 OK and subsequent GET returns 404."""
    create_resp = client.post("/api/tasks", json={"title": "To be deleted"})
    task_id = create_resp.get_json()["task"]["id"]

    del_resp = client.delete(f"/api/tasks/{task_id}")
    assert del_resp.status_code == 200
    assert del_resp.get_json()["message"] == "Task deleted successfully."

    # Verify task no longer exists
    get_resp = client.get(f"/api/tasks/{task_id}")
    assert get_resp.status_code == 404


def test_delete_task_not_found(client):
    """Verify deleting a nonexistent task returns 404 Not Found."""
    response = client.delete("/api/tasks/7777")
    assert response.status_code == 404
    assert "error" in response.get_json()


# ============================================================================
# 6. Global Route Fallback Tests
# ============================================================================

def test_unregistered_endpoint_returns_json_404(client):
    """Verify that nonexistent routes trigger custom JSON 404 error handler."""
    response = client.get("/api/nonexistent-route")
    assert response.status_code == 404
    assert response.is_json
    data = response.get_json()
    assert "endpoint does not exist" in data["error"]
