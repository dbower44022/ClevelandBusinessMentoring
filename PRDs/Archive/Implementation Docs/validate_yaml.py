#!/usr/bin/env python3
"""
Validate all CBM EspoCRM YAML implementation files against the JSON Schema.
Reports pass/fail for each file and lists all validation errors.
"""

import json
import yaml
import sys
from pathlib import Path
import jsonschema
from jsonschema import validate, ValidationError, Draft7Validator

IMPL_DIR = Path("/home/claude/ClevelandBusinessMentoring/PRDs/Implementation Docs")
SCHEMA_FILE = IMPL_DIR / "cbm_yaml_schema.json"

def load_schema():
    with open(SCHEMA_FILE) as f:
        return json.load(f)

def load_yaml(path):
    with open(path) as f:
        return yaml.safe_load(f)

def validate_file(path, schema):
    try:
        data = load_yaml(path)
    except yaml.YAMLError as e:
        return [f"YAML parse error: {e}"]

    validator = Draft7Validator(schema)
    errors = sorted(validator.iter_errors(data), key=lambda e: list(e.absolute_path))
    return [f"  [{' > '.join(str(p) for p in e.absolute_path) or 'root'}] {e.message}" for e in errors]

def main():
    schema = load_schema()
    yaml_files = sorted(IMPL_DIR.glob("*.yaml"))

    total = 0
    passed = 0
    all_errors = {}

    for f in yaml_files:
        total += 1
        errors = validate_file(f, schema)
        if errors:
            all_errors[f.name] = errors
            print(f"FAIL  {f.name}")
        else:
            passed += 1
            print(f"PASS  {f.name}")

    print(f"\n{'='*60}")
    print(f"Results: {passed}/{total} passed")

    if all_errors:
        print(f"\n{'='*60}")
        print("VALIDATION ERRORS\n")
        for filename, errors in all_errors.items():
            print(f"--- {filename} ---")
            for e in errors:
                print(e)
            print()

if __name__ == "__main__":
    main()
