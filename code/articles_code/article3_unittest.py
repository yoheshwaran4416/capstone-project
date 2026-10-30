"""
Article 3: Writing Your First Python Unit Tests with unittest - Runnable Code & Tests
Part of TechWrite AI / CAPSTONE 62
"""
import re
import unittest

def create_article_slug(title: str, max_length: int = 50) -> str:
    """
    Generate an SEO-friendly URL slug from an article title.
    
    Rules:
      1. Converts text to lowercase.
      2. Replaces non-alphanumeric characters with hyphens.
      3. Collapses consecutive hyphens into a single hyphen.
      4. Strips leading and trailing hyphens.
      5. Truncates cleanly to max_length without ending on a hyphen.
    """
    if not isinstance(title, str):
        raise TypeError("Title must be a string")
    
    cleaned = title.strip().lower()
    if not cleaned:
        raise ValueError("Title cannot be empty")
        
    # Replace non-alphanumeric characters with hyphens
    slug = re.sub(r'[^a-z0-9]+', '-', cleaned)
    slug = slug.strip('-')
    
    if len(slug) > max_length:
        slug = slug[:max_length].rstrip('-')
        
    return slug

class TestArticleSlugCreation(unittest.TestCase):
    """Test suite demonstrating unittest capabilities and edge cases."""
    
    def test_standard_title(self):
        result = create_article_slug("Python Functions Explained")
        self.assertEqual(result, "python-functions-explained")
        
    def test_special_characters_and_punctuation(self):
        result = create_article_slug("Git & GitHub: A Beginner's Practical Guide!")
        self.assertEqual(result, "git-github-a-beginner-s-practical-guide")
        
    def test_multiple_consecutive_spaces_and_symbols(self):
        result = create_article_slug("Flask  ---  REST   API???")
        self.assertEqual(result, "flask-rest-api")
        
    def test_max_length_truncation(self):
        long_title = "This is an extraordinarily long article title meant to test truncation length limits"
        result = create_article_slug(long_title, max_length=30)
        self.assertLessEqual(len(result), 30)
        self.assertFalse(result.endswith('-'))
        self.assertEqual(result, "this-is-an-extraordinarily-lon")
        
    def test_empty_string_raises_value_error(self):
        with self.assertRaises(ValueError) as context:
            create_article_slug("   ")
        self.assertIn("Title cannot be empty", str(context.exception))
        
    def test_invalid_type_raises_type_error(self):
        with self.assertRaises(TypeError):
            create_article_slug(12345) # type: ignore

if __name__ == '__main__':
    # Verbose mode provides detailed status per test
    unittest.main(verbosity=2)
