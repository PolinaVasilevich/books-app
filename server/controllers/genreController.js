const Genre = require("../models/Genre");
const Book = require("../models/Book");

class genreController {
  async createGenre(req, res) {
    try {
      const { name } = req.body;
      const genreBook = await Genre.findOne({
        name,
      });
      if (genreBook) {
        return res
          .status(400)
          .json({ message: "This genre has already been created" });
      }

      const genre = new Genre({ name });
      await genre.save();
      return res.json({ message: "Genre has created" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Create genre error" });
    }
  }

  async getGenres(req, res) {
    try {
      const genres = await Genre.find();
      res.json(genres);
    } catch (e) {
      console.log(e);
    }
  }

  async updateGenre(req, res) {
    const { id } = req.params;
    try {
      await Genre.findOneAndUpdate({ _id: id }, req.body, { new: true });
      res.json({
        message: "Genre was updated successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: `Cannot update genre with id: ${id}` });
    }
  }

  async deleteGenre(req, res) {
    const { id } = req.params;
    try {
      const book = await Book.findOne({
        author: id,
      });

      if (!book) {
        const genre = await Genre.findByIdAndDelete({ _id: id });
        return res.json({
          message: `${genre.name} were deleted successfully!`,
        });
      } else {
        return res.status(400).json({
          message: `Genre can't be deleted. This entry is linked with ${book.title}!`,
        });
      }
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: `Cannot delete genre with id ${id}` });
    }
  }

  async deleteManyGenres(req, res) {
    try {
      const { ids } = req.body;
      const book = await Book.findOne({
        author: { $in: ids },
      });

      if (!book) {
        await Genre.deleteMany({
          _id: { $in: ids },
        });
        return res.json({
          message: `Genres with ids [${ids}] were deleted successfully!`,
        });
      } else {
        return res.status(400).json({
          message: `Author can't be deleted. This entry is linked with ${book.title}!`,
        });
      }
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: `Cannot delete genres` });
    }
  }
}

module.exports = new genreController();
