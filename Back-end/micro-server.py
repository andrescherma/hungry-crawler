import json
import threading
from bottle import route, post, request, response, run

from crawler import crawl_from_initial_url, db

@post('/crawl')
def crawl():
	body = json.loads(request.body.read())
	url = body['url']
	searchKey = db.reference('urls').push().key

	thread = threading.Thread(target=crawl_from_initial_url, args=(url, searchKey))
	# crawl_from_initial_url(url, searchKey)
	thread.start()

	response.content_type = 'application/json'
	response.headers['Access-Control-Allow-Origin'] = '*'
	response.headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Methods'
	response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
	response.headers['Content-Type'] = 'application/json'
	return searchKey

run(host='localhost', port=8080, debug=True)


