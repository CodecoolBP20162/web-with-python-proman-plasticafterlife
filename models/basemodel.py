from peewee import *
from filereader import FileReader


fileread = FileReader()
database_name = fileread.database_name()
database_user = fileread.database_user()


db = PostgresqlDatabase(database_name, user=database_user,
                        password="a21add82ac8665df2664ca79e334c99fd8728cd04840bc6ab4a9b43be053c777",
                        host="ec2-79-125-118-221.eu-west-1.compute.amazonaws.com")


class BaseModel(Model):

    class Meta:
        database = db
