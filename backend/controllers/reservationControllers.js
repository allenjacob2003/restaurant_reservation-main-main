import reservationModel from "../models/reservationModels.js";


const createReservation = async (req, res) => {
    try {
        const { name, email, phone, date, time, guests } = req.body;
        const userId = req.params.id;
        if (!name || !email || !phone || !date || !time || !guests) {
            res.json({ success: false, message: "Please fill all the fields" });
        }

        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const newreservation = new reservationModel({
            user: userId,
            name: name,
            email: email,
            phone: phone,
            date: date,
            time: time,
            guests: guests
        })
        await newreservation.save();
        if (newreservation) {
            return res.status(200).json({ message: "Seats Reserved Successfuly" })
        }
    } catch (error) {
        console.log(error);
        res.json({ message: error.message });
    }

}

const getAllReservation = async (req, res) => {
    try {
        const reservations = await reservationModel.find();
        return res.json(reservations);
    } catch (error) {
        console.log(error);
        res.json({ message: "error fetching reservations" });
    }

}

const deleteReservation = async (req, res) => {
    try {
        const { id } = req.params;
        await reservationModel.findByIdAndDelete(id);
        res.json({ message: "Reservation deleted successfully" });
    } catch (error) {
        console.log(error);
        res.json({ message: "error deleting reservation" });
    }

}

const getUserReservation = async (req, res) => {
    const userId = req.params.userId;
    try {
        const reservations = await reservationModel.find({ user: userId })
        if (reservations) {
            return res.status(200).json(reservations)
        } else {
            return res.status(404).json({ message: "No Reservations Founded" })
        }
    } catch (error) {
        res.json({ message: "error fetching reservations" });
    }
}

export { createReservation, getAllReservation, deleteReservation, getUserReservation }