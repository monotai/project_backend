
class UserController {
    // Get all users
    static async getAllUsers(req, res) {
        try {
            const users = await UserModel.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching users', error });
        }
    }

    // Get a user by ID
    static async getUserById(req, res) {
        try {
            const userId = req.params.id;
            const user = await UserModel.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching user', error });
        }
    }

    // Create a user
    static async createUser(req, res) {
        try {
            const newUser = new UserModel(req.body);
            await newUser.save();
            res.status(201).json(newUser);
        } catch (error) {
            res.status(400).json({ message: 'Error creating user', error });
        }
    }

    // Update a user
    static async updateUser(req, res) {
        try {
            const userId = req.params.id;
            const updatedUser = await UserModel.findByIdAndUpdate(
                userId,
                req.body,
                { new: true }
            );
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(400).json({ message: 'Error updating user', error });
        }
    }

    // Delete a user
    static async deleteUser(req, res) {
        try {
            const userId = req.params.id;
            const deletedUser = await UserModel.findByIdAndDelete(userId);
            if (!deletedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting user', error });
        }
    }
}
