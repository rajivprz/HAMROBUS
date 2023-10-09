import Book from "../models/bookingmodel.js";
import moment from "moment-timezone";

//create new booking
export const bookBus = async (req, res, next) => {
  console.log(req.body);
  try {
    const bookBus = new Book(req.body);
    const bookedBus = await bookBus.save();
    console.log(bookedBus);
    res.status(200).json(bookedBus);
  } catch (err) {
    next(err);
  }
};

//get single book
export const getBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    res.status(200).json(book);
  } catch (err) {
    next(err);
  }
};

//get all book
export const getallBook = async (req, res, next) => {
  try {
    const { bookingDate, userId, busId } = req.query;
    let startOfDay;
    let endOfDay;
    if (bookingDate) {
      startOfDay = moment(bookingDate).startOf("day");
      endOfDay = moment(bookingDate).endOf("day");
    }
    let filter = {};
    if (startOfDay && endOfDay) {
      filter = {
        date: {
          $gte: new Date(startOfDay).toISOString(),
          $lte: new Date(endOfDay).toISOString(),
        },
      };
    }
    if (userId) {
      filter.userId = userId;
    }
    if (busId) {
      filter.busId = busId;
    }
    const books = await Book.find(filter);
    return res.status(200).json(books);
  } catch (err) {
    next(err);
  }
};
export const deletebook = async (req, res, next) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json("Booking has been deleted");
  } catch (err) {
    next(err);
  }
};
export const updateBook = async (req, res, next) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedBook);
  } catch (err) {
    next(err);
  }
};
