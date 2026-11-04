"""Validate the fixed Ourbites ticket schema and references, never art quality."""
import argparse
import json
import math
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
SCHEMA = ROOT / 'skills/ourbites-creative-director/references/animation-tickets.schema.json'


def check_shape(value, schema, path='$'):
    """Offline subset used by our fixed schema; unsupported keywords fail closed.

    Not a general JSON Schema implementation. No network or schema resolution.
    """
    supported = {'$schema', 'title', 'type', 'enum', 'minimum', 'minLength', 'minItems',
                 'maxItems', 'items', 'properties', 'required', 'additionalProperties'}
    if set(schema) - supported:
        raise ValueError(f'{path}: unsupported schema keywords {set(schema) - supported}')
    kind = schema['type']
    valid = {'object': isinstance(value, dict), 'array': isinstance(value, list),
             'string': isinstance(value, str), 'integer': type(value) is int,
             'number': type(value) in (int, float) and math.isfinite(value)}
    if not valid.get(kind, False):
        raise ValueError(f'{path}: expected {kind}')
    if 'enum' in schema and value not in schema['enum']:
        raise ValueError(f'{path}: value outside enum')
    if 'minimum' in schema and value < schema['minimum']:
        raise ValueError(f'{path}: below minimum')
    if kind == 'string' and len(value.strip()) < schema.get('minLength', 0):
        raise ValueError(f'{path}: meaningful text required')
    if kind == 'object':
        if set(schema.get('required', [])) - value.keys():
            raise ValueError(f'{path}: missing required fields')
        if schema.get('additionalProperties') is False and value.keys() - schema['properties'].keys():
            raise ValueError(f'{path}: unexpected fields')
        for key, item in value.items():
            check_shape(item, schema['properties'][key], f'{path}.{key}')
    if kind == 'array':
        if not schema.get('minItems', 0) <= len(value) <= schema.get('maxItems', math.inf):
            raise ValueError(f'{path}: wrong item count')
        for index, item in enumerate(value):
            check_shape(item, schema['items'], f'{path}[{index}]')


def local_path(root, path):
    if not path or Path(path).is_absolute() or '\\' in path or ':' in path:
        raise ValueError('Expected repository-relative local path')
    resolved = (root / path).resolve()
    if not resolved.is_relative_to(root.resolve()):
        raise ValueError('Local path escapes repository')
    return resolved


def validate(data, root=ROOT):
    check_shape(data, json.loads(SCHEMA.read_text(encoding='utf-8')))
    if data['scenario_kind'] == 'existing-episode':
        manifest = json.loads(local_path(root, data['episode_manifest']).read_text(encoding='utf-8'))
        claims = {claim['id'] for claim in manifest['claims']}
        if data['synthetic_claim_ids']:
            raise ValueError('Real episode may not add synthetic claim IDs')
    else:
        claims = set(data['synthetic_claim_ids'])
        if data['episode_manifest'] or not claims:
            raise ValueError('Synthetic fixture needs explicit hypothetical claims and no real manifest')
    tickets = {ticket['id']: ticket for ticket in data['tickets']}
    if len(tickets) != len(data['tickets']):
        raise ValueError('Duplicate ticket ID')
    for ticket in tickets.values():
        if not set(ticket['claim_ids']) <= claims:
            raise ValueError(f"{ticket['id']}: unknown claim IDs")
        timing = ticket['timing']
        duration = timing['end_source_seconds'] - timing['start_source_seconds']
        if duration <= 0 or ticket['reading']['hold_seconds'] > duration:
            raise ValueError('Invalid cue interval or reading hold')
        motion = ticket['motion']
        if len(motion['spatial_path']) not in (1, 4):
            raise ValueError('Spatial path must be one hold point or four cubic control points')
        if not all(0 <= motion['temporal_bezier'][i] <= 1 for i in (0, 2)):
            raise ValueError('Temporal Bezier x controls must be in [0,1]')
        regions = []
        for name in ('caption_region', 'source_region'):
            x, y, w, h = ticket['reading'][name]
            if min(x, y) < 0 or min(w, h) <= 0 or x+w > data['canvas']['width'] or y+h > data['canvas']['height']:
                raise ValueError('Reading region outside canvas')
            regions.append((x, y, w, h))
        a, b = regions
        if a[0] < b[0]+b[2] and b[0] < a[0]+a[2] and a[1] < b[1]+b[3] and b[1] < a[1]+a[3]:
            raise ValueError('Caption and source regions overlap')
        transition = ticket['transition']
        target = tickets.get(transition['next_ticket'])
        if transition['type'] == 'end':
            if transition['next_ticket']:
                raise ValueError('End transition must not name a next ticket')
        elif not target or target is ticket:
            raise ValueError('Transition needs a different, known next ticket')
        if transition['type'] == 'continuity' and (not transition['shared_object'] or
                transition['shared_object'] != ticket['hero']['id'] or
                transition['shared_object'] != target['hero']['id']):
            raise ValueError('Continuity must name the shared hero in both tickets')
        if not ticket['assets'] and not ticket['no_external_assets_reason'].strip():
            raise ValueError('Explain why no external assets are needed')
        request_ids = set()
        for asset in ticket['assets']:
            if asset['request_id'] in request_ids:
                raise ValueError('Duplicate asset request within ticket')
            request_ids.add(asset['request_id'])
            if asset['local_path']:
                path = local_path(root, asset['local_path'])
                if asset['rights_status'] != 'approved' or not asset['evidence'].strip() or not path.is_file():
                    raise ValueError('Usable local asset requires declared approval, evidence and existing bytes')
            if asset['rights_status'] == 'approved' and (not asset['local_path'] or not asset['evidence'].strip()):
                raise ValueError('Declared approved asset lacks path/evidence')
    return len(tickets)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('tickets', type=Path)
    args = parser.parse_args()
    try:
        count = validate(json.loads(args.tickets.read_text(encoding='utf-8')))
    except (ValueError, OSError, KeyError) as error:
        print(f'Invalid tickets: {error}', file=sys.stderr)
        return 1
    print(f'Valid structure/references: {count} tickets. Claims, rights and visual quality still require review.')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
