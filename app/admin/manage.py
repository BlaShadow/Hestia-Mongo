
import bcrypt
import logging
import json
from functools import wraps

from flask import jsonify
from flask import render_template
from flask import Blueprint, request
from flask import g, redirect, url_for, session

from ..core import db
from ..conf import AUTH as default_user
from ..model import user as user_module
from ..model import host as host_module

module = Blueprint('manage', __name__, url_prefix='/manage')

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if session.has_key('user') == False:
            print 'login redirect :/ '
            return redirect('/manage/login')
        else:
            print 'user logged'

        return f(*args, **kwargs)
    return decorated_function


@module.route('/user')
@login_required
def loged_user():

    data = {"user": session['user']['user']}

    return json.dumps(data)

@module.route('/')
@login_required
def index():
	return render_template('index.html')

@module.route('/logout')
def logout():

    session['user'] = None

    return redirect('/manage/login')

@module.route('/login',methods=['GET','POST'])
def login():
    if request.method== 'POST':

        if request.form['user'] != None and request.form['password'] != None:
            
            user = request.form['user']
            password = request.form['password']

            if user == default_user['user'] and password == default_user['password']:

                session['user'] = {"user":request.form['user'],}

                return redirect('/manage/')
            else:

                user_result = user_module.User.query.filter_by(user=user).first()

                if user_result != None:

                    hashed = user_result.password

                    if bcrypt.hashpw(password, hashed) == hashed:
                        
                        session['user'] = {"user":request.form['user'],}

                        g.user = session['user']

                        return redirect('/manage/')

    if request.method== 'POST' and session.has_key('user') == True:
        print 'login redirect to logged page'
        return redirect('/manage/',code=302)

    return render_template('login.html')



