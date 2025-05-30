import importlib
import inspect
import os
import pkgutil
from pathlib import Path

from core.action.request import Request
from core.server.http_server import HttpServer


class ActionControl:
    base_path = '/seoul/'

    @staticmethod
    def init(package: str = 'app.action'):
        try:
            pkg = importlib.import_module(package)
            project_root = Path(os.getcwd())
            pkg_dir = project_root / 'app' / 'action'

            if not pkg_dir.exists():
                raise RuntimeError(f"Action directory not found: {pkg_dir}")

            # 모듈들을 저장할 리스트
            loaded_modules = []

            for finder, mod_name, is_pkg in pkgutil.iter_modules([str(pkg_dir)]):
                # 각 모듈을 임포트하고 리스트에 저장
                module = importlib.import_module(f"{package}.{mod_name}")
                loaded_modules.append(module)

            for module in loaded_modules:
                for _, cls in inspect.getmembers(module, inspect.isclass):
                    meta = getattr(cls, '__action_meta__', None)
                    if not meta:
                        continue
                    instance = cls()
                    class_path = meta.get('path', '')
                    for name, method in inspect.getmembers(cls, predicate=inspect.isfunction):
                        mmeta = getattr(method, '__method_meta__', None)
                        if not mmeta:
                            continue

                        full_path = ActionControl.base_path + class_path + '/' + mmeta['path']
                        endpoint = f"{cls.__name__}.{name}"

                        def make_view(func):
                            def view(**kwargs):
                                req = Request()
                                result = None
                                try:
                                    result = func(instance, req, **kwargs)
                                    req.commit()
                                except Exception as e:
                                    req.rollback()
                                    result = '500Error'
                                    print(e)
                                finally:
                                    req.close()
                                return result

                            return view

                        view_func = make_view(method)
                        HttpServer.app.add_url_rule(full_path, endpoint, view_func, methods=mmeta['methods'])

                        if full_path.endswith('/'):
                            HttpServer.app.add_url_rule(full_path[:-1], endpoint, view_func, methods=mmeta['methods'])

        except Exception as e:
            print(f"Error initializing actions: {e}")
            raise