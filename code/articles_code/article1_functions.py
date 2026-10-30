"""
Article 1: Python Functions Explained - Runnable Code & Tests
Part of TechWrite AI / CAPSTONE 62
"""

# 1. Defining a basic function
def greet_developer(name: str) -> str:
    """Return a warm greeting for a developer."""
    return f"Welcome to TechWrite AI, {name}!"

# 2. Parameters vs Arguments & Default Parameters
def calculate_reading_time(word_count: int, words_per_minute: int = 200) -> int:
    """Estimate article reading time in minutes."""
    if word_count < 0:
        raise ValueError("Word count cannot be negative")
    minutes = round(word_count / words_per_minute)
    return max(1, minutes)

# 3. Positional and Keyword Arguments (*args and **kwargs)
def format_log_entry(level: str, message: str, **metadata) -> str:
    """Format structured logging output."""
    meta_str = " | ".join(f"{k}={v}" for k, v in metadata.items())
    return f"[{level.upper()}] {message}" + (f" ({meta_str})" if meta_str else "")

# 4. Return Values: Single, Multiple (Tuples), and Early Returns
def analyze_code_metrics(code: str) -> tuple[int, int]:
    """Return (line_count, character_count) for code block."""
    if not code:
        return 0, 0
    lines = code.splitlines()
    return len(lines), len(code)

# 5. Variable Scope (Local vs Global)
GLOBAL_PUBLICATION_NAME = "TechWrite AI"

def generate_watermark(author: str) -> str:
    """Demonstrate local variable referencing global configuration safely."""
    # Local scope variable
    timestamp_format = "YYYY-MM-DD"
    return f"{GLOBAL_PUBLICATION_NAME} • By {author} • [{timestamp_format}]"

# 6. Unit Tests to verify code correctness
import unittest

class TestPythonFunctions(unittest.TestCase):
    def test_greet_developer(self):
        self.assertEqual(greet_developer("Ada Lovelace"), "Welcome to TechWrite AI, Ada Lovelace!")

    def test_reading_time_standard(self):
        self.assertEqual(calculate_reading_time(1000), 5)

    def test_reading_time_short(self):
        self.assertEqual(calculate_reading_time(50), 1)

    def test_reading_time_custom_speed(self):
        self.assertEqual(calculate_reading_time(1000, words_per_minute=250), 4)

    def test_reading_time_negative(self):
        with self.assertRaises(ValueError):
            calculate_reading_time(-50)

    def test_format_log_entry(self):
        log = format_log_entry("info", "User registered", user="alex", role="author")
        self.assertEqual(log, "[INFO] User registered (user=alex | role=author)")

    def test_analyze_code_metrics(self):
        code = "def foo():\n    return 42"
        lines, chars = analyze_code_metrics(code)
        self.assertEqual(lines, 2)
        self.assertEqual(chars, 24)

    def test_analyze_empty_metrics(self):
        lines, chars = analyze_code_metrics("")
        self.assertEqual(lines, 0)
        self.assertEqual(chars, 0)

    def test_generate_watermark(self):
        self.assertEqual(generate_watermark("Guido"), "TechWrite AI • By Guido • [YYYY-MM-DD]")

if __name__ == '__main__':
    unittest.main()
