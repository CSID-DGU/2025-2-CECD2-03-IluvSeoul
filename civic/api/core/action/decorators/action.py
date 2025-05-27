def action(path: str = ''):
    def decorator(cls):
        cls.__action_meta__ = { 'path': path }
        return cls
    return decorator
