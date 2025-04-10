# Date.py

class Date:
    def __init__(self, month, day, year):
        self.month = month
        self.day = day
        self.year = year
    
    def __str__(self):
        return (str(self.month)+"/"+str(self.day)+"/"+str(self.year))
    
    def to_dict(self):
        return {
            'month': self.month,
            'day': self.day,
            'year': self.year
        }

    @classmethod
    def from_dict(cls, data):
        return cls(data['month'], data['day'], data['year'])

