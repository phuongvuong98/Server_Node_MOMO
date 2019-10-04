import flask
from flask import request
from model import *
app = flask.Flask(__name__)
from flask import jsonify
from flask import request, json
@app.route("/")
def main():
    # if flask.request.method == 'GET':
    #     services = ""
    #     return (flask.render_template('predictor.html',result=services))
    kind = request.args.get('kind')
    uid = request.args.get('user_id')
    all = request.args.get('all')
    listkind = ["oops","cvs","food","fnb","shopping","supermarket","beverage"]
    if int(all) == 1:# neu all = 1 tra ve tat ca cac cua hang
        return json.load(open("all.json"))
    if uid:                         #neu all bang 0 chuyen qua xet id neu co
        if kind in listkind:                   #neu kind trong danh sach ["oops","cvs","food","fnb","shopping","supermarket","beverage"] tra ve json cua may tk
            fileName = str(kind) + ".json"
            jsonFile = json.load(open(fileName))
            return jsonFile
        else:                                             # neu kind de trong chuyen qua xet id
            if int(uid) == 8159657106479438377:          # id demo
                return json.load(open("8159657106479438377.json"))
            if int(uid) not in userUniq:# neu id khong ton tai tra ve {}
                return json.load(open("test.json"))
            # goi id khac de test online
            resDfDict = rec2json(int(uid))
            return json.dumps(resDfDict)
    else:# id khong ton tai
        return json.load(open("test.json"))


if __name__ == "__main__":
    app.run(debug=True)

