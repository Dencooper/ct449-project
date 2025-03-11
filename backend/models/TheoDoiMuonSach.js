import mongoose from 'mongoose';

const theoDoiMuonSachSchema = new mongoose.Schema({
  MaDocGia: {
    type: String,
    required: true,
    ref: 'DocGia'
  },
  MaSach: {
    type: String,
    required: true,
    ref: 'Sach'
  },
  NgayMuon: {
    type: Date,
    required: true,
    default: Date.now
  },
  NgayTra: {
    type: Date
  }
}, {
  timestamps: true
});

const TheoDoiMuonSach = mongoose.model('TheoDoiMuonSach', theoDoiMuonSachSchema);

export default TheoDoiMuonSach;