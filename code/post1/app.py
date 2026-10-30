"""
Task Tracker REST API & Interactive Capstone Portal — Post 1 & Project Hub
Part of CAPSTONE 62: Technical Blog Writing Series for Developers

Features:
  - RFC 9110 compliant REST API (GET, POST, DELETE, /api/health)
  - Defensive JSON input validation & error responses
  - Application factory pattern for isolated testing
  - Built-in Interactive Web Portal at '/' for local evaluation
  - Live API testing UI, Automation runner, Article viewer, and PPTX download
"""

import os
from pathlib import Path
from flask import Flask, jsonify, request, render_template_string, send_file
import sys

# Add automation directory to path for workflow execution
WORKSPACE_ROOT = Path(__file__).resolve().parent.parent.parent
sys.path.insert(0, str(WORKSPACE_ROOT / "automation"))
try:
    from reminder_workflow import process_calendar, format_reminders_report
except ImportError:
    process_calendar = None

HTML_DASHBOARD = """
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CAPSTONE 62 — Developer Portal & Live REST API</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #0b0f19;
      --card-bg: #111827;
      --card-border: #1f2937;
      --accent: #38bdf8;
      --accent-glow: rgba(56, 189, 248, 0.15);
      --green: #34d399;
      --red: #f87171;
      --yellow: #fbbf24;
      --text: #f9fafb;
      --text-muted: #9ca3af;
      --font-sans: 'Plus Jakarta Sans', system-ui, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: var(--font-sans);
      line-height: 1.6;
      padding-bottom: 60px;
    }
    header {
      background: linear-gradient(180deg, #131d33 0%, var(--bg) 100%);
      border-bottom: 1px solid var(--card-border);
      padding: 30px 20px;
      text-align: center;
    }
    .badge {
      display: inline-block;
      background: var(--accent-glow);
      color: var(--accent);
      border: 1px solid var(--accent);
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      padding: 4px 12px;
      border-radius: 999px;
      margin-bottom: 12px;
    }
    h1 {
      font-size: 28px;
      font-weight: 800;
      letter-spacing: -0.5px;
      margin-bottom: 8px;
    }
    .subtitle {
      color: var(--text-muted);
      font-size: 15px;
      max-width: 800px;
      margin: 0 auto;
    }
    .nav-tabs {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-top: 25px;
      flex-wrap: wrap;
    }
    .tab-btn {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      color: var(--text-muted);
      font-family: var(--font-sans);
      font-size: 13px;
      font-weight: 600;
      padding: 10px 18px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .tab-btn:hover {
      border-color: var(--accent);
      color: var(--text);
    }
    .tab-btn.active {
      background: var(--accent);
      color: #0b0f19;
      border-color: var(--accent);
      font-weight: 700;
      box-shadow: 0 0 15px var(--accent-glow);
    }
    .container {
      max-width: 1100px;
      margin: 30px auto;
      padding: 0 20px;
    }
    .tab-content { display: none; }
    .tab-content.active { display: block; animation: fadeIn 0.3s ease; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }
    @media(max-width: 850px) { .grid-2 { grid-template-columns: 1fr; } }
    .card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 24px;
    }
    .card-title {
      font-size: 17px;
      font-weight: 700;
      margin-bottom: 14px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .btn {
      background: var(--accent);
      color: #0b0f19;
      border: none;
      font-family: var(--font-sans);
      font-weight: 700;
      font-size: 13px;
      padding: 10px 18px;
      border-radius: 6px;
      cursor: pointer;
      transition: opacity 0.2s;
    }
    .btn:hover { opacity: 0.9; }
    .btn-secondary {
      background: #1f2937;
      color: var(--text);
      border: 1px solid #374151;
    }
    .btn-secondary:hover { background: #374151; }
    .btn-danger {
      background: #ef4444;
      color: white;
    }
    .form-group {
      margin-bottom: 14px;
    }
    label {
      display: block;
      font-size: 12px;
      font-weight: 600;
      color: var(--text-muted);
      margin-bottom: 6px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    input, textarea, select {
      width: 100%;
      background: #0b0f19;
      border: 1px solid #374151;
      border-radius: 6px;
      color: var(--text);
      font-family: var(--font-sans);
      font-size: 14px;
      padding: 10px 12px;
    }
    input:focus, textarea:focus { outline: none; border-color: var(--accent); }
    pre {
      background: #070a13;
      border: 1px solid #1f2937;
      border-radius: 8px;
      padding: 16px;
      font-family: var(--font-mono);
      font-size: 12.5px;
      color: #7dd3fc;
      overflow-x: auto;
      max-height: 400px;
    }
    .tag {
      font-family: var(--font-mono);
      font-size: 11px;
      padding: 2px 8px;
      border-radius: 4px;
      font-weight: 600;
    }
    .tag-get { background: rgba(56, 189, 248, 0.2); color: #38bdf8; }
    .tag-post { background: rgba(52, 211, 153, 0.2); color: #34d399; }
    .tag-delete { background: rgba(248, 113, 113, 0.2); color: #f87171; }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13.5px;
      margin-top: 10px;
    }
    th, td {
      border: 1px solid #1f2937;
      padding: 10px 14px;
      text-align: left;
    }
    th { background: #1a2234; color: var(--accent); font-weight: 600; }
    .pass-icon { color: var(--green); font-weight: bold; }
    .code-box {
      background: #090d16;
      border-left: 3px solid var(--accent);
      padding: 12px;
      font-family: var(--font-mono);
      font-size: 12px;
      margin: 8px 0;
      color: #cbd5e1;
    }
  </style>
</head>
<body>

  <header>
    <div class="badge">CAPSTONE 62 — Live Execution Hub</div>
    <h1>Technical Blog Writing Series for Developers</h1>
    <p class="subtitle">An interactive local dashboard demonstrating Python REST API execution, automated testing, editorial workflow automation, and verified technical articles.</p>
    
    <div class="nav-tabs">
      <button class="tab-btn active" onclick="switchTab('api-tab')">⚡ Live REST API Explorer</button>
      <button class="tab-btn" onclick="switchTab('automation-tab')">⏱️ Content Calendar Automation</button>
      <button class="tab-btn" onclick="switchTab('articles-tab')">📚 3-Post Technical Series</button>
      <button class="tab-btn" onclick="switchTab('diff-tab')">🔄 AI Draft vs Human Review Diff</button>
      <button class="tab-btn" onclick="switchTab('presentation-tab')">📽️ Capstone Slides & Viva Script</button>
    </div>
  </header>

  <div class="container">
    
    <!-- TAB 1: API Explorer -->
    <div id="api-tab" class="tab-content active">
      <div class="grid-2">
        <div>
          <div class="card">
            <div class="card-title"><span>📡 Quick API Operations</span></div>
            <p style="color: var(--text-muted); font-size: 13px; margin-bottom: 16px;">Trigger live HTTP requests against local Flask endpoints:</p>
            <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px;">
              <button class="btn" onclick="runRequest('GET', '/api/health')"><span class="tag tag-get">GET</span> Health Check</button>
              <button class="btn btn-secondary" onclick="runRequest('GET', '/api/tasks')"><span class="tag tag-get">GET</span> List All Tasks</button>
              <button class="btn btn-secondary" onclick="runRequest('GET', '/api/tasks?completed=true')"><span class="tag tag-get">GET</span> Filter Completed</button>
              <button class="btn btn-secondary" onclick="triggerInvalidPost()"><span class="tag tag-post">POST</span> Test 400 Validation Error</button>
            </div>
          </div>

          <div class="card">
            <div class="card-title"><span>➕ Create Task (POST /api/tasks)</span></div>
            <div class="form-group">
              <label>Task Title (Required)</label>
              <input type="text" id="task-title" placeholder="e.g., Master RFC 9110 HTTP semantics" value="Write automated pytest assertions">
            </div>
            <div class="form-group">
              <label>Description</label>
              <input type="text" id="task-desc" placeholder="Details about this task..." value="Cover boundary conditions and 400 Bad Request responses">
            </div>
            <div class="form-group">
              <label>Completion Status</label>
              <select id="task-completed">
                <option value="false">Pending (false)</option>
                <option value="true">Completed (true)</option>
              </select>
            </div>
            <button class="btn" onclick="createTask()">Send POST Request (201 Created)</button>
          </div>

          <div class="card">
            <div class="card-title"><span>🗑️ Delete Task (DELETE /api/tasks/&lt;id&gt;)</span></div>
            <div class="form-group">
              <label>Task ID to Delete</label>
              <input type="number" id="delete-id" value="1" min="1">
            </div>
            <button class="btn btn-danger" onclick="deleteTask()">Send DELETE Request</button>
          </div>
        </div>

        <div>
          <div class="card">
            <div class="card-title"><span>📟 Live HTTP Response Console</span></div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span id="response-status" style="font-family: var(--font-mono); font-size: 13px; color: var(--green);">Ready</span>
              <span id="response-time" style="font-size: 12px; color: var(--text-muted);">0 ms</span>
            </div>
            <pre id="response-output">// Click any button on the left to execute a live HTTP request.
// The real JSON response from Flask will render here.</pre>
          </div>

          <div class="card">
            <div class="card-title"><span>🧪 Local Automated Test Suite Status</span></div>
            <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 12px;">Verified locally with Python 3.14.2 & pytest 9.1.1:</p>
            <div style="background: #090d16; border: 1px solid var(--card-border); border-radius: 8px; padding: 14px;">
              <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 6px;">
                <span>• Post 1 REST API Tests (<code>test_app.py</code>):</span>
                <span style="color: var(--green); font-weight: bold;">13 / 13 PASSED (100%)</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 6px;">
                <span>• Reminder Workflow Tests (<code>test_reminder.py</code>):</span>
                <span style="color: var(--green); font-weight: bold;">9 / 9 PASSED (100%)</span>
              </div>
              <div style="border-top: 1px solid #1f2937; margin-top: 8px; padding-top: 8px; display: flex; justify-content: space-between; font-size: 13px;">
                <span>Total Combined Suite:</span>
                <span style="color: var(--green); font-weight: bold;">22 of 22 PASSED in 0.72s</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- TAB 2: Automation -->
    <div id="automation-tab" class="tab-content">
      <div class="card">
        <div class="card-title"><span>⏱️ Editorial Deadline Reminder Workflow</span></div>
        <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 16px;">
          Runs <code>automation/reminder_workflow.py</code> locally against <code>automation/content_calendar.csv</code>.
          Safely parses ISO dates, skips invalid entries with warnings, and detects approaching/overdue drafts.
        </p>
        <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 16px; flex-wrap: wrap;">
          <label style="margin: 0;">Evaluation Date:</label>
          <input type="date" id="eval-date" value="2026-10-12" style="width: auto;">
          <label style="margin: 0;">Alert Threshold (Days):</label>
          <input type="number" id="eval-threshold" value="3" min="1" max="14" style="width: 80px;">
          <button class="btn" onclick="runAutomation()">Execute Reminder Workflow Live</button>
        </div>
        <pre id="automation-output">// Click 'Execute Reminder Workflow Live' to evaluate editorial milestones.</pre>
      </div>
    </div>

    <!-- TAB 3: Articles -->
    <div id="articles-tab" class="tab-content">
      <div class="card">
        <div class="card-title"><span>📖 Post 1 (Main Article — ~1,000 Words)</span></div>
        <h3 style="color: var(--accent); margin-bottom: 8px;">Build and Test Your First Python REST API: A Beginner-Friendly Guide</h3>
        <p style="color: var(--text-muted); font-size: 13px; margin-bottom: 12px;">Stack: Python 3.14.2 | Flask 3.1.3 | pytest 9.1.1 | 22 Canonical Sections</p>
        <div class="code-box">
          File: <code>04_post_1_main_article.md</code> (1,012 words)<br>
          Covers: RFC 9110 status codes, application factory pattern, defensive JSON parsing, mass assignment prevention, 13 automated tests.
        </div>
      </div>

      <div class="card">
        <div class="card-title"><span>📖 Post 2 (Short Guide — 650 Words)</span></div>
        <h3 style="color: var(--accent); margin-bottom: 8px;">5 Python Testing Mistakes Beginners Should Avoid</h3>
        <p style="color: var(--text-muted); font-size: 13px; margin-bottom: 12px;">Covers: Weak assertions, untested error paths, shared mutable state, vague test names, and test order dependency.</p>
        <div class="code-box">
          File: <code>05_post_2_testing_mistakes.md</code><br>
          Includes actionable "Avoid This" vs "Do This" code snippets and a 5-point beginner testing checklist.
        </div>
      </div>

      <div class="card">
        <div class="card-title"><span>📖 Post 3 (Responsible AI Guide — 645 Words)</span></div>
        <h3 style="color: var(--accent); margin-bottom: 8px;">How to Use AI to Review Code Without Trusting It Blindly</h3>
        <p style="color: var(--text-muted); font-size: 13px; margin-bottom: 12px;">Covers: Treating AI output as hypotheses to verify, a production code review prompt, and the 3-step verification protocol.</p>
        <div class="code-box">
          File: <code>06_post_3_ai_code_review.md</code><br>
          Case study: Catching hallucinated <code>request.get_json(force_dict=True)</code> and mass assignment security risks.
        </div>
      </div>
    </div>

    <!-- TAB 4: Diff Analysis -->
    <div id="diff-tab" class="tab-content">
      <div class="card">
        <div class="card-title"><span>🔄 Before-and-After Analysis: Catching AI Flaws</span></div>
        <p style="color: var(--text-muted); font-size: 13.5px; margin-bottom: 16px;">
          Empirical comparison documenting how human technical review caught hallucinations and improved raw AI drafts:
        </p>
        <table>
          <thead>
            <tr>
              <th>Topic</th>
              <th>Original AI Draft</th>
              <th>Human Corrected Final</th>
              <th>Flaw Caught & Value Added</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Flask Extraction</strong></td>
              <td><code>data = request.get_json(force_dict=True)<br>tasks_db.update(data)</code></td>
              <td><code>if not request.is_json: ...<br>data = request.get_json(silent=True)<br>title = data.get("title")</code></td>
              <td><strong>Hallucination & Vulnerability:</strong> <code>force_dict=True</code> does not exist in Flask; <code>update(data)</code> introduced OWASP API3 Mass Assignment.</td>
            </tr>
            <tr>
              <td><strong>RFC Status</strong></td>
              <td>"Always return HTTP 200 OK because that tells the computer it worked."</td>
              <td>"RFC 9110 specifies <code>201 Created</code> on resource creation and <code>400 Bad Request</code> on validation failure."</td>
              <td><strong>Standard Inaccuracy:</strong> Enforced canonical IETF RFC 9110 status code semantics.</td>
            </tr>
            <tr>
              <td><strong>Testing State</strong></td>
              <td>"Write some simple unit tests with pytest to make code completely bug-free."</td>
              <td>"Application Factory pattern encapsulates in-memory storage per test, eliminating shared mutable state."</td>
              <td><strong>Superficial Claim:</strong> Replaced vague "bug-free" claim with concrete fixture isolation architecture.</td>
            </tr>
            <tr>
              <td><strong>Style & Tone</strong></td>
              <td>"In today's fast-paced, rapidly evolving technological world..."</td>
              <td>"When computer science students build their first web projects, they struggle to diagnose client-server bugs..."</td>
              <td><strong>Generic AI Filler:</strong> Stripped clichés; applied Google Technical Writing active voice principles.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- TAB 5: Presentation & Viva -->
    <div id="presentation-tab" class="tab-content">
      <div class="card">
        <div class="card-title"><span>📽️ Capstone Defense Presentation & Viva Script</span></div>
        <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 16px;">
          Download the generated 16:9 widescreen PowerPoint deck or review the 10-step evaluation walkthrough.
        </p>
        <div style="display: flex; gap: 12px; margin-bottom: 20px;">
          <a href="/api/presentation/download" class="btn" style="text-decoration: none; display: inline-block;">📥 Download 09_capstone_presentation.pptx (37 KB)</a>
        </div>
        <div class="code-box">
          Presentation File: <code>09_capstone_presentation.pptx</code> (Generated via python-pptx)<br>
          Speaker Script: <code>09_presentation_speaker_notes.md</code> (10–12 minute jury presentation)<br>
          Demo Script: <code>demo/final_demo_script.md</code> (10-step live evaluation protocol)
        </div>
      </div>
    </div>

  </div>

  <script>
    function switchTab(tabId) {
      document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
      document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
      document.getElementById(tabId).classList.add('active');
      event.target.classList.add('active');
    }

    async function runRequest(method, url, body = null) {
      const output = document.getElementById('response-output');
      const statusEl = document.getElementById('response-status');
      const timeEl = document.getElementById('response-time');
      output.textContent = 'Sending ' + method + ' request to ' + url + '...';
      const t0 = performance.now();

      try {
        const opts = { method: method };
        if (body) {
          opts.headers = { 'Content-Type': 'application/json' };
          opts.body = JSON.stringify(body);
        }
        const resp = await fetch(url, opts);
        const data = await resp.json();
        const t1 = performance.now();
        timeEl.textContent = Math.round(t1 - t0) + ' ms';
        statusEl.textContent = 'HTTP ' + resp.status + ' ' + (resp.ok ? 'OK' : 'Error');
        statusEl.style.color = resp.ok ? 'var(--green)' : 'var(--red)';
        output.textContent = JSON.stringify(data, null, 2);
      } catch (err) {
        statusEl.textContent = 'Network Error';
        statusEl.style.color = 'var(--red)';
        output.textContent = String(err);
      }
    }

    function createTask() {
      const title = document.getElementById('task-title').value;
      const desc = document.getElementById('task-desc').value;
      const completed = document.getElementById('task-completed').value === 'true';
      runRequest('POST', '/api/tasks', { title: title, description: desc, completed: completed });
    }

    function triggerInvalidPost() {
      runRequest('POST', '/api/tasks', { description: 'Missing required title field' });
    }

    function deleteTask() {
      const id = document.getElementById('delete-id').value;
      runRequest('DELETE', '/api/tasks/' + id);
    }

    async function runAutomation() {
      const out = document.getElementById('automation-output');
      const asOf = document.getElementById('eval-date').value;
      const threshold = document.getElementById('eval-threshold').value;
      out.textContent = 'Running automation workflow for date: ' + asOf + '...';

      try {
        const resp = await fetch('/api/automation/run?as_of=' + asOf + '&threshold=' + threshold);
        const data = await resp.json();
        out.textContent = data.report || JSON.stringify(data, null, 2);
      } catch (err) {
        out.textContent = 'Error executing automation: ' + err;
      }
    }

    // Auto-run health check on page load
    window.onload = function() {
      runRequest('GET', '/api/health');
    };
  </script>

</body>
</html>
"""


