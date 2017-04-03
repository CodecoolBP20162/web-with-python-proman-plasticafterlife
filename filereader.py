import os
current_file_path = os.path.dirname(os.path.abspath(__file__))


class FileReader():

    def __init__(self, filename=(current_file_path + "/self.txt")):
        with open(filename, "r") as file:
            line = file.readlines()[0]

        self.user_data = line.replace(" ", "").split(",")

    def database_name(self):
        return self.user_data[0]

    def database_user(self):
        return self.user_data[1].rstrip('\n')
