import { Request, Response } from 'express';
import { User } from '../models/index';

// GET all users
export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const userData = await User.find()
        res.json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

// GET a single user by its _id and populated thought and friend data
export const getUserById = async (req: Request, res: Response) => {
    try {
        const userData = await User.findOne({ _id: req.params.id })
            .select('-__v')
        if (!userData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.json(userData);
    } catch (err) {
        res.status(500).json(err);
        return;
    }
}

// POST a new user
export const createUser = async (req: Request, res: Response) => {
    try {
        const userData = await User.create(req.body);
        res.json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
}

// PUT to update a user by its _id
export const updateUser = async (req: Request, res: Response) => {
    try {
        const userData = await User.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!userData) {
            res.status(404).json({ message: 'no user found with this id!' });
            return;
        }
        res.json(userData);
    } catch (err) {
        res.status(400).json(err);
        return;
    }
}

// DELETE to remove user by its _id
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userData = await User.findOneAndDelete({ _id: req.params.id });
        if (!userData) {
            res.status(404).json({ message: 'no user found with this id!' });
            return;
        }
        res.json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
}