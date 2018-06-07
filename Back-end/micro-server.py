from bottle import post, request, response, run
import json

from crawler import crawl_from_initial_url, db

@post('/crawl')
def crawl():
	body = json.loads(request.body.read())
	url = body['url']
	searchKey = db.reference('urls').push().key
	crawl_from_initial_url(url, searchKey)
	return json.dumps({'searchKey': searchKey})

run(host='localhost', port=8080, debug=True)


