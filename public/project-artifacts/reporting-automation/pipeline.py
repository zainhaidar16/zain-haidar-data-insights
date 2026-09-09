"""Small-file reporting demonstration. Synthetic sample data; Python standard library only."""
import csv, hashlib, io, json, os, tempfile
from collections import defaultdict
from datetime import date
from pathlib import Path

def atomic_json(path, data):
    handle, temporary = tempfile.mkstemp(dir=path.parent, prefix=path.name, suffix='.tmp')
    try:
        with os.fdopen(handle,'w',encoding='utf-8') as stream:
            json.dump(data,stream,indent=2,sort_keys=True)
            stream.write('\n')
            stream.flush(); os.fsync(stream.fileno())
        os.replace(temporary,path)
    finally:
        if os.path.exists(temporary): os.unlink(temporary)

def run(input_dir,output_dir):
    input_dir,output_dir=Path(input_dir),Path(output_dir)
    output_dir.mkdir(parents=True,exist_ok=True)
    lock=output_dir/'.running'
    try: descriptor=os.open(lock,os.O_CREAT|os.O_EXCL|os.O_WRONLY)
    except FileExistsError: raise RuntimeError('Another run may be active. If a process crashed, verify it stopped before removing .running.')
    os.close(descriptor)
    try:
        state_path=output_dir/'state.json'
        state=json.loads(state_path.read_text()) if state_path.exists() else {'files':{},'orders':{},'rejected':[]}
        changed=0
        paths=sorted(input_dir.glob('*.csv'))
        if not paths: raise ValueError('No CSV input files found.')
        for path in paths:
            raw=path.read_bytes(); digest=hashlib.sha256(raw).hexdigest()
            if path.name in state['files']:
                if state['files'][path.name]!=digest: raise ValueError('An ingested file changed: '+path.name+'. Inputs are immutable; restore it or rebuild into a new output directory.')
                continue
            reader=csv.DictReader(io.StringIO(raw.decode('utf-8-sig')))
            if reader.fieldnames!=['order_id','order_date','amount_cents']:
                raise ValueError('Unexpected CSV schema: '+path.name)
            for line,row in enumerate(reader,2):
                try:
                    if None in row or any(value is None for value in row.values()): raise ValueError('Wrong number of fields')
                    order_id=row['order_id'].strip()
                    if not order_id: raise ValueError('Missing order ID')
                    day=date.fromisoformat(row['order_date']).isoformat()
                    amount=int(row['amount_cents'])
                    if amount<0: raise ValueError('Negative amount')
                    if order_id in state['orders']: raise ValueError('Duplicate order ID')
                    state['orders'][order_id]={'date':day,'amount_cents':amount}
                except (ValueError,TypeError) as error:
                    state['rejected'].append({'file':path.name,'line':line,'reason':str(error),'row':row})
            state['files'][path.name]=digest; changed+=1
        monthly=defaultdict(lambda:{'orders':0,'amount_cents':0})
        for order in state['orders'].values():
            bucket=monthly[order['date'][:7]];bucket['orders']+=1;bucket['amount_cents']+=order['amount_cents']
        report={'accepted_orders':len(state['orders']),'rejected_rows':len(state['rejected']),'source_files':len(state['files']),'monthly':dict(monthly)}
        # State is the source of truth. A rerun regenerates the report after an interrupted export.
        atomic_json(state_path,state);atomic_json(output_dir/'report.json',report)
        return {'new_files':changed,**report}
    finally: lock.unlink()

if __name__=='__main__':
    import argparse,sys
    parser=argparse.ArgumentParser();parser.add_argument('input');parser.add_argument('output');args=parser.parse_args()
    try: print(json.dumps(run(args.input,args.output),indent=2))
    except (ValueError,RuntimeError,OSError) as error: print(str(error),file=sys.stderr);sys.exit(1)
