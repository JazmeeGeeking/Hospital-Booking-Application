const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hospital-appointment')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Models
const User = require('./models/User');
const Doctor = require('./models/Doctor');
const Appointment = require('./models/Appointment');

// Middleware for authentication
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const user = await User.findOne({ _id: decoded.id });
    
    if (!user) {
      throw new Error();
    }
    
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate' });
  }
};

// Auth endpoints
app.post('/api/v1/auth/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName
    });
    
    await user.save();
    
    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'your-secret-key');
    
    res.status(201).json({ token, user: { id: user._id, email, firstName, lastName } });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
});

app.post('/api/v1/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'your-secret-key');
    
    res.json({ token, user: { id: user._id, email, firstName: user.firstName, lastName: user.lastName } });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
});

// Doctor endpoints
app.get('/api/v1/doctors', async (req, res) => {
  try {
    const { specialization, search, page = 1, limit = 10 } = req.query;
    
    const query = {};
    if (specialization) {
      query.specialization = specialization;
    }
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } }
      ];
    }
    
    const doctors = await Doctor.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    
    const total = await Doctor.countDocuments(query);
    
    res.json({ doctors, total });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctors' });
  }
});

app.get('/api/v1/doctors/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctor' });
  }
});

// Appointment endpoints
app.get('/api/v1/appointments', auth, async (req, res) => {
  try {
    const { status, startDate, endDate } = req.query;
    
    const query = { patientId: req.user._id };
    if (status && status !== 'all') {
      query.status = status;
    }
    if (startDate && endDate) {
      query.date = { $gte: startDate, $lte: endDate };
    }
    
    const appointments = await Appointment.find(query)
      .populate('doctor', 'firstName lastName specialization avatar');
    
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments' });
  }
});

app.post('/api/v1/appointments', auth, async (req, res) => {
  try {
    const { doctorId, date, timeSlot, reason, notes } = req.body;
    
    const appointment = new Appointment({
      doctorId,
      patientId: req.user._id,
      date,
      timeSlot,
      reason,
      notes,
      status: 'pending'
    });
    
    await appointment.save();
    
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating appointment' });
  }
});

app.post('/api/v1/appointments/:id/cancel', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      _id: req.params.id,
      patientId: req.user._id
    });
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    appointment.status = 'cancelled';
    await appointment.save();
    
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling appointment' });
  }
});

app.post('/api/v1/appointments/:id/reschedule', auth, async (req, res) => {
  try {
    const { date, timeSlot } = req.body;
    
    const appointment = await Appointment.findOne({
      _id: req.params.id,
      patientId: req.user._id
    });
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    appointment.date = date;
    appointment.timeSlot = timeSlot;
    appointment.status = 'pending';
    await appointment.save();
    
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Error rescheduling appointment' });
  }
});

// Availability endpoints
app.get('/api/v1/doctors/:id/availability/:date', async (req, res) => {
  try {
    const { id, date } = req.params;
    
    // Get all appointments for the doctor on the given date
    const appointments = await Appointment.find({
      doctorId: id,
      date,
      status: { $in: ['confirmed', 'pending'] }
    });
    
    // Generate time slots (9 AM to 5 PM, 30-minute intervals)
    const timeSlots = [];
    for (let hour = 9; hour <= 17; hour++) {
      for (let minute of ['00', '30']) {
        const time = `${hour}:${minute} ${hour < 12 ? 'AM' : 'PM'}`;
        const isBooked = appointments.some(apt => apt.timeSlot === time);
        
        timeSlots.push({
          time,
          available: !isBooked
        });
      }
    }
    
    res.json(timeSlots);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching availability' });
  }
});

app.post('/api/v1/doctors/:id/availability/days', async (req, res) => {
  try {
    const { id } = req.params;
    const { startDate, endDate } = req.body;
    
    // Get all appointments for the doctor in the date range
    const appointments = await Appointment.find({
      doctorId: id,
      date: { $gte: startDate, $lte: endDate },
      status: { $in: ['confirmed', 'pending'] }
    });
    
    // Generate day slots
    const daySlots = [];
    const currentDate = new Date(startDate);
    const end = new Date(endDate);
    
    while (currentDate <= end) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const appointmentsForDay = appointments.filter(apt => apt.date === dateStr);
      
      daySlots.push({
        date: currentDate,
        day: currentDate.toLocaleDateString('en-US', { weekday: 'short' }),
        formattedDate: currentDate.toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'short'
        }),
        available: appointmentsForDay.length < 16 // Assuming 16 slots per day (8 hours * 2 slots per hour)
      });
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    res.json(daySlots);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching availability' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 