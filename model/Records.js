import { model, models, Schema } from 'mongoose';

const recordSchema = new Schema({
  cveId: {
    type: String,
    required: true,
    unique: true
  },
  severity: {
    type: String,
    required: true
  },
  cvss: {
    type: Number,
    required: true
  },
  affectedPackages: {
    type: String,
    required: true
  },
  cweId: {
    type: String,
    required: true
  }
});

const Record = models.Record || model('Record', recordSchema);

export default Record;



