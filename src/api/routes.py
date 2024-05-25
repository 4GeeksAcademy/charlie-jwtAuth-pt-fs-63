"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt


api = Blueprint('api', __name__)

app = Flask(__name__)
bcrypt = Bcrypt(app)

# Allow CORS requests to this API
CORS(api)
CORS(app, resources={r"/api/*": {"origins": "https://cautious-space-fiesta-576v56pv6943v466-3000.app.github.dev"}})
bcrypt = Bcrypt(app)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/token', methods=['GET', 'POST'])
def create_token():
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    user = User.query.filter_by(email = email).first()
    token = create_access_token(identity = user.id)

    if user and bcrypt.check_password_hash(user.password, password):
        token = create_access_token(identity=user.id)
        return jsonify({'token': token, 'user': user.serialize()}), 200
    else:
        return jsonify({'message': 'Invalid email or password'}), 401

@api.route('/user', methods=['GET'])
@jwt_required()
def get_user():
    id_user = get_jwt_identity()
    user = User.query.get(id_user)
    user=user.serialize()

    return jsonify({"user": user})

@api.route('/user', methods=['POST'])
def create_user():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    is_active = data.get('active')

    if not email or not password:
        return jsonify({'message': 'Username and password are required'}), 400
    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'User already exists'}), 400
    
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(email=email, password=hashed_password, is_active=is_active)

    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'An error occurred', 'error': str(e)}), 500

    return jsonify(new_user.serialize()), 201