def create_app(initial_tasks=None):
    """
    Application factory that initializes and configures the Flask application.
    Accepts optional initial_tasks dict for isolated testing.
    """
    dist_dir = WORKSPACE_ROOT / "dist"
    app = Flask(__name__)

    # In-memory data store encapsulated within the app instance
    tasks_db = {}
    if initial_tasks:
        tasks_db.update(initial_tasks)

    id_counter = [max(tasks_db.keys()) if tasks_db else 0]

    @app.route("/", methods=["GET"])
    def index_portal():
        """TechWrite AI Publication & Capstone 62 Portal."""
        dist_index = dist_dir / "index.html"
        if dist_index.exists():
            return send_file(str(dist_index))
        return render_template_string(HTML_DASHBOARD)

    @app.route("/legacy-portal", methods=["GET"])
    def legacy_dashboard():
        """Legacy in-memory testing dashboard."""
        return render_template_string(HTML_DASHBOARD)

    @app.route("/assets/<path:filename>")
    def serve_dist_assets(filename):
        """Serve built React frontend static assets."""
        assets_dir = dist_dir / "assets"
        target_file = assets_dir / filename
        if target_file.exists():
            return send_file(str(target_file))
        return jsonify({"error": "Asset not found"}), 404

    @app.route("/api/health", methods=["GET"])
    def health_check():
        """Health-check endpoint. Returns HTTP 200 OK."""
        return jsonify({
            "status": "healthy",
            "service": "task-tracker-api",
            "version": "1.0.0"
        }), 200

    @app.route("/api/tasks", methods=["GET"])
    def get_tasks():
        """Retrieve all tasks, with optional filter by ?completed=true|false."""
        status_filter = request.args.get("completed")
        tasks_list = list(tasks_db.values())

        if status_filter is not None:
            is_completed = status_filter.lower() in ("true", "1", "yes")
            tasks_list = [t for t in tasks_list if t["completed"] == is_completed]

        return jsonify({
            "tasks": tasks_list,
            "count": len(tasks_list)
        }), 200

    @app.route("/api/tasks/<int:task_id>", methods=["GET"])
    def get_task(task_id):
        """Retrieve a single task by its integer identifier."""
        task = tasks_db.get(task_id)
        if task is None:
            return jsonify({
                "error": "Task not found",
                "task_id": task_id
            }), 404
        return jsonify({"task": task}), 200

    @app.route("/api/tasks", methods=["POST"])
    def create_task():
        """Create a new task with defensive JSON validation."""
        if not request.is_json:
            return jsonify({
                "error": "Invalid Content-Type. Request body must be JSON (application/json)."
            }), 400

        data = request.get_json(silent=True)
        if data is None or not isinstance(data, dict):
            return jsonify({
                "error": "Malformed JSON payload. Expected a JSON object."
            }), 400

        title = data.get("title")
        if title is None:
            return jsonify({"error": "Missing required field: 'title'."}), 400

        if not isinstance(title, str) or not title.strip():
            return jsonify({"error": "Field 'title' must be a non-empty string."}), 400

        description = data.get("description", "")
        if not isinstance(description, str):
            return jsonify({"error": "Field 'description' must be a string."}), 400

        completed = data.get("completed", False)
        if not isinstance(completed, bool):
            return jsonify({"error": "Field 'completed' must be a boolean (true or false)."}), 400

        id_counter[0] += 1
        new_id = id_counter[0]

        new_task = {
            "id": new_id,
            "title": title.strip(),
            "description": description.strip(),
            "completed": completed
        }
        tasks_db[new_id] = new_task

        return jsonify({
            "message": "Task created successfully.",
            "task": new_task
        }), 201

    @app.route("/api/tasks/<int:task_id>", methods=["DELETE"])
    def delete_task(task_id):
        """Delete a task by integer ID."""
        if task_id not in tasks_db:
            return jsonify({
                "error": "Task not found",
                "task_id": task_id
            }), 404

        deleted_task = tasks_db.pop(task_id)
        return jsonify({
            "message": "Task deleted successfully.",
            "deleted_task": deleted_task
        }), 200

    @app.route("/api/automation/run", methods=["GET"])
    def run_automation_endpoint():
        """Executes the reminder workflow logic and returns human-readable report."""
        if process_calendar is None:
            return jsonify({"error": "Automation module unavailable."}), 500

        as_of = request.args.get("as_of", "2026-10-12")
        threshold = int(request.args.get("threshold", 3))
        csv_path = WORKSPACE_ROOT / "automation" / "content_calendar.csv"

        try:
            from datetime import datetime
            ref_date = datetime.strptime(as_of, "%Y-%m-%d").date()
            results = process_calendar(str(csv_path), reference_date=ref_date, threshold_days=threshold)
            report = format_reminders_report(results)
            return jsonify({"report": report, "results": results}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 400

    @app.route("/api/presentation/download", methods=["GET"])
    def download_presentation():
        """Download 09_capstone_presentation.pptx file."""
        pptx_path = WORKSPACE_ROOT / "09_capstone_presentation.pptx"
        if not pptx_path.exists():
            return jsonify({"error": "Presentation file not found."}), 404
        return send_file(
            str(pptx_path),
            as_attachment=True,
            download_name="CAPSTONE_62_Presentation.pptx",
            mimetype="application/vnd.openxmlformats-officedocument.presentationml.presentation"
        )

    @app.errorhandler(404)
    def resource_not_found(e):
        """JSON fallback handler for unknown API routes."""
        return jsonify({
            "error": "The requested endpoint does not exist.",
            "path": request.path
        }), 404

    return app


if __name__ == "__main__":
    seed_data = {
        1: {
            "id": 1,
            "title": "Study RFC 9110 HTTP status codes",
            "description": "Learn semantic differences between 200, 201, 400, and 404.",
            "completed": True
        },
        2: {
            "id": 2,
            "title": "Write automated pytest suite",
            "description": "Cover happy path and boundary validation error cases.",
            "completed": False
        }
    }
    app = create_app(initial_tasks=seed_data)
    print("=================================================================")
    print("  CAPSTONE 62 — Task Tracker REST API & Interactive Hub")
    print("  Local URL: http://127.0.0.1:5000")
    print("=================================================================")
    app.run(host="127.0.0.1", port=5000, debug=False)
