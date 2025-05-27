import inspect
from functools import wraps
from typing import Callable, List


class ActionRegistry:
    _actions = {}

    @classmethod
    def register(cls, route: str, methods: List[str], is_class: bool = False):
        def decorator(f: Callable):
            if is_class:
                # 클래스 데코레이터인 경우
                class_wrapper = f()

                # 클래스의 모든 메서드를 검사
                for name, method in inspect.getmembers(class_wrapper, inspect.ismethod):
                    if hasattr(method, '_route'):
                        # action_method 데코레이터가 적용된 메서드를 찾아서 처리
                        method_route = method._route
                        method_methods = method._methods

                        # 상위 route와 하위 route를 결합
                        full_route = f'/{route}/{method_route}'.replace('//', '/').rstrip('/')
                        if not full_route:
                            full_route = '/'

                        @wraps(method)
                        def method_wrapper(*args, **kwargs):
                            return method(*args, **kwargs)

                        cls._actions[full_route] = {
                            'handler': method_wrapper,
                            'methods': method_methods
                        }

                return class_wrapper
            else:
                # 일반 함수 데코레이터인 경우
                @wraps(f)
                def wrapper(*args, **kwargs):
                    return f(*args, **kwargs)

                cls._actions[route] = {'handler': wrapper, 'methods': methods}
                return wrapper

        return decorator

    @classmethod
    def get_actions(cls):
        return cls._actions
