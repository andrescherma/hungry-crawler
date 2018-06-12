import unittest

from crawler import *

class crawlerTests(unittest.TestCase):

	def setUp(self):
		self.domain = 'http://teamtreehouse.com'
	

	def test_normalize_found_link(self):

		self.assertEqual(
			normalize_found_link(None, self.domain),
			None
		)
		
		self.assertEqual(normalize_found_link('', self.domain),
			None
		)

		self.assertEqual(
			normalize_found_link('http://teamtreehouse.com', self.domain),
			'http://teamtreehouse.com'
		)

		self.assertEqual(
			normalize_found_link('https://teamtreehouse.com/', self.domain),
			'https://teamtreehouse.com/'
		)

		self.assertEqual(
			normalize_found_link('/library', self.domain),
			(self.domain + '/library')
		)

		self.assertEqual(
			normalize_found_link('#library', self.domain),
			(self.domain + '/#library')
		)

		self.assertEqual(
			normalize_found_link('www.teamtreehouse.com', self.domain),
			('http://www.teamtreehouse.com')
		)

		self.assertEqual(
			normalize_found_link('mailto:email@gmail.com', self.domain),
			None
		)

		self.assertEqual(
			normalize_found_link('tel:+99 (99) 9 9999 9999', self.domain),
			None
		)

		self.assertEqual(
			normalize_found_link('strangestring', self.domain),
			(self.domain + '/strangestring')
		)

		

	def test_normalize_source_url(self):
		self.assertEqual(
			normalize_source_url('http://teamtreehouse.com/'),
			'http://teamtreehouse.com'
		)

		self.assertEqual(
			normalize_source_url('http://teamtreehouse.com'),
			'http://teamtreehouse.com'
		)


if __name__ == '__main__':
	unittest.main()

