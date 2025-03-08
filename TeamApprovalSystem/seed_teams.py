from database import teams_collection  # Import from database.py

# ✅ Insert sample teams into the database
teams_collection.insert_many([
    {
        "_id": "team1",
        "skills": ["Python", "Machine Learning", "Web Development"],
        "approved": False
    },
    {
        "_id": "team2",
        "skills": ["JavaScript", "React", "UI/UX"],
        "approved": False
    }
])

print("✅ Sample teams added successfully!")
