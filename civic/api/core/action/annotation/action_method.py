from typing import Optional, List


def action_method(route: str, methods: Optional[List[str]] = None):
    if methods is None:
        methods = ['GET']
    def decorator(func):
        # 클래스의 action 데코레이터에서 설정된 route 정보를 가져오기 위해
        # 나중에 실제 등록 시점에 처리
        setattr(func, '_route', route)
        setattr(func, '_methods', methods)
        return func
    return decorator
