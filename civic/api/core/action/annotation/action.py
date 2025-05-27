from typing import List, Optional

from core.action.annotation import ActionRegistry


def action(route: str, methods: Optional[List[str]] = None):
    if methods is None:
        methods = ['GET']
    return ActionRegistry.register(route, methods, is_class=True)
