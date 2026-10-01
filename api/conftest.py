from database.seed import seed_database

def pytest_sessionfinish(session, exitstatus):
    seed_database()