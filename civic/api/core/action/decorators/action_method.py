def action_method(path: str = '', methods=None):
    methods = methods or ['GET']
    def decorator(fn):
        fn.__method_meta__ = { 'path': path, 'methods': methods }
        return fn
    return decorator