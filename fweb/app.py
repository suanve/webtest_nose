# hello.py

from flask import Flask, Response, request
from flask_cors import CORS
import json
import time
from dbs import DatabaseClient
app = Flask(__name__)

db = DatabaseClient()

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

datas = []
@app.route('/api/challenge/get',methods=["GET","POST"])
def getData():
    global db
    rsdata = {
        "code": 403,
        'data': []
    }
    res = ""
    if request.method == "POST":
        itemId = request.json.get('fromKey')
        print(itemId)
        try:
            res = db.sql(f"select * from challenge where id={int(itemId)}")
            
        except:
            return Response(json.dumps(rsdata), mimetype='application/json') 
        
        for re in res:
            tmp_data = {}
            tmp_data['key'] = re[0]
            tmp_data['name'] = re[1]
            tmp_data['target'] = re[2]
            tmp_data['description'] = re[3]
            tmp_data['endtime'] = time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(float(re[4])))
            rsdata['data'].append(tmp_data)
            rsdata['code'] = 200

        return Response(json.dumps(rsdata), mimetype='application/json')

    if request.method == "GET":
        res = db.sql("select * from challenge")
        for re in res:
            
            tmp_data = {}
            tmp_data['id'] = re[0]
            tmp_data['Name'] = re[1]
            tmp_data['Img'] = re[2]
            tmp_data['Description'] = re[3]
            tmp_data['Type'] = re[4]
            rsdata['data'].append(tmp_data)
            rsdata['code'] = 200
    return Response(json.dumps(rsdata), mimetype='application/json')


@app.route('/api/challenge/start',methods=["POST"])
def startChallenge():
    rsdata = {
        "code": 403,
        'data': []
    }
    res = ""
    challengeId = request.json.get('challengeId')
    rsdata['code'] = 200
    # time.sleep(2)
    print(challengeId)
    return Response(json.dumps(rsdata), mimetype='application/json')



@app.route('/api/challenge/getStatus',methods=["GET"])
def getChallengeStatus():
    rsdata = {
        "code": 403,
        'data': []
    }
    res = ""
    rsdata['code'] = 200
    rsdata['data'] = [
        {
            "id":"1",
            "url":"http://127.0.0.1:333",
            "start":"time"
        },
        {
            "id":"4",
            "url":"http://127.0.0.1:333",
            "start":"time"
        },
        {
            "id":"6",
            "url":"http://127.0.0.1:333",
            "start":"time"
        }
    ]
    rsdata['length'] = len(rsdata['data'])
    # time.sleep(2)
    return Response(json.dumps(rsdata), mimetype='application/json')


@app.route('/')
def index():
    global db
    rsdata = {
        "code": 200,
        'data': []
    }
    res = db.sql("select * from items  order by id desc limit 0,9")
    for re in res:
        tmp_data = {}
        tmp_data['key'] = re[0]
        tmp_data['name'] = re[1]
        tmp_data['target'] = re[2]
        tmp_data['description'] = re[3]
        tmp_data['endtime'] = time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(float(re[4])))
        rsdata['data'].append(tmp_data)

    return Response(json.dumps(rsdata), mimetype='application/json')


if __name__ == '__main__':
    app.run(port="2999")
