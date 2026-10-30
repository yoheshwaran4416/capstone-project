"""
Article 2: Five Common Python Mistakes Beginners Should Avoid - Runnable Code & Tests
Part of TechWrite AI / CAPSTONE 62
"""
import unittest
import io

# Mistake 1: Mutable Default Arguments
# Incorrect:
def buggy_append_item(item, target_list=[]):
    target_list.append(item)
    return target_list

# Correct:
def fixed_append_item(item, target_list=None):
    if target_list is None:
        target_list = []
    target_list.append(item)
    return target_list

# Mistake 2: Comparing with None using == instead of 'is'
def check_is_none(val):
    # 'is' checks identity in CPython memory, recommended by PEP 8
    return val is None

# Mistake 3: Modifying list while iterating
def filter_even_numbers_buggy(numbers):
    # Modifying in place alters the iterator index
    res = list(numbers)
    for n in res:
        if n % 2 != 0:
            res.remove(n)
    return res

def filter_even_numbers_fixed(numbers):
    # Using list comprehension creates a clean, predictable new list
    return [n for n in numbers if n % 2 == 0]

# Mistake 4: Catching Bare Except vs Specific Exception
def safe_parse_integer(raw_text: str) -> int | None:
    try:
        return int(raw_text.strip())
    except (ValueError, AttributeError):
        return None

# Mistake 5: Resource Leak (Not using context manager)
def read_first_line_safe(stream: io.StringIO) -> str:
    # Context managers guarantee deterministic resource teardown
    with stream as s:
        return s.readline().strip()

class TestPythonMistakes(unittest.TestCase):
    def test_mistake1_mutable_default_bug(self):
        # Reset default list if called before
        buggy_append_item.__defaults__[0].clear()
        first = buggy_append_item("item1")
        second = buggy_append_item("item2")
        # Notice that second accidentally contains item1 due to mutable default!
        self.assertEqual(second, ["item1", "item2"])

    def test_mistake1_fixed_append(self):
        first = fixed_append_item("item1")
        second = fixed_append_item("item2")
        self.assertEqual(first, ["item1"])
        self.assertEqual(second, ["item2"])

    def test_mistake2_identity_comparison(self):
        self.assertTrue(check_is_none(None))
        self.assertFalse(check_is_none(0))
        self.assertFalse(check_is_none(False))
        self.assertFalse(check_is_none(""))

    def test_mistake3_list_iteration_bug(self):
        # [1, 2, 3, 5] -> skips 5 when removing 3 because index shifts!
        input_data = [1, 2, 3, 5]
        buggy_result = filter_even_numbers_buggy(input_data)
        # Buggy result fails to remove 5!
        self.assertEqual(buggy_result, [2, 5])

    def test_mistake3_list_comprehension_fixed(self):
        input_data = [1, 2, 3, 5]
        fixed_result = filter_even_numbers_fixed(input_data)
        self.assertEqual(fixed_result, [2])

    def test_mistake4_specific_exceptions(self):
        self.assertEqual(safe_parse_integer("  42  "), 42)
        self.assertIsNone(safe_parse_integer("abc"))
        self.assertIsNone(safe_parse_integer(None))

    def test_mistake5_context_manager(self):
        stream = io.StringIO("Line 1\nLine 2")
        line = read_first_line_safe(stream)
        self.assertEqual(line, "Line 1")

if __name__ == '__main__':
    unittest.main()
