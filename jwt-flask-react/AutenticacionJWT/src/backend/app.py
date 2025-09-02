import os
from datetime import timedelta
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from dotenv import load_dotenv
from flask_migrate import Migrate

from .extensions import db, bcrypt, jwt
from .models import User

load_dotenv()

migrate = Migrate()

def create_app():
    app = Flask(__name__)

    # Configuración
    app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", "dev-flask-secret")
    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "dev-jwt-secret")
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=2)
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL", "sqlite:///app.db")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # Extensiones
    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)

    frontend_origin = os.getenv("FRONTEND_ORIGIN", "*")
    CORS(app, resources={r"/api/*": {"origins": frontend_origin}})

    # ---------- Rutas ----------
    @app.get("/api/health")
    def health():
        return jsonify({"status": "ok"})

    @app.post("/api/signup")
    def signup():
        data = request.get_json() or {}
        email = (data.get("email") or "").strip().lower()
        password = data.get("password") or ""

        if not email or not password:
            return jsonify({"msg": "Email y contraseña son requeridos"}), 400
        if len(password) < 6:
            return jsonify({"msg": "La contraseña debe tener al menos 6 caracteres"}), 400
        if User.query.filter_by(email=email).first():
            return jsonify({"msg": "Ese email ya está registrado"}), 409

        user = User(email=email)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()

        return jsonify({"msg": "Usuario creado"}), 201

    @app.post("/api/login")
    def login():
        data = request.get_json() or {}
        email = (data.get("email") or "").strip().lower()
        password = data.get("password") or ""

        user = User.query.filter_by(email=email).first()
        if not user or not user.check_password(password):
            return jsonify({"msg": "Credenciales inválidas"}), 401

        token = create_access_token(identity={"id": user.id, "email": user.email})
        return jsonify({"access_token": token})

    @app.get("/api/me")
    @jwt_required()
    def me():
        return jsonify(get_jwt_identity())

    @app.get("/api/private")
    @jwt_required()
    def private():
        who = get_jwt_identity()
        return jsonify({"message": "Contenido privado", "user": who})

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
