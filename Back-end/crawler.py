############################################################################### 
# 
# Hungry-Crawler, por Andre Scherma. 2018
# 
# 
###############################################################################

import urllib2
from urlparse import urlparse

from HTMLParser import HTMLParser

import firebase_admin
from firebase_admin import credentials
from firebase_admin import db


class LinkParser(HTMLParser):

	def __init__(self):
		HTMLParser.__init__(self)
		self.links = list()

	def handle_starttag(self, tag, attrs):
	# Only parse the 'anchor' tag.
		if tag == "a":
			# Check the list of defined attributes.
			for name, value in attrs:
				# If href is defined, print it.
				if name == "href":
					#lets make it more modular, please
					self.links.append(value)


def normalize_found_link(link, source_url):

	parsed_url = urlparse(source_url)
	domain = parsed_url[0] + '://' + parsed_url[1]

	if link == None or len(link) <= 0:
		return None
	if len(link) >= 7 and link[0:7] == 'http://':
		return link
	if len(link) >= 8 and link[0:8] == 'https://':
		return link
	if link[0] == '/':
		return domain + link
	if link[0] == '#':
		return domain + '/' + link
	if len(link) >= 3 and link[0:3] == 'www':
		return 'http://' + link
	if len(link) >= 7 and link[0:7] == 'mailto:':
		return None
	if len(link) >= 4 and link[0:4] == 'tel:':
		return None
	if source_url not in link:
		return domain + '/' + link
	
	return link


def normalize_source_url(url):
	if url[-1] == '/':
		return url[:-1]
	else:
		return url


def get_links_from_url(url):
	# db.reference('urls/').push(url)
	parser = LinkParser()

	response = None
	try:
		response = urllib2.urlopen(url)
	except:
		print('an Error ocurred opening ' + url)

	if response != None:
		html = response.read()
		try:
			html = html.decode('utf-8')
			parser.feed(html)
		except:
			print('an error ocurred reading HTML from ' + url)


	return parser.links


def crawl_from_initial_url(url, searchKey):
	processed_links = set()
	links_queue = []

	norm_url = normalize_source_url(url)
	links_queue.append(norm_url)

	number = 0

	while len(links_queue) > 0:
		source_link = links_queue.pop(0)

		#source_link must be inserted on set like a string, so it can be verified if its
		#value is already on the set
		if str(source_link) not in processed_links:
			number = number + 1
			print(str(number) + ': processando ' + source_link)
			db.reference('urls/' + searchKey).push(value=source_link)
			
			processed_links.add(str(source_link))
			gotten_links = get_links_from_url(source_link)

			for new_link in gotten_links:
				norm_new_link = normalize_found_link(new_link, source_link)

				if norm_new_link != None:
					links_queue.append(normalize_source_url(norm_new_link))

	print('No more links on queue - how is it possible?')



# Initialize Firebase admin
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred, {
	'databaseURL': 'https://hungry-crawler-ascherma.firebaseio.com',
})

