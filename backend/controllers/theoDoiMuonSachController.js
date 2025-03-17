import TheoDoiMuonSach from '../models/TheoDoiMuonSach.js';
import Sach from '../models/Sach.js';
import DocGia from '../models/DocGia.js';
import mongoose from 'mongoose';

export const getAllMuonSach = async (req, res) => {
  try {
    const muonSachs = await TheoDoiMuonSach.find()
      .populate('MaDocGia', 'MaDocGia HoLot Ten')
      .populate('MaSach', 'MaSach TenSach TacGia')
      .populate('MSNV', 'MSNV HoTenNV')
      .sort({ NgayMuon: -1 });
    res.status(200).json({
      success: true,
      count: muonSachs.length,
      data: muonSachs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Không thể lấy danh sách mượn sách',
      error: error.message
    });
  }
};

export const getMuonSachById = async (req, res) => {
  try {
    const muonSach = await TheoDoiMuonSach.findById(req.params.id)
      .populate('MaDocGia', 'HoLot Ten DiaChi DienThoai')
      .populate('MaSach', 'TenSach TacGia DonGia NamXuatBan');
    
    if (!muonSach) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy phiếu mượn sách'
      });
    }
    
    res.status(200).json({
      success: true,
      data: muonSach
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Không thể lấy thông tin phiếu mượn sách',
      error: error.message
    });
  }
};

export const createMuonSach = async (req, res) => {
  try {
    const { MaDocGia, MaSach } = req.body;

    if (!MaDocGia || !MaSach) {
      return res.status(400).json({
        success: false,
        message: 'Thiếu thông tin MaDocGia hoặc MaSach',
      });
    }

    const maDocGia = MaDocGia.MaDocGia;
    const maSach = MaSach.MaSach;

    const docGia = await DocGia.findOne({ MaDocGia: maDocGia });
    const sach = await Sach.findOne({ MaSach: maSach });
    const nhanVien = req.nhanVien;

    if (!docGia) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy độc giả',
      });
    }

    if (!sach) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy sách',
      });
    }

    const newMuonSach = new TheoDoiMuonSach({
      MaDocGia: new mongoose.Types.ObjectId(docGia._id),
      MaSach: new mongoose.Types.ObjectId(sach._id), 
      MSNV: new mongoose.Types.ObjectId(nhanVien._id),
      NgayMuon: new Date(),
    });

    sach.SoQuyen -= 1;

    await newMuonSach.save();
    sach.save();


    return res.status(201).json({
      success: true,
      message: 'Tạo bản ghi mượn sách thành công',
      data: newMuonSach,
    });
  } catch (error) {
    console.error('Lỗi khi tạo bản ghi mượn sách:', error);
    return res.status(500).json({
      success: false,
      message: 'Đã xảy ra lỗi khi tạo bản ghi mượn sách',
      error: error.message,
    });
  }
};

export const returnBook = async (req, res) => {
  try {
    const muonSach = await TheoDoiMuonSach.findById(req.params.id);
    const sach = await Sach.findById(muonSach.MaSach);
    if (!muonSach) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy phiếu mượn sách'
      });
    }
    
    if (muonSach.NgayTra) {
      return res.status(400).json({
        success: false,
        message: 'Sách đã được trả'
      });
    }
    
    muonSach.NgayTra = new Date();
    
    sach.SoQuyen += 1;

    await muonSach.save();
    sach.save();

    
    res.status(200).json({
      success: true,
      message: 'Trả sách thành công',
      data: muonSach
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Không thể trả sách',
      error: error.message
    });
  }
};

export const deleteMuonSach = async (req, res) => {
  try {
    const muonSach = await TheoDoiMuonSach.findByIdAndDelete(req.params.id);
    const sach = await Sach.findById(muonSach.MaSach);
    sach.SoQuyen += 1;
    
    if (!muonSach) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy phiếu mượn sách'
      });
    }
    
    await sach.save();
    
    res.status(200).json({
      success: true,
      message: 'Xóa phiếu mượn sách thành công',
      data: muonSach
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Không thể xóa phiếu mượn sách',
      error: error.message    
    });
  }
};