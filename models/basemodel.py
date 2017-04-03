from peewee import *
from filereader import FileReader


fileread = FileReader()
database_name = fileread.database_name()
database_user = fileread.database_user()


db = PostgresqlDatabase(database_name, user=database_user)


class BaseModel(Model):

    class Meta:
        database = db
