import { BeforeAfterDiff } from '../types';

export const BEFORE_AFTER_DIFFS: BeforeAfterDiff[] = [
  {
    id: 'diff-01',
    title: 'Mutable Default Argument Anti-Pattern',
    description: 'AI draft generated a function using a mutable list as default argument, causing insidious shared-state bugs across requests.',
    category: 'Security Bug',
    before: {
      codeOrText: `def add_tag(tag: str, tags: list = []):\n    tags.append(tag)\n    return tags`,
      issue: 'Mutable default argument `tags=[]` is evaluated once at definition time. All future calls share the same list instance, leaking data across requests.'
    },
    after: {
      codeOrText: `def add_tag(tag: str, tags: list | None = None) -> list:\n    if tags is None:\n        tags = []\n    tags.append(tag)\n    return tags`,
      resolution: 'Sentinel value `None` ensures a fresh list is allocated for each call where `tags` is omitted, eliminating shared mutable state.'
    }
  },
  {
    id: 'diff-02',
    title: 'Identity vs. Equality Comparison with None',
    description: 'Draft used equality operator `==` instead of identity `is` when checking for None.',
    category: 'PEP 8 Style',
    before: {
      codeOrText: `if response_data == None:\n    return {"error": "Missing payload"}`,
      issue: 'Using `==` calls `__eq__()`, which can be overridden by malicious or custom classes to return True even when not None, violating PEP 8.'
    },
    after: {
      codeOrText: `if response_data is None:\n    return {"error": "Missing payload"}`,
      resolution: 'Using `is None` performs a memory address comparison with the CPython None singleton, guaranteeing deterministic safety and higher speed.'
    }
  },
  {
    id: 'diff-03',
    title: 'RFC 9110 HTTP Status Code Semantics',
    description: 'AI model returned HTTP 200 OK for POST creation rather than RFC-compliant 201 Created.',
    category: 'Factual Accuracy',
    before: {
      codeOrText: `@app.route('/api/tasks', methods=['POST'])\ndef create_task():\n    # ... logic\n    return jsonify(task), 200`,
      issue: 'Returning 200 OK for resource creation violates RFC 9110 Section 15.3.2, which mandates 201 Created when a new entity is created.'
    },
    after: {
      codeOrText: `@app.route('/api/tasks', methods=['POST'])\ndef create_task():\n    # ... logic\n    return jsonify(task), 201`,
      resolution: 'Corrected to return HTTP 201 Created, establishing clean standards-compliant REST semantics.'
    }
  },
  {
    id: 'diff-04',
    title: 'Flaky Shared State in Test Suite',
    description: 'AI draft wrote unit tests that shared a global in-memory database without resetting between test runs.',
    category: 'Test Flakiness',
    before: {
      codeOrText: `class TestApi(unittest.TestCase):\n    def test_create(self):\n        client.post('/api/tasks', json={'title': 'A'})\n    def test_list(self):\n        res = client.get('/api/tasks')\n        self.assertEqual(len(res.json), 1) # FLAKY!`,
      issue: 'Tests depended on execution order and leaked created items into subsequent test assertions.'
    },
    after: {
      codeOrText: `class TestApi(unittest.TestCase):\n    def setUp(self):\n        self.app = create_app({'TESTING': True})\n        self.client = self.app.test_client()\n        # database reset per test`,
      resolution: 'Implemented setUp() fixture creating an isolated application factory instance for each individual test run.'
    }
  },
  {
    id: 'diff-05',
    title: 'Bare Exception Masking System Interrupts',
    description: 'AI generated a bare `except:` clause in the API error handling block.',
    category: 'Security Bug',
    before: {
      codeOrText: `try:\n    parsed = json.loads(payload)\nexcept:\n    return {"error": "Bad request"}, 400`,
      issue: 'Bare except caught `KeyboardInterrupt` (Ctrl+C) and `SystemExit`, preventing the developer from shutting down the local server.'
    },
    after: {
      codeOrText: `try:\n    parsed = json.loads(payload)\nexcept (json.JSONDecodeError, TypeError, ValueError):\n    return {"error": "Invalid JSON format"}, 400`,
      resolution: 'Restricted exception scope strictly to expected data parsing errors, allowing system signals to propagate normally.'
    }
  }
];
