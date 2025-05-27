import os

import yaml

class Setting:
    is_live: bool = False
    config: dict = {}

    @staticmethod
    def init(env: str = None):
        """
        Initialize settings from a YAML file.
        Args:
            env: environment name (e.g. 'dev', 'prod'). If None, reads ENV['ENV'] or defaults to 'dev'.
        """
        # Determine environment
        env = env or os.getenv('ENV', 'dev')
        # Build path to config file
        base_dir = os.getcwd()
        config_path = os.path.join(base_dir, 'properties', f"{env}.yaml")

        # Load YAML
        try:
            with open(config_path, 'r') as f:
                Setting.config = yaml.safe_load(f)
        except FileNotFoundError:
            raise RuntimeError(f"Config file not found: {config_path}")

        # Populate is_live flag
        Setting.is_live = bool(Setting.config.get('is_live', False))

    @staticmethod
    def get(path: str, default=None):
        """
        Retrieve a nested config value by dot-separated path.

        Example: Setting.get('server.port')
        """
        keys = path.split('.')
        cfg = Setting.config
        for key in keys:
            if not isinstance(cfg, dict) or key not in cfg:
                return default
            cfg = cfg[key]
        return cfg
