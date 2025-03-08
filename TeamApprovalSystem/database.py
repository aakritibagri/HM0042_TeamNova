from pymongo import MongoClient
import config

# ✅ Connect to MongoDB
client = MongoClient(config.MONGO_URI)
db = client[config.DATABASE_NAME]

# ✅ Define collections
teams_collection = db["teams"]
hackathons_collection = db["hackathons"]
