from pydantic import BaseModel

class PersonInfo(BaseModel):
    name : str | None = None
    age : int | None = None
    job_title : str | None = None
    company : str | None = None
    city : str | None = None