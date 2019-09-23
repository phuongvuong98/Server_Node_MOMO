import flask
from flask import request
from model import *
app = flask.Flask(__name__)
@app.route("/", methods=["GET","POST"])
def main():
    if flask.request.method == 'GET':
        services = ""
        return (flask.render_template('predictor.html',result=services))
    if flask.request.method == 'POST':
        id = flask.request.form['id']
        uid = udict[int(id)]
        if uid>=0:
            services = revert2s(recommend(uid))
        else:
            services = ""
        print(services)
        return flask.render_template('predictor.html',result=services)

if __name__ == "__main__":
    app.run(debug=True)
    app.run()

