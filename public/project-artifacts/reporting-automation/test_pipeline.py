import tempfile,unittest
from pathlib import Path
from pipeline import run
class PipelineTests(unittest.TestCase):
 def test_rerun_increment_and_bad_batch_rollback(self):
  with tempfile.TemporaryDirectory() as folder:
   base=Path(folder);inputs=base/'in';inputs.mkdir();outputs=base/'out'
   (inputs/'a.csv').write_text('order_id,order_date,amount_cents\nA,2026-01-02,100\nA,2026-01-02,100\nB,bad,200\n')
   first=run(inputs,outputs);self.assertEqual(first['accepted_orders'],1);self.assertEqual(first['rejected_rows'],2)
   before=(outputs/'state.json').read_bytes();self.assertEqual(run(inputs,outputs)['new_files'],0);self.assertEqual((outputs/'state.json').read_bytes(),before)
   (inputs/'b.csv').write_text('order_id,order_date,amount_cents\nC,2026-02-02,250\n')
   self.assertEqual(run(inputs,outputs)['accepted_orders'],2)
   committed=(outputs/'state.json').read_bytes()
   (inputs/'c.csv').write_text('wrong,schema\n1,2\n')
   with self.assertRaisesRegex(ValueError,'schema'):run(inputs,outputs)
   self.assertEqual((outputs/'state.json').read_bytes(),committed)
 def test_modified_input_is_rejected(self):
  with tempfile.TemporaryDirectory() as folder:
   base=Path(folder);inputs=base/'in';inputs.mkdir();outputs=base/'out';source=inputs/'a.csv'
   source.write_text('order_id,order_date,amount_cents\nA,2026-01-02,100\n');run(inputs,outputs)
   source.write_text('order_id,order_date,amount_cents\nA,2026-01-02,200\n')
   with self.assertRaisesRegex(ValueError,'changed'):run(inputs,outputs)
if __name__=='__main__':unittest.main()
