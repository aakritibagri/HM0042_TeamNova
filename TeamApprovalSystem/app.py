from flask import Flask, request, jsonify
from flask_cors import CORS
from database import teams_collection, hackathons_collection
import nltk
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)
CORS(app)  # Enable frontend-backend communication

# ✅ Approve Team & Store Approval
@app.route("/approve-team", methods=["POST"])
def approve_team():
    data = request.json
    team_id = data.get("team_id")
    approval = data.get("approval")

    if not team_id or approval is None:
        return jsonify({"error": "Missing team ID or approval"}), 400

    if approval:
        teams_collection.update_one({"_id": team_id}, {"$set": {"approved": True}})
        return recommend_hackathons(team_id)  # Redirect to recommendations

    return jsonify({"message": "Team approval declined"}), 200

# ✅ Recommend Hackathons Based on Team Skills
def recommend_hackathons(team_id):
    team = teams_collection.find_one({"_id": team_id})
    if not team:
        return jsonify({"error": "Team not found"}), 404

    team_skills = " ".join(team["skills"])  # Combine skills into text
    hackathons = list(hackathons_collection.find())

    if not hackathons:
        return jsonify({"message": "No hackathons found"}), 404

    # Convert hackathon categories into text format
    hackathon_texts = [hack["category"] for hack in hackathons]

    # ✅ Use TF-IDF to measure skill-hackathon relevance
    vectorizer = TfidfVectorizer()
    vectors = vectorizer.fit_transform([team_skills] + hackathon_texts)
    team_vector = vectors[0]
    hackathon_vectors = vectors[1:]

    # ✅ Compute similarity scores
    similarities = cosine_similarity(team_vector, hackathon_vectors).flatten()

    # ✅ Sort and return top hackathons
    recommended_hackathons = sorted(
        zip(hackathons, similarities), key=lambda x: x[1], reverse=True
    )[:5]

    return jsonify({
        "message": "Hackathons recommended successfully",
        "recommendations": [
            {"name": hack[0]["name"], "category": hack[0]["category"], "similarity": hack[1]}
            for hack in recommended_hackathons
        ],
    })

if __name__ == "__main__":
    app.run(debug=True)
