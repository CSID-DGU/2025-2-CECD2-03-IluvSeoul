from enum import Enum


class TagEnum(Enum):
    what = 0
    where = 1
    how = 2

    def __str__(self):
        return self.name

    @staticmethod
    def values():
        return [TagEnum.what, TagEnum.where, TagEnum.how]

    @staticmethod
    def from_str(s: str):
        return TagEnum[s]

    def __lt__(self, other: 'TagEnum'):
        return self.value < other.value