import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export const userSchema = new mongoose.Schema(
    {
        _id: { type: String, default: () => uuidv4().replace(/\-/g, '') },
        displayName: String,
        email: String,
        photoUrl: String,
        groupName: String,
    },
    {
        timestamps: true,
        collection: 'users',
    }
);

/**
 * @param {String} displayName
 * @param {String} email
 * @param {String} photoUrl
 * @returns {Object} new user object created
 */
userSchema.statics.createUser = async function (displayName, email) {
    try {
        const user = await this.create({
            displayName,
            email,
        });
        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

/**
 * @param {String} id, user id
 * @return {Object} User profile object
 */
userSchema.statics.getUserById = async function (id) {
    try {
        const user = await this.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        throw error;
    }
};

/**
 * @return {Array} List of all users
 */
userSchema.statics.getUsers = async function () {
    try {
        const users = await this.find({});
        return users;
    } catch (error) {
        throw error;
    }
};

/**
 * @param {Array} ids, string of user ids
 * @return {Array of Objects} users list
 */
userSchema.statics.getUsersByIds = async function (ids) {
    try {
        const users = await this.find({ _id: { $in: ids } });
        return users;
    } catch (error) {
        throw error;
    }
};

/**
 * @param {String} id - id of user
 * @return {Object} - details of action performed
 */
userSchema.statics.deleteUserById = async function (id) {
    try {
        // delete user by id and return the result

        const user = await this.findByIdAndDelete(id);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        throw error;
    }
};

export default mongoose.model('User', userSchema);
