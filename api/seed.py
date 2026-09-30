from sqlmodel import Session
from database import engine
from models import Task

def seed_database():
    print("Starting database seeding...")
    
    # Create a session
    with Session(engine) as session:
        # Check if data already exists (prevents duplicate seeding)
        existing_tasks = session.query(Task).all()
        if existing_tasks:
            print("Database already contains data. Seeding skipped.")
            return

        # Define sample tasks
        tasks = [
            Task(title="Set up FastAPI project", description="Create base structure and folders", completed=True),
            Task(title="Test MariaDB connection", description="Verify credentials in database.py", completed=True),
            Task(title="Configure Alembic migrations", description="Update env.py with hook", completed=True),
            Task(title="Connect frontend", description="Plan the next milestone", completed=False),
        ]

        # Add to session and commit
        for task in tasks:
            session.add(task)
        
        session.commit()
        print(f"Successfully inserted {len(tasks)} tasks!")

if __name__ == "__main__":
    seed_database()