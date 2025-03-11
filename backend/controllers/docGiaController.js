import DocGia from '../models/DocGia.js';
import TheoDoiMuonSach from '../models/TheoDoiMuonSach.js';

export const getAllDocGia = async (req, res) => {
  try {
    const docGias = await DocGia.find();
    res.status(200).json({
      success: true,
      count: docGias.length,
      data: docGias
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Không thể lấy danh sách độc giả',
      error: error.message
    });
  }
};

export const getDocGiaById = async (req, res) => {
  try {
    const docGia = await DocGia.findById(req.params.id);
    
    if (!docGia) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy độc giả'
      });
    }
    
    res.status(200).json({
      success: true,
      data: docGia
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Không thể lấy thông tin độc giả',
      error: error.message
    });
  }
};

export const createDocGia = async (req, res) => {
  try {
    const newDocGia = new DocGia(req.body);
    await newDocGia.save();
    
    res.status(201).json({
      success: true,
      message: 'Tạo độc giả thành công',
      data: newDocGia
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Không thể tạo độc giả',
      error: error.message
    });
  }
};

export const updateDocGia = async (req, res) => {
  try {
    const docGia = await DocGia.findOneAndUpdate(
      { MaDocGia: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!docGia) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy độc giả'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Cập nhật độc giả thành công',
      data: docGia
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Không thể cập nhật độc giả',
      error: error.message
    });
  }
};

export const deleteDocGia = async (req, res) => {
  try {
    const borrowings = await TheoDoiMuonSach.find({
      MaDocGia: req.params.id,
      TrangThai: 'Đang mượn'
    });
    
    if (borrowings.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Không thể xóa độc giả đang mượn sách'
      });
    }
    
    const docGia = await DocGia.findOneAndDelete({ MaDocGia: req.params.id });
    
    if (!docGia) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy độc giả'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Xóa độc giả thành công'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Không thể xóa độc giả',
      error: error.message
    });
  }
};

export const getDocGiaBorrowHistory = async (req, res) => {
  try {
    const borrowHistory = await TheoDoiMuonSach.find({ MaDocGia: req.params.id })
      .populate('MaSach', 'TenSach TacGia')
      .sort({ NgayMuon: -1 });
    
    res.status(200).json({
      success: true,
      count: borrowHistory.length,
      data: borrowHistory
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Không thể lấy lịch sử mượn sách',
      error: error.message
    });
  }
};

export const searchDocGia = async (req, res) => {
  try {
    const { keyword } = req.query;
    
    if (!keyword) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng cung cấp từ khóa tìm kiếm'
      });
    }
    
    const docGias = await DocGia.find({
      $or: [
        { HoLot: { $regex: keyword, $options: 'i' } },
        { Ten: { $regex: keyword, $options: 'i' } },
        { DiaChi: { $regex: keyword, $options: 'i' } },
        { DienThoai: { $regex: keyword, $options: 'i' } },
        { MaDocGia: { $regex: keyword, $options: 'i' } }
      ]
    });
    
    res.status(200).json({
      success: true,
      count: docGias.length,
      data: docGias
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Không thể tìm kiếm độc giả',
      error: error.message
    });
  }
};